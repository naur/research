package org.naure.common.util;

import org.naure.common.patterns.Func;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * User: hanxy
 * Date: 2010-8-25
 * Time: 10:52:11
 * 文件操作的工具类
 */
public class FileUtil {
    //private final static Log log = LogFactory.getLog(FileUtil.class);
    public static final String coding = "UTF-8";

    /**
     * 保存到文件
     */
    public static void toFile(InputStream inputStream, File outputFile) throws IOException {
        OutputStream outputStream = null;
        try {
            outputStream = new FileOutputStream(outputFile, false);
            int readLength;
            byte[] buf = new byte[4096];
            while (((readLength = inputStream.read(buf)) != -1)) {
                outputStream.write(buf, 0, readLength);
                outputStream.flush();
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        } finally {
            if (inputStream != null) {
                inputStream.close();
            }
            if (outputStream != null) {
                outputStream.flush();
                outputStream.close();
            }
        }
    }

    /**
     * 保存到文件
     */
    public static void toFile(InputStream inputStream, String outputFilePath, String outputFileName) throws IOException {
        File file = new File(outputFilePath);
        if (!file.exists()) {
            file.mkdirs();
        }
        FileUtil.toFile(inputStream, new File(outputFilePath + outputFileName));
    }

    //删除文件
    public static boolean deleteFile(String filePath) {
        File file = new File(filePath);
        boolean result = false;
        if (file.exists() && file.isFile()) {
            result = file.delete();
        }
        return result;
    }

    public static void copyFile(String source, String destination) {

    }

    //获取目录下最新文件
    public static File getLatestFile(String directory) {
        File result = null;
        File dir = new File(directory);
        if (!dir.isDirectory()) {
            return result;
        }

        File[] files = dir.listFiles();
        for (File file : files) {
            if (file.isFile()) {
                if (null == result) result = file;
                if (file.lastModified() > result.lastModified()) result = file;
            }
        }

        return result;
    }

    //获取目录下所有文件
    public static List<File> getFiles(String directory, boolean... traverse) {
        List<File> result = new ArrayList<File>();
        File dir = new File(directory);
        if (!dir.isDirectory()) {
            return result;
        }

        File[] files = dir.listFiles();
        for (File file : files) {
            if (file.isDirectory() && traverse.length > 0 && traverse[0]) {
                result.addAll(FileUtil.getFiles(file.getPath(), traverse));
            } else {
                result.add(file);
            }
        }

        return result;
    }

    //获取目录下所有文件
    public static List<String> getFiles(String directory, Func<File, String>... selector) {
        List<String> result = new ArrayList<String>();
        File dir = new File(directory);
        if (!dir.isDirectory()) {
            return result;
        }

        File[] files = dir.listFiles();
        for (File file : files) {
            if (file.isDirectory()) {
                result.addAll(FileUtil.getFiles(file.getPath(), selector));
            } else {
                String temp = selector.length == 0 ? file.getPath() : selector[0].execute(file);
                if (null != temp) result.add(temp);
            }
        }

        return result;
    }

    //按照格式创建新的文件名
    public static String newFileName(String fileName) {
        //UUID.randomUUID().toString();
        return (new SimpleDateFormat("yyyyMMdd-HHmmss-SSS")).format(new Date()) + "-" + fileName(fileName) + fileType(fileName);
    }

    //获取文件扩展名
    public static String fileType(String fileName) {
        String type = "";
        if (null != fileName && fileName.lastIndexOf(".") >= 0) {
            type = fileName.substring(fileName.lastIndexOf("."));
        }
        return type;
    }

    //获取文件名
    public static String fileName(String fileName) {
        String name = "";
        if (null != fileName && fileName.lastIndexOf(".") >= 0) {
            return fileName.substring(0, fileName.lastIndexOf("."));
        }
        return name;
    }

    /**
     * 读取远程文件
     *
     * @param path 远程文件地址  e.g:http://www.jvcms.com/tps.txt
     * @return
     */
    public static String readRemoteFile(String path) {
        URL urlFile = null;//声明URL
        HttpURLConnection httpUrl = null; //HTTP Url连接
        String result = "";
        try {
            urlFile = new URL(path);
            httpUrl = (HttpURLConnection) urlFile.openConnection();
            httpUrl.connect();
            BufferedReader d = new BufferedReader(new InputStreamReader(httpUrl.getInputStream(), coding));
            String line;
            while ((line = d.readLine()) != null) {
                result += line;
            }
            //result = new String(result.getBytes("ISO-8859-1"),coding);
        } catch (Exception e) {
            //log.error("FileUtil----------->readRemoteFile error",e);
        }
        return result;
    }

    /**
     * 本地写文件
     *
     * @param path    要写入的文件地址
     * @param context 要写入的内容
     * @return
     */
    public static boolean writeLocalFile(String path, String context) {
        boolean isSuccess = true;
        OutputStreamWriter output = null;
        try {
            output = new OutputStreamWriter(new FileOutputStream(path), coding);
            output.write(context);
        } catch (Exception e) {
            isSuccess = false;
            //log.error("FileUtil----------->write "+path+" error",e);
        } finally {
            try {
                output.close();
            } catch (Exception ex) {
                isSuccess = false;
                //log.error("FileUtil----------->close OutputStreamWriter error",ex);
            }
        }
        return isSuccess;
    }

    /**
     * 保存文件信息
     *
     * @param local 上传的文件
     * @param save  保存的文件
     * @return
     * @throws java.io.IOException
     */
    public static boolean uploadImage(File local, File save) throws IOException {
        InputStream in = null;
        OutputStream out = null;
        try {
            in = new BufferedInputStream(new FileInputStream(local), 2048);
            out = new BufferedOutputStream(new FileOutputStream(save), 2048);
            byte[] buffer = new byte[2048];
            while (in.read(buffer) > 0) {
                out.write(buffer);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            if (null != in) {
                in.close();
            }
            if (null != out) {
                out.close();
            }
        }
    }

    /**
     * 读取指定路径下的文件内容
     *
     * @param filePath
     * @return
     */
    public static String readLocalFile(String filePath) {
        StringBuffer sb = new StringBuffer(1000);
        InputStreamReader read = null;
        BufferedReader reader = null;    //定义BufferedReader
        try {
            read = new InputStreamReader(new FileInputStream(filePath), coding);
            reader = new BufferedReader(read);
            //按行读取文件并加入到content中。
            //当readLine方法返回null时表示文件读取完毕。
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line + "\n");
            }
        } catch (IOException e) {
            //log.error("FileUtil----------->read "+filePath+" error",e);
        } finally {
            //最后要在finally中将 reader对象关闭
            if (reader != null) {
                try {
                    reader.close();
                } catch (Exception e) {
                    //log.error("FileUtil----------->close "+filePath+" BufferedReader error",e);
                }
            }
        }
        return sb.toString();
    }

    /**
     * 删除本地文件
     *
     * @param path
     * @return
     */
    public static boolean removeLocalFile(String path) {
        File file = new File(path);
        boolean isSuccessed = false;
        if (file.exists() && file.isFile()) {
            isSuccessed = file.delete();
        }
        return isSuccessed;
    }

    public static boolean copyLocalFile(String srcFilePath, String destFilePath) throws Exception {
        File srcFile = new File(srcFilePath);
        boolean isSuccessed = false;
        if (srcFile.exists() && srcFile.isFile()) {
            File destFile = new File(destFilePath);
            //FileUtils.copyFile(srcFile, destFile);
        }
        return isSuccessed;
    }
}
