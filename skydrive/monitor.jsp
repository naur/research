<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ page import="org.springframework.web.context.support.*" %>
<%@ page import="org.springframework.web.context.*" %>
<%@ page import="com.jd.promise.dos.monitor.MonitorService" %>
<!DOCTYPE>
<html>
<head>
    <%!
        void monitor(HttpServletRequest request, HttpServletResponse response) {
            try {
                WebApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());
                MonitorService monitorService = (MonitorService) context.getBean("monitorService");
                monitorService.monitor(request, response);
            } catch (Exception e) {
                request.setAttribute("content", e.getMessage());
                e.printStackTrace();
            } finally {
            }
        }
    %>

    <%
        String path = request.getContextPath();
        String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
        String params = request.getParameter("params");
        if (null != params && !params.isEmpty()) {
            monitor(request, response);
        }
    %>

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Monitor</title>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }

        body {
            font: "Microsoft YaHei", small "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
            color: #676767;
            font-size: 12px;;
        }

        textarea {
            font: italic bold 16px/20px arial, sans-serif;
            color: red;
        }

        span {
            color: red;
        }
    </style>
    <script type="text/javascript" src="/js/jquery.js"></script>
    <script type="text/javascript" src="/js/jquery.utils.js"></script>
    <script type="text/javascript">
        var global = {
            getDistributionTypeAndApptDate: {
                provinceId: 2,
                cityId: 78,
                countyId: 79,
                townId: 0
            },
            getDistributionTypes: {
                distributionType: 2,
                pageNumber: 1
            }
        };
        var dom = {
            params: '#params',
            category: '#category'
        };

        $(function () {
            if (null == $.cookie('params') || 0 >= $.cookie('params').length || 'null' == $.cookie('params'))
                $(dom.params).text(JSON.stringify(global.getDistributionTypeAndApptDate));
            else
                $(dom.params).text($.cookie('params').replace(/^"/g, '').replace(/"$/g, '').replace(/\\/g, ''));

            if (null != $.cookie('category') && 0 < $.cookie('category').length && 'null' != $.cookie('category')) {
                switch ($.cookie('category')) {
                    case "getDistributionTypeAndApptDate":
                        $(dom.category)[0].selectedIndex = 0;
                        break;
                    case  "getDistributionTypes":
                        $(dom.category)[0].selectedIndex = 1;
                        break;
                }
            }

            $(dom.category).live('change', function () {
                $(dom.params).text(JSON.stringify(
                        global[$(dom.category).val()]
                ));
            });
        });
    </script>
</head>
<body>
<form action="<%=basePath %>/monitor.jsp" method="post">
    <table width=100%>
        <thead></thead>
        <tbody>
        <tr>
            <td style="width:750px;">
                参数：<textarea id="params" name="params" rows=5 cols="80"></textarea>
            </td>
            <td>
                <select id="category" name="category">
                    <option value="getDistributionTypeAndApptDate" SELECTED="SELECTED">getDistributionTypeAndApptDate
                    </option>
                    <option value="getDistributionTypes">getDistributionTypes</option>
                </select>
            </td>
            <td style="width: 400px">
                <input type="submit" value="查询"/>
            </td>
        </tr>
        </tbody>
    </table>
</form>
<hr/>
<font color="blue" size="1" face="verdana">
    <%=request.getAttribute("content")%>
</font>
</body>
</html>