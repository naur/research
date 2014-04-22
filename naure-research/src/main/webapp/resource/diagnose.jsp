<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@page import="com.sun.management.OperatingSystemMXBean" %>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="org.apache.commons.lang.exception.ExceptionUtils" %>
<%@ page import="org.apache.tomcat.jdbc.pool.DataSource" %>
<%@ page import="org.springframework.jdbc.core.JdbcTemplate" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="sun.misc.BASE64Decoder" %>
<%@ page import="sun.misc.BASE64Encoder" %>
<%@ page import="javax.crypto.Cipher" %>
<%@ page import="javax.crypto.SecretKey" %>
<%@ page import="javax.crypto.spec.SecretKeySpec" %>
<%@ page import="javax.management.MBeanServer" %>
<%@ page import="javax.management.MalformedObjectNameException" %>
<%@ page import="javax.management.ObjectName" %>
<%@ page import="javax.naming.AuthenticationException" %>
<%@ page import="javax.naming.Context" %>
<%@ page import="javax.naming.NamingEnumeration" %>
<%@ page import="javax.naming.NamingException" %>
<%@ page import="javax.naming.directory.*" %>
<%@ page import="java.beans.IntrospectionException" %>
<%@ page import="java.beans.Introspector" %>
<%@ page import="java.beans.PropertyDescriptor" %>
<%@ page import="java.io.*" %>
<%@ page import="java.lang.management.*" %>
<%@ page import="java.lang.reflect.Field" %>
<%@ page import="java.lang.reflect.Method" %>
<%@ page import="java.net.NetworkInterface" %>
<%@ page import="java.net.SocketException" %>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.text.MessageFormat" %>
<%@ page import="java.util.*" %>
<%@ page import="java.util.concurrent.TimeoutException" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
    .error {
        color: red;
    }

    .autoprompt {
        border: 1px solid green;
        font: italic 12.5px arial, sans-serif;
        background-color: white;
        padding: 0;
        margin: 0;
        list-style: none;
        position: absolute;
        z-index: 10000;
        line-height: 20px;
        min-width: 150px;
        display: none;
    }

    .autoprompt li {
        min-width: 150px;
        padding: 2px 6px;
        white-space: nowrap;
        color: black;
        text-align: left;
    }

    .autoprompt li.select {
        cursor: pointer;
        background-color: greenyellow;
    }

    .autoprompt li.match {
        text-decoration: underline;
        color: yellow;
    }

</style>

<%--Common--%>
<%!


    private WebApplicationContext applicationContext = null;
    private String basePath = null;
    private DecimalFormat decimalFormat = new DecimalFormat("0.00");
    private Up[] timeDeeps = new Up[]{new Up("ms", 1000), new Up("s", 60), new Up("m", 60), new Up("h", 24), new Up("day", 30), new Up("month", 12)};
    private Up[] timeDeeps2 = new Up[]{new Up("ns", 1000), new Up("ms", 1000), new Up("s", 60), new Up("m", 60), new Up("h", 24), new Up("day", 30), new Up("month", 12)};
    private Up[] byteDeeps = new Up[]{new Up("Byte", 1024), new Up("KB", 1024), new Up("MB", 1024), new Up("GB", 1024), new Up("TB", 1024)};
    private List<String> encrypter = new ArrayList<String>() {{
        add("encrypt");
        add("decrypt");
    }};

    private Object objectToMap(Object obj) throws IntrospectionException {
        if (isBaseType(obj)) {
            return obj;
        }

        Map buffer = new LinkedHashMap();

        if (obj instanceof List) {
            for (int j = 0; j < ((List) obj).size(); j++) {
                buffer.put(j, objectToMap(((List) obj).get(j)));
            }
        }

        if (obj instanceof Map) {
            for (Object key : ((Map) obj).keySet()) {
                buffer.put(key, objectToMap(((Map) obj).get(key)));
            }
        }

        PropertyDescriptor[] props;
        props = Introspector.getBeanInfo(obj.getClass(), Object.class).getPropertyDescriptors();
        Object value = null;
        for (int i = 0; i < props.length; i++) {
            try {
                value = props[i].getReadMethod().invoke(obj, null);
                if (isBaseType(value)) {
                    buffer.put(props[i].getName(), value);
                } else if (value instanceof List || value instanceof Map) {
                    buffer.put(props[i].getName(), objectToMap(value));
                }
            } catch (Exception ex) {
                buffer.put(props[i].getName(), ex);
            }
        }
        return buffer;
    }

    private boolean isBaseType(Object obj) {
        return obj instanceof String ||
                obj instanceof Integer ||
                obj instanceof Boolean ||
                obj instanceof Double ||
                obj instanceof Long;
    }

    private String objectToString(Object obj, int level) throws IntrospectionException {
        StringBuilder buffer = new StringBuilder();
        PropertyDescriptor[] props;
        props = Introspector.getBeanInfo(obj.getClass(), Object.class).getPropertyDescriptors();
        for (int i = 0; i < props.length; i++) {
            try {
                buffer.append(domFormat(
                        props[i].getName(),
                        props[i].getReadMethod().invoke(obj, null), level));
            } catch (Exception ex) {
                //buffer.append(domFormat("EXCEPTION", ExceptionUtils.getFullStackTrace(ex), step));
                buffer.append(domFormat("EXCEPTION" + "-" + props[i].getName() + "-" + props[i].getPropertyType(), ex.toString(), level));
            }
        }
        return buffer.toString();
    }

    //0: key, 1: value, 2: level
    private String domFormat(Object... params) {
        //Key, Value 都为空
        if (StringUtils.isEmpty(params[0].toString()) && StringUtils.isEmpty(params[1].toString())) return "";
        //Key 为空
        if (StringUtils.isEmpty(params[0].toString())) return MessageFormat.format(
                "{1}" + "{0}\n",
                params[1],  // Value
                loopLevel((Integer) params[2]));     // 偏移量
        //Value 为空
        if (StringUtils.isEmpty(params[1].toString())) return MessageFormat.format(
                "{1}" + "<font class=\"error\" style=\"font:italic bold 12px/20px arial,sans-serif;\">{0}</font>" + "\n",
                params[0],      // Key
                loopLevel((Integer) params[2]));     // 偏移量
        return MessageFormat.format(
                "{2}" + "<font class=\"error\">{0}</font>" + " \t\t {1} \n",
                params[0],      // Key
                params[1],  // Value
                loopLevel((Integer) params[2]));     // 偏移量

//        return MessageFormat.format(
//                "{2}" + "<font class=\"error\" {3}>{0}</font>" + " \t\t {1} \n",
//                params[0],      // Key
//                StringUtils.isEmpty(params[0].toString()) ? "\r\n" + params[1] : params[1],  // Value
//                loopLevel((Integer) params[2]),     // 偏移量
//                StringUtils.isEmpty(String.valueOf(params[1])) ? "style=\"font:italic bold 12px/20px arial,sans-serif;\"" : "");  // Value 有值时，Key 样式
    }

    private String loopLevel(int level) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < level; i++) {
            sb.append("\t");
        }
        return sb.toString();
    }

    private String mapToString(Map map, int level) throws IntrospectionException {
        PropertyDescriptor[] props;
        StringBuilder buffer = new StringBuilder();
        Object value = null;
        for (Object key : map.keySet()) {
            value = map.get(key);
            if (null == value) {
                buffer.append(domFormat(key, "NULL", level));
                continue;
            }

            if (value instanceof Map) {
                buffer.append(domFormat(key + "--------------------------------------", "", level));
                buffer.append(mapToString((Map) value, level + 2));
                buffer.append(domFormat("", "", level));
            } else if (value instanceof String ||
                    value instanceof Integer ||
                    value instanceof Boolean ||
                    value instanceof Double ||
                    value instanceof Long) {
                buffer.append(domFormat(key, value, level));
            } else if (value instanceof List) {
                if (((List) value).size() > 0 && ((List) value).get(0) instanceof Object)
                    buffer.append(domFormat(key, value.toString(), level));
                else
                    buffer.append(domFormat(key, value.toString(), level));
            } else if (value instanceof Date) {
                buffer.append(domFormat(key, value.toString(), level));
            } else {
                buffer.append(objectToString(value, level));
            }
        }

        return buffer.toString();
    }

    interface Classify {
        public static String CACHE = "cache";
        public static String INFO = "info";
        public static String SHELLCOMMAND = "shell";
        public static String LDAP = "ldap";

        class Options {
            public static String JVM = "jvm";
            public static String CLASSLOADINFO = "class-load-info";
            public static String THREAD = "thread";
            public static String TOMCATPROCESSORSINFO = "tomcat-processors-info";
            public static String TOMCATRUNTIMEINFO = "tomcat-runtime-info";
            public static String DATASOURCES = "data-sources";
            public static String DATAQUERYTEST = "data-query-test";
            public static String OPERATINGSYSTEM = "operating-system";
            public static String SYSTEMPROPERTIES = "system-properties";
            public static String RMI = "rmi";

            public static String getAll() throws IllegalAccessException {
                List buffer = new ArrayList();
                for (Field field : Classify.Options.class.getFields()) {
                    buffer.add(field.get(Classify.Options.class));
                }
                return buffer.toString();
            }
        }
    }


    private int getPercent(float max, float used) {
        return (int) (used / max * 100.0F);
    }

    private String formatByte(long value) {
        return format2(this.byteDeeps, value);
    }

    private String formatTime(long value) {
        return format2(this.timeDeeps, value);
    }

    private String formatUptime(long value) {
        return format(this.timeDeeps, value);
    }

    public static String format(Up[] ups, long value) {
        StringBuilder values = new StringBuilder();
        int timeDeepsLength = ups.length;
        for (int i = 0; i < timeDeepsLength; i++) {
            Up deep = ups[i];
            if (i == timeDeepsLength - 1) {
                values.insert(0, value + deep.name + " ");
            } else {
                long remainder = value % deep.unit;
                if (remainder > 0L) {
                    values.insert(0, remainder + deep.name + " ");
                }
                value /= deep.unit;
                if (value < 1L) {
                    break;
                }
            }
        }
        return values.toString();
    }

    public String format2(Up[] ups, long value) {
        long max = 1L;
        int timeDeepsLength = ups.length;
        for (int i = 0; i < timeDeepsLength; i++) {
            Up deep = ups[i];
            if (i == timeDeepsLength - 1) {
                return decimalFormat.format(value / max) + deep.name;
            }
            if (value / deep.unit < max) {
                return decimalFormat.format((float) value / (float) max) + deep.name;
            }

            max *= deep.unit;
        }
        return null;
    }

    class Up {
        public String name;
        public int unit;

        Up(String name, int unit) {
            this.name = name;
            this.unit = unit;
        }
    }

    class Percent {
        String name;
        String totalValue;
        String freeValue;
        String usedValue;
        int freePercent;
        int usedPercent;

        public Percent(String name, String totalValue, String usedValue, String freeValue) {
            this.name = name;
            this.totalValue = totalValue;
            this.usedValue = usedValue;
            this.freeValue = freeValue;
        }

        public String getName() {
            return this.name;
        }

        public String getTotalValue() {
            return this.totalValue;
        }

        public String getFreeValue() {
            return this.freeValue;
        }

        public String getUsedValue() {
            return this.usedValue;
        }

        public int getFreePercent() {
            return this.freePercent;
        }

        public int getUsedPercent() {
            return this.usedPercent;
        }

        public String toString() {
            return "Percent{name='" + this.name + '\'' + ", totalValue='" + this.totalValue + '\'' + ", freeValue='" + this.freeValue + '\'' + ", usedValue='" + this.usedValue + '\'' + ", freePercent=" + this.freePercent + ", usedPercent=" + this.usedPercent + '}';
        }
    }


%>

<%--Encrypter--%>
<%!
    public static class Base64Support {
        public static String toUrlStr(byte[] bytes) {
            String str = new BASE64Encoder().encode(bytes);

            if (str == null) {
                return "";
            }
            str = str.replaceAll("\\+", "_");
            str = str.replaceAll("/", "-");
            str = str.replaceAll("=", ".");
            str = str.replaceAll("\\s", "");

            return str;
        }

        public static byte[] fromUrlStr(String str)
                throws IOException {
            if (str == null) {
                return null;
            }
            str = str.replaceAll("_", "+");
            str = str.replaceAll("-", "/");
            str = str.replaceAll("\\.", "=");

            byte[] dec = new BASE64Decoder().decodeBuffer(str);

            return dec;
        }
    }

    public static final class Encrypter {
        private static Cipher ecipher;
        private static Cipher dcipher;
        private static final String key = "*:@1$7!a*:@1$7!a*:@1$7!a";
        private static final String alg = "DESede";

        static {
            try {
                SecretKey skey = new SecretKeySpec("*:@1$7!a*:@1$7!a*:@1$7!a".getBytes(), "DESede");

                ecipher = Cipher.getInstance("DESede");
                dcipher = Cipher.getInstance("DESede");
                ecipher.init(1, skey);
                dcipher.init(2, skey);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        public static String encrypt(String str) {
            if (str == null)
                return "";
            try {
                byte[] utf8 = str.getBytes("UTF8");

                byte[] enc = ecipher.doFinal(utf8);

                return Base64Support.toUrlStr(enc);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return "";
        }

        public static String decrypt(String str) {
            if (str == null)
                return "";
            try {
                byte[] dec = Base64Support.fromUrlStr(str);

                byte[] utf8 = dcipher.doFinal(dec);

                return new String(utf8, "UTF8");
            } catch (Exception e) {
                e.printStackTrace();
            }
            return "";
        }
    }

    public void encrypter(Map result, String[] command) {
        Map sourceMap = new HashMap();
        result.put("Encrypter", sourceMap);
        if ("encrypt".equals(command[0])) {
            sourceMap.put("encrypt", Encrypter.encrypt(command[1]));
        } else if ("decrypt".equals(command[0])) {
            sourceMap.put("decrypt", Encrypter.decrypt(command[1]));
        }
    }
%>

<%--JVM--%>
<%!


    private void jvm(Map result) {
        Map buffer = new LinkedHashMap();
        result.put("Jvm Info", buffer);
        MemoryMXBean memoryMXBean = ManagementFactory.getMemoryMXBean();
        buffer.put("Heap Memory", memToMap(memoryMXBean.getHeapMemoryUsage()));    //heapMemory

        buffer.put("PermGen Memory", memToMap(memoryMXBean.getNonHeapMemoryUsage()));     //nonHeapMemory

        List<GarbageCollectorMXBean> garbageCollectorMXBeans = ManagementFactory.getGarbageCollectorMXBeans();
        Map mems = new LinkedHashMap();
        for (GarbageCollectorMXBean garbageCollectorMXBean : garbageCollectorMXBeans) {
            mems.put(garbageCollectorMXBean.getName(),
                    "回收次数：" + Long.toString(garbageCollectorMXBean.getCollectionCount()) +
                            ", 总计时：" + formatTime(garbageCollectorMXBean.getCollectionTime()));
        }
        buffer.put("内存回收情况", mems);   //garbages

        LinkedHashMap memoryPools = new LinkedHashMap();
        buffer.put("Memory Pools", memoryPools);
        HashMap heapsMap = new HashMap();
        memoryPools.put("Heaps", heapsMap);
        HashMap nooHeapsMap = new HashMap();
        memoryPools.put("NooHeaps", nooHeapsMap);

        List<MemoryPoolMXBean> memoryPoolMXBeans = ManagementFactory.getMemoryPoolMXBeans();
        List<MemoryPoolMXBean> heaps = new ArrayList();
        List<MemoryPoolMXBean> nonHeaps = new ArrayList();
        int totalHeaps = 0;
        int totalNonHeaps = 0;
        for (MemoryPoolMXBean memoryPoolMXBean : memoryPoolMXBeans) {
            LinkedHashMap value = new LinkedHashMap();
            value.put("Manager", Arrays.asList(memoryPoolMXBean.getType(), Arrays.toString(memoryPoolMXBean.getMemoryManagerNames()))); //memoryPoolMXBean
            MemoryUsage usage = memoryPoolMXBean.getUsage();
            value.put("Usage", memToMap(usage));
            value.put("PeakUsage", memToMap(memoryPoolMXBean.getPeakUsage()));
            MemoryUsage collectionUsage = memoryPoolMXBean.getCollectionUsage();
            if (collectionUsage != null) {
                value.put("ConnectionUsage", memToMap(collectionUsage));
            }
            if (memoryPoolMXBean.getType() == MemoryType.HEAP) {
                heaps.add(memoryPoolMXBean);
                totalHeaps = (int) (totalHeaps + memoryPoolMXBean.getUsage().getMax());
            } else if (memoryPoolMXBean.getType() == MemoryType.NON_HEAP) {
                nonHeaps.add(memoryPoolMXBean);
                totalNonHeaps = (int) (totalNonHeaps + memoryPoolMXBean.getUsage().getMax());
            }
            memoryPools.put(memoryPoolMXBean.getName(), value);
        }

        for (MemoryPoolMXBean heap : heaps) {
            heapsMap.put(heap.getName(), getPercent(totalHeaps, (float) heap.getUsage().getMax()) + " s%");
        }

        for (MemoryPoolMXBean heap : nonHeaps) {
            nooHeapsMap.put(heap.getName(), getPercent(totalNonHeaps, (float) heap.getUsage().getMax()) + " s%");
        }
    }

    private Map memToMap(MemoryUsage heapMemoryUsage) {
        Map heap = new LinkedHashMap();
        heap.put("max", formatByte(heapMemoryUsage.getMax()));
        heap.put("init", formatByte(heapMemoryUsage.getInit()));
        heap.put("commit", formatByte(heapMemoryUsage.getCommitted()));
        heap.put("used", formatByte(heapMemoryUsage.getUsed()));
        heap.put("free", formatByte(heapMemoryUsage.getMax() - heapMemoryUsage.getUsed()));
        int usedPercent = getPercent((float) heapMemoryUsage.getMax(), (float) heapMemoryUsage.getUsed());
        heap.put("usedPercent", usedPercent + " %");
        heap.put("freePercent", (100 - usedPercent) + " %");
        return heap;
    }


%>

<%--ClassLoad Info--%>
<%!


    private void classLoadInfo(Map<String, Map> result) {
        ClassLoadingMXBean classLoadingMXBean = ManagementFactory.getClassLoadingMXBean();
        result.put("ClassLoad Info", new HashMap<String, Integer>());    //buffer.put("classLoad", classLoadingMXBean);
        result.get("ClassLoad Info").put("loadedClassCount", classLoadingMXBean.getLoadedClassCount());
        result.get("ClassLoad Info").put("unloadedClassCount", classLoadingMXBean.getUnloadedClassCount());

        CompilationMXBean compilationMXBean = ManagementFactory.getCompilationMXBean();
        //compilationMXBean.get
        result.put("Jit", new LinkedHashMap());
        result.get("Jit").put("CompilationName", compilationMXBean.getName());
        result.get("Jit").put("编译时长", formatTime(compilationMXBean.getTotalCompilationTime()));

        RuntimeMXBean runtimeMXBean = ManagementFactory.getRuntimeMXBean();
        result.put("Java Runtime Environment", new LinkedHashMap<String, Integer>());    //buffer.put("runtime", runtimeMXBean);
        result.get("Java Runtime Environment").put("JVM Name", runtimeMXBean.getName());
        result.get("Java Runtime Environment").put("Current Time", new Date());
        result.get("Java Runtime Environment").put("Start Time", new Date(runtimeMXBean.getStartTime()));
        result.get("Java Runtime Environment").put("UpTime", formatUptime(runtimeMXBean.getUptime()));
        result.get("Java Runtime Environment").put("JVM Management Version", runtimeMXBean.getManagementSpecVersion());
        result.get("Java Runtime Environment").put("JVM Arguments", runtimeMXBean.getInputArguments().toString());
        result.get("Java Runtime Environment").put("Class Path", runtimeMXBean.getClassPath());

        ThreadMXBean threadMXBean = ManagementFactory.getThreadMXBean();
        result.put("Threads Summary", new LinkedHashMap<String, Integer>());   //buffer.put("threads", threadMXBean);
        result.get("Threads Summary").put("Peak", threadMXBean.getPeakThreadCount());
        result.get("Threads Summary").put("Current", threadMXBean.getThreadCount());
        result.get("Threads Summary").put("Daemon", threadMXBean.getDaemonThreadCount());
    }


%>

<%--thread info--%>
<%!


    private void thread(Map result) {
        ThreadMXBean threadMXBean = ManagementFactory.getThreadMXBean();
        ThreadInfo[] threadInfos = threadMXBean.dumpAllThreads(threadMXBean.isObjectMonitorUsageSupported(), threadMXBean.isSynchronizerUsageSupported());
        LinkedHashMap threads = new LinkedHashMap();
        result.put("Thread Details", threads);
        boolean cpu = (threadMXBean.isThreadCpuTimeSupported()) && (threadMXBean.isThreadCpuTimeEnabled());
        for (ThreadInfo threadInfo : threadInfos) {
            long threadId = threadInfo.getThreadId();
            long threadUserTime = threadMXBean.getThreadUserTime(threadId);
            String key = "id=" + threadId + ", blockedCount=" + threadInfo.getBlockedCount() + ", blockedTime=" + (threadInfo.getBlockedTime() <= 0L ? Integer.valueOf(0) :
                    format2(this.timeDeeps, threadInfo.getBlockedTime())) + ", waitedCount=" + threadInfo.getWaitedCount() + ", waitedTime=" + (threadInfo.getWaitedTime() <= 0L ? Integer.valueOf(0) :
                    format2(this.timeDeeps, threadInfo.getWaitedTime())) + ", threadUserTime=" + (threadUserTime <= 0L ? Integer.valueOf(0) :
                    format2(this.timeDeeps2, threadUserTime));

            if (cpu) {
                long threadCpuTime = threadMXBean.getThreadCpuTime(threadId);
                key = key + ", threadCpuTime=" + (threadCpuTime <= 0L ? Integer.valueOf(0) :
                        //todo formatNsTime2(threadCpuTime)
                        format2(this.timeDeeps2, threadCpuTime)
                );
            }
            threads.put(key, threadToString(threadInfo));
        }
    }

    private String threadToString(ThreadInfo threadInfo) {
        StringBuilder sb = new StringBuilder("\"" + threadInfo.getThreadName() + "\"" + " Id=" + threadInfo.getThreadId() + " " + threadInfo.getThreadState());

        if (threadInfo.getLockName() != null) {
            sb.append(" on " + threadInfo.getLockName());
        }
        if (threadInfo.getLockOwnerName() != null) {
            sb.append(" owned by \"" + threadInfo.getLockOwnerName() + "\" Id=" + threadInfo.getLockOwnerId());
        }

        if (threadInfo.isSuspended()) {
            sb.append(" (suspended)");
        }
        if (threadInfo.isInNative()) {
            sb.append(" (in native)");
        }
        sb.append('\n');
        int i = 0;
        StackTraceElement[] stackTrace = threadInfo.getStackTrace();
        for (; i < stackTrace.length; i++) {
            StackTraceElement ste = stackTrace[i];
            sb.append("\tat " + ste.toString());
            sb.append('\n');
            if ((i == 0) && (threadInfo.getLockInfo() != null)) {
                Thread.State ts = threadInfo.getThreadState();
                //switch (1. $SwitchMap$java$lang$Thread$State[ts.ordinal()]){
                switch (ts.ordinal()) {
                    case 1:
                        sb.append("\t-  blocked on " + threadInfo.getLockInfo());
                        sb.append('\n');
                        break;
                    case 2:
                        sb.append("\t-  waiting on " + threadInfo.getLockInfo());
                        sb.append('\n');
                        break;
                    case 3:
                        sb.append("\t-  waiting on " + threadInfo.getLockInfo());
                        sb.append('\n');
                        break;
                }
            }

            MonitorInfo[] lockedMonitors = threadInfo.getLockedMonitors();
            for (MonitorInfo mi : lockedMonitors) {
                if (mi.getLockedStackDepth() == i) {
                    sb.append("\t-  locked " + mi);
                    sb.append('\n');
                }
            }

        }

        LockInfo[] locks = threadInfo.getLockedSynchronizers();
        if (locks.length > 0) {
            sb.append("\n\tNumber of locked synchronizers = " + locks.length);
            sb.append('\n');
            for (LockInfo li : locks) {
                sb.append("\t- " + li);
                sb.append('\n');
            }
        }
        sb.append('\n');
        return sb.toString();
    }


%>

<%--Tomcat Processors Info--%>
<%!


    private void tomcatProcessorsInfo(Map result) {
        MBeanServer platformMBeanServer = ManagementFactory.getPlatformMBeanServer();
        Map processors = new LinkedHashMap();
        try {
            Set<ObjectName> objectNames = platformMBeanServer.queryNames(new ObjectName("Catalina:type=RequestProcessor,*"), null);
            String[] poolKeys = {"method", "stage", "virtualHost", "serverPort", "maxTime", "requestCount", "errorCount", "method", "requestProcessingTime", "processingTime", "bytesSent", "bytesReceived", "currentUri", "currentQueryString", "requestBytesReceived", "requestBytesSent", "lastRequestProcessingTime", "remoteAddr"};
            for (ObjectName objectPool : objectNames) {
                Map value = putValueFromMbean(processors, platformMBeanServer, objectPool, poolKeys);
                value.put("bytesSent", formatByte(((Long) value.get("bytesSent")).longValue()));
                value.put("bytesReceived", formatByte(((Long) value.get("bytesReceived")).longValue()));
            }
        } catch (MalformedObjectNameException e) {
            //todo log.error("get request processor error", e);
        }
        result.put("Tomcat Processors Info", processors);
    }


%>

<%--Tomcat Runtime Info--%>
<%!


    private void tomcatRuntimeInfo(Map result) {
        Map processors = new LinkedHashMap();
        result.put("Tomcat Runtime Info", processors);
        MBeanServer platformMBeanServer = ManagementFactory.getPlatformMBeanServer();
        try {
            Map threadPools = new LinkedHashMap();
            Set<ObjectName> objectNames = platformMBeanServer.queryNames(new ObjectName("Catalina:type=ThreadPool,*"), null);
            for (ObjectName objectPool : objectNames) {
                tomcatThreadPool(threadPools, platformMBeanServer, objectPool);
            }
            processors.put("Thread Pool", threadPools);

            objectNames = platformMBeanServer.queryNames(new ObjectName("Catalina:j2eeType=Servlet,*"), null);
            Map servlets = new LinkedHashMap();
            for (ObjectName objectPool : objectNames) {
                tomcatServletInfo(servlets, platformMBeanServer, objectPool);
            }
            processors.put("Servlet Info", servlets);

            objectNames = platformMBeanServer.queryNames(new ObjectName("Catalina:type=StringCache,*"), null);
            Map stringCaches = new LinkedHashMap();
            for (ObjectName objectPool : objectNames) {
                tomcatStringCacheInfo(stringCaches, platformMBeanServer, objectPool);
            }
            processors.put("StringCache Info", stringCaches);

            objectNames = platformMBeanServer.queryNames(new ObjectName("Catalina:type=Connector,*"), null);
            Map connectors = new LinkedHashMap();
            for (ObjectName objectPool : objectNames) {
                tomcatConnectorInfo(connectors, platformMBeanServer, objectPool);
            }
            processors.put("Connector Info", connectors);

            objectNames = platformMBeanServer.queryNames(new ObjectName("Catalina:type=GlobalRequestProcessor,*"), null);
            Map globalRequestProcessors = new LinkedHashMap();
            for (ObjectName objectPool : objectNames) {
                tomcatGlobalProcessorInfo(globalRequestProcessors, platformMBeanServer, objectPool);
            }
            processors.put("Global Request Processor Info", globalRequestProcessors);

            objectNames = platformMBeanServer.queryNames(new ObjectName("Catalina:type=DataSource,*"), null);
            Map dataSources = new LinkedHashMap();
            for (ObjectName objectPool : objectNames) {
                tomcatDataSourceInfo(dataSources, platformMBeanServer, objectPool);
            }
            processors.put("Global Data Source Info", dataSources);
        } catch (Exception e) {
            //todo log.error("get sysinfo step6 error", e);
        }
    }

    private void tomcatDataSourceInfo(Map dataSources, MBeanServer platformMBeanServer, ObjectName objectPool) {
        String[] poolKeys = {"numActive", "numIdle", "numTestsPerEvictionRun", "driverClassName", "url", "username", "defaultCatalog", "defaultAutoCommit", "defaultTransactionIsolation", "defaultReadOnly", "maxActive", "maxIdle", "minIdle", "initialSize", "maxWait", "testOnBorrow", "validationQuery", "testOnReturn", "testWhileIdle", "poolPreparedStatements", "maxOpenPreparedStatements", "removeAbandoned", "removeAbandonedTimeout", "logAbandoned", "minEvictableIdleTimeMillis", "timeBetweenEvictionRunsMillis", "accessToUnderlyingConnectionAllowed"};

        putValueFromMbean(dataSources, platformMBeanServer, objectPool, poolKeys);
    }

    private void tomcatGlobalProcessorInfo(Map globalRequestProcessors, MBeanServer platformMBeanServer, ObjectName objectPool) {
        String[] poolKeys = {"bytesSent", "bytesReceived", "processingTime", "errorCount", "maxTime", "requestCount"};
        Map value = putValueFromMbean(globalRequestProcessors, platformMBeanServer, objectPool, poolKeys);

        value.put("bytesSent", formatByte(((Long) value.get("bytesSent")).longValue()));
        value.put("bytesReceived", formatByte(((Long) value.get("bytesReceived")).longValue()));

        Long processingTime = (Long) value.get("processingTime");
        Integer requestCount = (Integer) value.get("requestCount");
        if ((processingTime != null) && (requestCount != null) && (processingTime.longValue() > 0L) && (requestCount.intValue() > 0)) {
            value.put("avgProcessingTime", Integer.valueOf((int) (processingTime.longValue() / requestCount.intValue())));
        }
        value.put("processingTime", formatUptime(processingTime.longValue()));
    }

    private void tomcatConnectorInfo(Map connectors, MBeanServer platformMBeanServer, ObjectName objectPool) {
        String[] poolKeys = {"protocol", "scheme", "address", "port", "redirectPort", "compression", "bufferSize", "maxPostSize", "maxHttpHeaderSize", "connectionUploadTimeout", "disableUploadTimeout", "URIEncoding", "useBodyEncodingForURI", "enableLookups", "proxyName", "proxyPort", "maxThreads", "maxSpareThreads", "minSpareThreads", "acceptCount", "connectionLinger", "connectionTimeout", "tcpNoDelay", "maxKeepAliveRequests", "keepAliveTimeout", "strategy", "xpoweredBy", "allowTrace"};
        Map value = putValueFromMbean(connectors, platformMBeanServer, objectPool, poolKeys);
        connectors.put(value.get("protocol") + "-" + value.get("port"), value);
    }

    private void tomcatStringCacheInfo(Map stringCaches, MBeanServer platformMBeanServer, ObjectName objectPool) {
        String[] poolKeys = {"trainThreshold", "charEnabled", "byteEnabled", "hitCount", "accessCount", "cacheSize"};
        Map value = putValueFromMbean(stringCaches, platformMBeanServer, objectPool, poolKeys);
        stringCaches.put("stringCache", value);
    }

    private void tomcatServletInfo(Map servlets, MBeanServer platformMBeanServer, ObjectName objectPool) {
        String[] poolKeys = {"minTime", "processingTime", "maxTime", "errorCount", "loadTime", "classLoadTime", "requestCount"};
        Map value = putValueFromMbean(servlets, platformMBeanServer, objectPool, poolKeys);
        Long processingTime = (Long) value.get("processingTime");
        Integer requestCount = (Integer) value.get("requestCount");
        if ((processingTime != null) && (requestCount != null) && (processingTime.longValue() > 0L) && (requestCount.intValue() > 0)) {
            value.put("avgProcessingTime", Integer.valueOf((int) (processingTime.longValue() / requestCount.intValue())));
        }
        value.put("processingTime", formatUptime(processingTime.longValue()));
    }

    private void tomcatThreadPool(Map pool, MBeanServer platformMBeanServer, ObjectName objectPool) {
        String name = objectPool.getKeyProperty("name");
        Map value = new LinkedHashMap();

        String[] poolKeys = null;
        if (name.contains("http"))
            poolKeys = new String[]{"port", "maxThreads", "soTimeout", "acceptorThreadCount", "name", "currentThreadsBusy", "currentThreadCount"};
        else if (name.contains("jk")) {
            poolKeys = new String[]{"maxThreads", "maxSpareThreads", "minSpareThreads", "currentThreadCount", "currentThreadsBusy"};
        }

        if (poolKeys != null)
            try {
                for (String poolKey : poolKeys) {
                    value.put(poolKey, platformMBeanServer.getAttribute(objectPool, poolKey));
                }
                Integer maxThreads = (Integer) value.get("maxThreads");
                Integer currentThreadCount = (Integer) value.get("currentThreadCount");
                Integer currentThreadsBusy = (Integer) value.get("currentThreadsBusy");

                int restThreadCount = currentThreadCount.intValue() - currentThreadsBusy.intValue();
                int spareThreadCount = maxThreads.intValue() - currentThreadsBusy.intValue();

                int percent = getPercent(maxThreads.intValue(), restThreadCount);
                if (((restThreadCount > 0 ? 1 : 0) & (percent < 1 ? 1 : 0)) != 0) percent = 1;
                int percent1 = getPercent(maxThreads.intValue(), currentThreadsBusy.intValue());
                if (((currentThreadsBusy.intValue() > 0 ? 1 : 0) & (percent1 < 1 ? 1 : 0)) != 0) percent1 = 1;
                value.put("restThreadPercent", percent + " %");
                value.put("currentThreadPercent", percent1 + " %");
                int percent2 = 100 - percent - percent1;
                value.put("spareThreadPercent", percent2 + " %");
                value.put("restThreadCount", Integer.valueOf(restThreadCount));
                value.put("spareThreadCount", Integer.valueOf(spareThreadCount));

                pool.put(name, value);
            } catch (Exception e) {
                //todo log.error("get tomcat thread pool error!", e);
            }
    }

    private Map putValueFromMbean(Map map, MBeanServer beanServer, ObjectName objectName, String[] poolKeys) {
        Map value = new LinkedHashMap();
        try {
            for (String poolKey : poolKeys) {
                Object attribute = beanServer.getAttribute(objectName, poolKey);
                if (("minTime".equals(poolKey)) && (attribute.equals(Long.valueOf(9223372036854775807L)))) {
                    attribute = Integer.valueOf(0);
                }
                value.put(poolKey, attribute);
            }
            String name = objectName.getKeyProperty("name");
            if (name != null)
                map.put(name, value);
        } catch (Exception e) {
            //todo log.error("get mbean value error! namedObject=" + objectName, e);
        }
        return value;
    }


%>

<%--Data Sources--%>
<%!


    public void dataSources(Map result) {
        Map sourceMap = new HashMap();
        result.put("DataSource Debug Info", sourceMap);
        try {
            DataSource dataSource = (DataSource) applicationContext.getBean("dataSource");
            sourceMap.put(dataSource.getName(), getDataSourceStatus(dataSource));
        } catch (Exception ex) {
            //todo log.error("get dataSource status error!", e);
            sourceMap.put("EXCEPTION", ExceptionUtils.getFullStackTrace(ex));
        }
    }

    protected Map getDataSourceStatus(DataSource source) {
        Map buffer = new LinkedHashMap();
        List fields = Arrays.asList("numActive", "numIdle", "numTestsPerEvictionRun", "driverClassName", "url", "username", "defaultCatalog", "defaultAutoCommit", "defaultTransactionIsolation", "defaultReadOnly", "maxActive", "maxIdle", "minIdle", "initialSize", "maxWait", "testOnBorrow", "validationQuery", "testOnReturn", "testWhileIdle", "poolPreparedStatements", "maxOpenPreparedStatements", "removeAbandoned", "removeAbandonedTimeout", "logAbandoned", "minEvictableIdleTimeMillis", "timeBetweenEvictionRunsMillis", "accessToUnderlyingConnectionAllowed",
                "active", "loginTimeout", "waitCount", "validationInterval", "poolSize", "maxAge", "poolSweeperEnabled", "size");
        try {
            PropertyDescriptor[] props = Introspector.getBeanInfo(source.getClass(), Object.class).getPropertyDescriptors();
            for (int i = 0; i < props.length; i++) {
                try {
                    if (fields.contains(props[i].getName())) {
                        buffer.put(props[i].getName(), props[i].getReadMethod().invoke(source, null));
                    }
                } catch (Exception ex) {
                    //buffer.append(domFormat("EXCEPTION", ExceptionUtils.getFullStackTrace(ex), step));
                    //buffer.append(domFormat("EXCEPTION" + "-" + props[i].getName() + "-" + value.getClass().toString(), ex.toString(), level));
                }
            }
        } catch (Exception e) {
            //todo log.error("get dataSource status error!", e);
        }
        return buffer;
    }

    private Object methodValue(Object object, Method method) {
        boolean accessible = method.isAccessible();
        try {
            if (!accessible) {
                method.setAccessible(true);
            }
            Object localObject1 = method.invoke(object, new Object[0]);
            return localObject1;
        } catch (Exception e) {
            //todo log.error("get field value error! object=" + object + " field=" + method, e);
            Object localObject2 = null;
            return localObject2;
        } finally {
            if (!accessible)
                method.setAccessible(accessible);
        }
        //todo throw localObject3;
    }

    private Object getValue(Object object, Field field) {
        boolean accessible = field.isAccessible();
        //Object localObject3;
        try {
            if (!accessible) {
                field.setAccessible(true);
            }
            Object localObject1 = field.get(object);
            return localObject1;
        } catch (Exception e) {
            //todo log.error("get field value error! object=" + object + " field=" + field, e);
            Object localObject2 = null;
            return localObject2;
        } finally {
            if (!accessible)
                field.setAccessible(accessible);
        }
        //todo throw localObject3;
    }


%>

<%--dataQueryTest--%>
<%!
    public void dataQueryTest(Map result) {
        Map sourceMap = new HashMap();
        result.put("DataSource Debug Info", sourceMap);
        try {
            JdbcTemplate jdbcTemplate = new JdbcTemplate((DataSource) applicationContext.getBean("dataSource"));
            sourceMap.put("查询 do", jdbcTemplate.queryForMap("SELECT * FROM do  ORDER BY id DESC LIMIT 1"));
            sourceMap.put("查询 do_log", jdbcTemplate.queryForMap("SELECT * FROM do_log  ORDER BY id DESC LIMIT 1"));
        } catch (Exception ex) {
            //todo log.error("get dataSource status error!", e);
            sourceMap.put("EXCEPTION", ExceptionUtils.getFullStackTrace(ex));
        }
    }
%>

<%--OperatingSystem--%>
<%!


    private void operatingSystem(Map<String, Map> result) throws SocketException {
        result.put("Partition Info", new LinkedHashMap<String, String>());
        File[] partitions = File.listRoots();
        File partition;
        Percent percent;
        int i = 0;
        for (int partitionsLength = partitions.length; i < partitionsLength; i++) {
            partition = partitions[i];
            percent = new Percent(partition.getPath(), formatByte(partition.getTotalSpace()), formatByte(partition.getTotalSpace() - partition.getUsableSpace()), formatByte(partition.getFreeSpace()));
            percent.usedPercent = getPercent((float) partition.getTotalSpace(), (float) (partition.getTotalSpace() - partition.getUsableSpace()));
            percent.freePercent = (100 - percent.usedPercent);
            result.get("Partition Info").put(percent.getName(), new HashMap<String, List>());
            ((Map) result.get("Partition Info").get(percent.getName())).put("info", Arrays.asList(
                    "usedPercent: " + percent.getUsedPercent(),
                    "freePercent: " + percent.getFreePercent(),
                    "totalValue: " + percent.getTotalValue(),
                    "freeValue: " + percent.getFreeValue(),
                    "usedValue: " + percent.getUsedValue()
            ));
        }

        OperatingSystemMXBean operatingSystemMXBean = (OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean();
        result.put("Operator Info", new HashMap<String, String>());
        result.get("Operator Info").put("totalPhysical", formatByte(operatingSystemMXBean.getTotalPhysicalMemorySize()));
        result.get("Operator Info").put("freePhysical", formatByte(operatingSystemMXBean.getFreePhysicalMemorySize()));
        result.get("Operator Info").put("totalSwap", formatByte(operatingSystemMXBean.getTotalSwapSpaceSize()));
        result.get("Operator Info").put("freeSwap", formatByte(operatingSystemMXBean.getFreeSwapSpaceSize()));
        result.get("Operator Info").put("commitVirtual", formatByte(operatingSystemMXBean.getCommittedVirtualMemorySize()));

        Enumeration networkInterfaces = NetworkInterface.getNetworkInterfaces();
        result.put("Network Interfaces", new HashMap<String, List>());
        NetworkInterface networkInterface;
        while (networkInterfaces.hasMoreElements()) {
            networkInterface = (NetworkInterface) networkInterfaces.nextElement();
            if (networkInterface.isUp()) {
                result.get("Network Interfaces").put(networkInterface.getName(), Arrays.asList(
                        networkInterface.getDisplayName(),
                        networkInterface.getInterfaceAddresses()
                ));
            }
        }
    }


%>

<%--System Properties--%>
<%!


    private void systemProperties(Map buffer) {
        buffer.put("SystemProperties", System.getProperties());
    }


%>

<%--LDAP--%>
<%!


    private String host = "ldap://ldapidc.yihaodian.com:389";
    private String ou = "1_UserAccount";
    private String admin = "oper_scm_scs";
    private String password = "tgb678!";

    private void ldap(Map<String, Map> buffer, List<String> args) throws IntrospectionException {
        buffer.put("LDAP", new LinkedHashMap<String, String>());

        SearchResult result = null;
        Attributes attrs = null;
        Attribute attr = null;
        NamingEnumeration<String> keys = null;

        DirContext dirContext = null;
        String userName = args.get(0);

        SearchControls constraints = new SearchControls();
        // 可以在SearchControls对象中设置要搜索的属性
        constraints.setSearchScope(SearchControls.SUBTREE_SCOPE);

        try {
            dirContext = new InitialDirContext(getEnvironment(admin + "@yihaodian.com", password));
            NamingEnumeration<SearchResult> namEnu = dirContext.search("", "sAMAccountName=" + userName, constraints);
            while (namEnu.hasMoreElements()) {
                attrs = namEnu.nextElement().getAttributes();
                keys = attrs.getIDs();
                while (keys.hasMoreElements()) {
                    attr = attrs.get(keys.nextElement());
                    buffer.get("LDAP").put(attr.getID(), attr.get());
                }
            }
        } catch (AuthenticationException aue) {
            aue.printStackTrace();
            //logger.error("异常信息，AuthenticationException:" + aue.getMessage());
        } catch (NamingException e) {
            e.printStackTrace();
            //logger.error("异常信息，NamingException:"+e.getMessage());
        } catch (Exception ee) {
            ee.printStackTrace();
            //logger.error("异常信息，Exception:"+ee.getMessage());
        } finally {
            try {
                if (null != dirContext)
                    dirContext.close();
            } catch (Exception eee) {
                //logger.error("异常信息，Exception:"+eee.getMessage());
            }
        }

        //buffer.put("LDAP", objectToMap(attrs));
    }

    private Hashtable<String, Object> getEnvironment(String loginUserName, String loginPassword) {
        Hashtable<String, Object> env = new Hashtable<String, Object>();
        StringBuffer url = new StringBuffer(host);
        url.append("/").append("OU=" + ou + ",DC=yihaodian,DC=com");
        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
        env.put(Context.PROVIDER_URL, url.toString());
        env.put(Context.SECURITY_AUTHENTICATION, "simple");
        env.put(Context.SECURITY_PRINCIPAL, loginUserName);
        env.put(Context.SECURITY_CREDENTIALS, loginPassword);
        return env;
    }


%>

<%--Shell Command --%>
<%!


    private static int defaultLine = 1000;
    private static String pathLimit = "/usr/local/tomcat6/logs/";
    //private static String pathLimit = "/opt/scs-tomcat/logs";
    private static int maxLine = 10000;
    private long defaultTimeout = 15000;
    private static String[] allCommand = new String[]{
            //磁盘管理  cd ,ls, pwd
            "df", "dirs", "du", "edquota", "eject", "mcd", "mdeltree", "mdu", "mkdir", "mlabel", "mmd", "mrd", "mzip", "quota", "mount", "mmount", "rmdir", "rmt", "stat", "tree", "umount", "quotacheck", "quotaoff", "lndir", "repquota", "quotaon",
            //磁盘维护 free
            "badblocks", "cfdisk", "dd", "e2fsck", "ext2ed", "fsck", "fsck", "fsconf", "fdformat", "hdparm", "mformat", "mkbootdisk", "mkdosfs", "mke2fs",
            "mkfs.ext2", "mkfs.msdos", "mkinitrd", "mkisofts", "mkswap", "mpartition", "swapon", "symlinks", "sync", "mbadblocks", "mkfs", "fsck.ext2", "fdisk", "losetup", "mkfs", "sfdisk", "swapoff",
            //系统管理 "w", "id, who  whois  whoami ps
            "adduser", "chfn", "useradd", "date", "exit", "finger", "fwhois", "sleep", "suspend", "groupdel", "groupmod", "halt", "kill", "last", "lastb", "login", "logname", "logout",
            "nice", "procinfo", "top", "pstree", "reboot", "rlogin", "rsh", "sliplogin", "screen", "shutdown", "rwho", "sudo", "gitps", "swatch", "tload", "logrotate",
            "uname", "chsh", "userconf", "userdel", "usermod", "vlock", "newgrp", "renice", "su", "skill",
            //网络通讯 : ping ifconfig
            "apachectl", "arpwatch", "dip", "getty", "mingetty", "uux", "telnet", "uulog", "uustat", "ppp-off", "netconfig", "nc", "httpd", "minicom", "mesg", "dnsconf",
            "wall", "netstat", "pppstats", "samba", "setserial", "talk", "traceroute", "tty", "newaliases", "uuname", "netconf", "write", "statserial", "efax", " pppsetup", "tcpdump", "ytalk", "cu", "smbd", "testparm", "smbd", "smbclient", "shapecfg",
            //系统设置
            "reset", "clear", "alias", "dircolors", "aumix", "bind", "chroot", "clock", "crontab", "declare", "depmod", "dmesg",
            "enable", "eval", "export", "pwunconv", "grpconv", "rpm", "insmod", "kbdconfig", "lilo", "liloconfig", "lsmod", "minfo", "set", "modprobe", "ntsysv", "moouseconfig", "passwd", "pwconv",
            "rdate", "resize", "rmmod", "grpunconv", "modinfo", "time", "setup", "sndconfig", "setenv", "setconsole", "timeconfig", "ulimit",
            "unset", "chkconfig", "apmd", "hwclock", "mkkickstart", "fbset", "unalias", "SVGAText", "Mode",
            //设备管理
            "setleds", "loadkeys", "rdev", "dumpkeys", "MAKEDEV",
            //文件管理
            "cat", "chattr", "chgrp", "chmod", "chown", "cksum", "cmp", "diff", "diffstat", "file", "find", "git", "gitview", "indent", "cut", "ln", "less", "locate", "isattr", "mattrib", "mc", "mdel", "mdir", "mktemp", "more", "mmove", "mread", "mren",
            "mtools", "mtoolstest", "mv", "od", "paste", "patch", "rcp", "rm", "slocate", "split", "tee", "tmpwatch", "touch", "umask", "which", "cp", "in", "mcopy", "mshowfat", "rhmask", "whereis",
            //文件编辑
            "col", "colrm", "comm", "csplit", "ed", "egrep", "ex", "fgrep", "fmt", "fold", "grep", "ispell", "jed", "joe", "join", "look", "mtype", "pico", "rgrep", "sed", "sort", "spell", "tr", "expr", "uniq", "wc",
            //文件传输
            "lprm", "lpr", "lpq", "lpd", "bye", "ftp", "uuto", "uupick", "uucp", "uucico", "tftp", "ncftp", "ftpshut", "ftpwho", "ftpcount",
            //备份压缩
            "ar", "bunzip2", "bzip2", "bzip2recover", "gunzip", "unarj",
            "compress", "cpio", "dump", "uuencode", "gzexe", "gzip",
            "lha", "restore", "tar", "uudecode", "unzip", "zip",
            "zipinfo",
            //其他
            "cat", "head", "tail", "java", "javac"
    };
    private static String[] blacklist = new String[]{
            "rm", "mv", "rmdir", "eject", "mkdir", "mount", "javac", "kill", "useradd", "mkfs", "adduser", "reboot", "rlogin", "shutdown", "sudo", "userdel", "telnet", "reset", "chroot", "passwd", "chkconfig", "important.properties"
    };
    private static String[] whitelist = new String[]{
            "echo", "jps", "jstat", "jmap", "jstack", "jhat", "jinfo", "df", "du", "top", "uname", "netstat", "awk", "sed", "cat", "tail", "head", "ls", "pwd", "cd", "free", "whoami", "ps", "grep", "ping", "ifconfig"
    };

    public class TimeoutThread extends Thread {
        private long timeout;
        private boolean isCanceled = false;
        private TimeoutException timeoutException;
        private Process process;
        StringBuilder outBuffer;

        public TimeoutThread(long timeout, Process process, StringBuilder outBuffer) {
            super();
            this.timeout = timeout;
            this.process = process;
            this.setDaemon(true);
            this.outBuffer = outBuffer;
        }

        public synchronized void cancel() {
            isCanceled = true;
        }

        public void run() {
            try {
                sleep(timeout);
            } catch (InterruptedException e) {
                //outBuffer.append(ExceptionUtils.getFullStackTrace(e));
            } finally {
                if (!isCanceled && process != null) {
                    process.destroy();
                    outBuffer.append("<span class=\"error\">Timeout！</span><br />");
                }
            }
        }
    }

    class StreamGobbler extends Thread {
        private InputStream stream;
        private String type;
        private int line;
        private Process process;
        StringBuilder outBuffer;

        StreamGobbler(InputStream is, String type, Process process, StringBuilder outBuffer) {
            this(is, type, defaultLine, process, outBuffer);
        }

        StreamGobbler(InputStream stream, String type, int line, Process process, StringBuilder outBuffer) {
            this.stream = stream;
            this.type = type;
            this.line = line;
            this.process = process;
            this.outBuffer = outBuffer;
        }

        public void run() {
            InputStreamReader reader = null;
            BufferedReader bufferedReader = null;
            try {
                reader = new InputStreamReader(stream);
                bufferedReader = new BufferedReader(reader);

                int readLint = 0;
                String lineStr = null;
                while (readLint < line && (lineStr = bufferedReader.readLine()) != null) {
                    if ("OUTPUT".equals(type))
                        outBuffer.append(lineStr.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;") + "<br />");
                    else
                        outBuffer.append("<span class=\"error\">" + lineStr + "</span><br />");
                    readLint++;
                    //System.out.println(readLint + " : " + lineStr);
                }
                if ("OUTPUT".equals(type) && process != null) {
                    process.destroy();
                }
            } catch (Exception ex) {
                outBuffer.append("run " + type + ", " + Thread.currentThread().getName() + ". ");
                outBuffer.append(ExceptionUtils.getFullStackTrace(ex));
            } finally {
                try {
                    if (bufferedReader != null) bufferedReader.close();
                    if (reader != null) reader.close();
                    if (stream != null) stream.close();
                } catch (IOException e) {
                    outBuffer.append(ExceptionUtils.getFullStackTrace(e));
                }
            }
        }
    }

    private String execute(String command, int line, long timeout) {
        StringBuilder outBuffer = new StringBuilder();
        String result = validate(command);
        if (null != result) {
            return result;
        }

        Thread stderrThread = null;
        Thread stdoutThread = null;
        Process process = null;
        TimeoutThread timeoutThread = null;

        try {
            Runtime runtime = Runtime.getRuntime();
            process = runtime.exec(new String[]{"sh", "-c", command}, null, new File(pathLimit));
            //stderr
            stderrThread = new StreamGobbler(process.getErrorStream(), "ERROR", process, outBuffer);
            //stdout
            stdoutThread = new StreamGobbler(process.getInputStream(), "OUTPUT", line, process, outBuffer);
            //timeout
            timeoutThread = new TimeoutThread(timeout, process, outBuffer);

            stderrThread.start();
            stdoutThread.start();
            timeoutThread.start();
            int exitValue = process.waitFor();
            timeoutThread.cancel();

            stderrThread.join(timeout);
            stdoutThread.join(timeout);

            //outBuffer.append("<span class=\"error\">exitValue: " + exitValue + "</span><br />");
        } catch (Exception ex) {
            outBuffer.append(ExceptionUtils.getFullStackTrace(ex));
        } finally {
            if (null != stderrThread) stderrThread.interrupt();
            if (null != stdoutThread) stdoutThread.interrupt();
            if (null != timeoutThread) timeoutThread.interrupt();
            if (process != null) {
                process.destroy();
                process = null;
            }
        }
        return outBuffer.toString();
    }

    private String validate(String params) {
        params = params.replaceAll("\\.\\.", "").replaceAll("/", "").replaceAll("\\\\", "");
        for (String str : blacklist) {
            if (params.indexOf(str) >= 0)
                return "<span class=\"error\">参数不能包含：" + str + "</span><br />";
        }
        for (String str : whitelist) {
            if (params.indexOf(str) == 0)
                return null;
        }

        return "<span class=\"error\">参数必须是：" + Arrays.toString(whitelist) + " 开头！</span><br />";
    }


%>

<%--RUN--%>
<%


    applicationContext = WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());
    basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    request.setCharacterEncoding("UTF-8");
    String classify = request.getParameter("classify");
    String params = request.getParameter("params");
    int line = null != request.getParameter("line") ? Integer.parseInt(request.getParameter("line")) : defaultLine;
    long timeout = null != request.getParameter("timeout") ? Long.parseLong(request.getParameter("timeout")) : defaultTimeout;
    if (line > maxLine) line = maxLine;

    Map buffer = new LinkedHashMap();
    try {
        if (null == params || 0 >= params.length()) {
            params = "";
            buffer.put("ERROR", "请输入参数");
        } else if (StringUtils.equals(Classify.LDAP, classify)) {          //查询缓存数据
            this.ldap(buffer, Arrays.asList(params.split(",")));
        } else if (StringUtils.equals(Classify.INFO, classify)) {           //查询系统信息
            if (StringUtils.equals(Classify.Options.SYSTEMPROPERTIES, params)) {
                this.systemProperties(buffer);
            } else if (StringUtils.equals(Classify.Options.JVM, params)) {
                this.jvm(buffer);
            } else if (StringUtils.equals(Classify.Options.CLASSLOADINFO, params)) {
                this.classLoadInfo(buffer);
            } else if (StringUtils.equals(Classify.Options.OPERATINGSYSTEM, params)) {
                this.operatingSystem(buffer);
            } else if (StringUtils.equals(Classify.Options.DATASOURCES, params)) {
                this.dataSources(buffer);
            } else if (StringUtils.equals(Classify.Options.THREAD, params)) {
                this.thread(buffer);
            } else if (StringUtils.equals(Classify.Options.TOMCATRUNTIMEINFO, params)) {
                this.tomcatRuntimeInfo(buffer);
            } else if (StringUtils.equals(Classify.Options.TOMCATPROCESSORSINFO, params)) {
                this.tomcatProcessorsInfo(buffer);
            } else if (StringUtils.equals(Classify.Options.DATAQUERYTEST, params)) {
                this.dataQueryTest(buffer);
            }
        } else if (StringUtils.equals(Classify.SHELLCOMMAND, classify)) {   //运行 Linux shell 命令行
            //加密解密字符串
            if (params.length() > 7 && encrypter.contains(params.substring(0, 7))) {
                this.encrypter(buffer, params.split(" "));
            } else {
                //TODO 屏蔽方法调用
                buffer.put("", this.execute(params, line, timeout));
                //buffer.put("", "屏蔽方法调用，不开放。");
            }
        }
    } catch (Exception ex) {
        buffer.put("EXCEPTION", ExceptionUtils.getFullStackTrace(ex));
    }

    String result = mapToString(buffer, 0);

    if (null != classify) {
        response.reset();
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html");
        response.addCookie(new Cookie("classify", String.valueOf(classify)));
        response.addCookie(new Cookie("params", URLEncoder.encode(params, "UTF-8").trim().replaceAll("\\+", "%20")));
        response.addCookie(new Cookie("line", String.valueOf(line)));
        response.addCookie(new Cookie("timeout", String.valueOf(timeout)));
    }


%>

<title> Diagnose </title>

</head>

<body>

<div>

    <div class="layout-top">
        <form method="post">
            <input class="field" id="params" name="params" type="text" tabindex="1"
                   style="width: 500px;font: italic 14px arial, sans-serif;color: #A22E00;margin: 2px 6px;height: 25px;"
                   value="<%= null != request.getParameter("params") ? request.getParameter("params") : "" %>"/>

            <select class="field" id="classify" name="classify"
                    style="font: italic 14px 'Comic Sans MS';color: #A22E00;margin: 2px 6px;height: 25px;width: 80px;">
                <option value="info">Info</option>
                <option value="ldap">LDAP</option>
                <%--TODO--%>
                <option value="shell">Shell</option>
            </select>

            <%--shell START--%>
            <div id="area-shell" name="area-shell" style="display: inline;">
                <input class="field" id="line" name="line" type="text" tabindex="2"
                       style="width: 80px;font: italic 14px 'Comic Sans MS';color: #A22E00;margin: 2px 6px;height: 25px;"
                       value="<%= null != request.getParameter("line") ? request.getParameter("line") : defaultLine %>"/>

                <select class="field" id="timeout" name="timeout"
                        style="font: italic 14px 'Comic Sans MS';color: #A22E00;margin: 2px 6px;height: 25px;width: 80px;">
                    <option value="3000"> 3s</option>
                    <option value="5000"> 5s</option>
                    <option value="10000">10s</option>
                    <option value="15000" selected="selected">15s</option>
                    <option value="30000">30s</option>
                </select>
            </div>
            <%--shell END--%>

            <input class="field" id="go" type="submit" value="执行！"
                   style="font: bold 14px arial, sans-serif;color: #A22E00;margin: 2px 6px;height: 25px;">

        </form>
    </div>
    <hr style="margin: 0px;padding:0px;"/>
    <div style="margin: 6px 0px; color: #A22E00;font: italic bold 12px arial, sans-serif;"><%=Calendar.getInstance().getTime()%>
    </div>
    <pre style="margin: 0px;color: #00008B;font-size: 11px;" class="layout-content"><%=result%></pre>
</div>

<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.0.min.js"></script>
<script type="text/javascript">
    var global = {
        blacklist: '<%=Arrays.toString(blacklist)%>',
        whitelist: '<%=Arrays.toString(whitelist)%>',
        options: '<%=Classify.Options.getAll()%>',
        autoprompt: null
    };
    var dom = {
        params: '#params',
        line: '#line',
        timeout: '#timeout',
        classify: '#classify',
        areaShell: '#area-shell'
    };
    $.cookie = function (name, value, options) {
        if (typeof value != 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }

    $(function () {
        if ($.cookie('classify') && $.cookie('classify').length > 0)
            $(dom.classify).val($.cookie('classify'));
        if ($(dom.classify).val() == 'shell')
            $(dom.areaShell).show();
        else
            $(dom.areaShell).hide();
        if ($(dom.classify).val() != "info")
            $(dom.params).focus();
        if ($(dom.params).val().length <= 0 && $.cookie('params'))
            $(dom.params).val($.cookie('params').replace(/[\^"\"$]/g, ''));
        if ($.cookie('line') && $.cookie('line').length > 0)
            $(dom.line).val($.cookie('line'));
        if ($.cookie('timeout') && $.cookie('timeout').length > 0)
            $(dom.timeout).val($.cookie('timeout'));
        $(dom.line).on('keydown', function () {
            var isOK = false;
            var e = document.all ? window.event : event;
            var key = e.keyCode
            if ((key > 95 && key < 106) ||                  //小键盘上的0到9
                    (key > 47 && key < 60) ||                   //大键盘上的0到9
                    key == 8 || key == 9 || key == 46 || key == 37 || key == 39     //不影响正常编辑键的使用(8:BackSpace;9:Tab;46:Delete;37:Left;39:Right)
                    ) {
                isOK = true;
            } else {
                if (window.event) //IE
                    e.returnValue = false;   //event.returnValue=false 效果相同.
                else //Firefox
                    e.preventDefault();
            }
            return isOK;
        });

        //autoprompt
        global.autoprompt = new autoprompt({
            target: dom.params,
            //data: ["jvm", "class-load-info", "thread", "tomcat-processors-info", "tomcat-runtime-info", "data-sources", "operating-system", "system-properties"],
            data: global.options.replace(/[\[\]\s]/g, '').split(','),
            onSelect: function (item) {
                $(dom.params).val($(item).text());
            }
        });
    });

    //event
    $(dom.classify).on('change', function () {
        if ($(this).val() == 'shell')
            $(dom.areaShell).show();
        else
            $(dom.areaShell).hide();
        if ($(this).val() == 'info')
            global.autoprompt.show();
        else
            global.autoprompt.hide();
        $(dom.params).val('');
    });
    $(dom.params).on('focus', function () {
        if ($(dom.classify).val() == 'info')
            global.autoprompt.show();
    });
    //    $(dom.params).on('blur', function () {
    //        if ($(dom.classify).val() == 'info')
    //            global.autoprompt.hide();
    //    });
    $(dom.params).on('mousedown', function () {
        if ($(dom.classify).val() == 'info')
            global.autoprompt.show();
    });

    //autoprompt
    var autoprompt = function (options) {
        var opt = $.extend({
            target: null,
            data: {},
            onSelect: null,
            dom: {
                prompt: '.autoprompt',
                promptNode: '.autoprompt li',
                selectClass: 'select',
                template: function (data) {
                    var elem = '<ul class="autoprompt">';
                    for (var index in data) {
                        elem += '<li>' + data[index] + '</li>';
                    }
                    return elem + '</ul>';
                }
            }
        }, options);

        this.show = function () {
            $(opt.dom.prompt).show();
        };
        this.hide = function () {
            $(opt.dom.prompt).hide();
        };
        this.init = function () {
            $(opt.target).after(opt.dom.template(opt.data));
            $(opt.dom.promptNode).on('mouseover', function () {
                $(opt.dom.promptNode).removeClass(opt.dom.selectClass);
                $(this).addClass(opt.dom.selectClass);
            });
            $(opt.dom.promptNode).on('click', function () {
                $(opt.dom.prompt).hide();
                if (opt.onSelect)
                    opt.onSelect($(this));
            });
            $(opt.dom.prompt).css("top", $(opt.target).offset().top + $(opt.target).outerHeight() + 1);
            $(opt.dom.prompt).css("left", $(opt.target).offset().left);
        };

        this.init();
    };

</script>

</body>

</html>