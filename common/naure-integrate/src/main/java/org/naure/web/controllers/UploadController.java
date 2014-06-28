package org.naure.web.controllers;

import org.naure.common.entities.Information;
import org.naure.common.entities.InformationLevel;
import org.naure.common.patterns.exception.Func;
import org.naure.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/13/12
 * Time: 5:38 PM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "upload", method = {RequestMethod.GET, RequestMethod.POST})
public class UploadController extends ControllerBase {
    @RequestMapping()
    public String view() {
        return "upload";
    }

    @RequestMapping("file")
    public Information upload(@RequestParam MultipartFile fileData, HttpServletRequest request) throws IOException {
        this.setApplicationPath(request);
        Map params = new HashMap<String, Object>();
        params.put("fileData", fileData);
        if (request.getParameter("fileName") != null)
            params.put("newFileName", request.getParameter("fileName"));
        if (request.getParameter("folder") != null)
            params.put("folder", request.getParameter("folder"));

        return handler(params, new Func<Map, Information>() {
            @Override
            public Information execute(Map params) throws Exception {
                Information<String> information = new Information<String>();

                MultipartFile multipartFile = (MultipartFile) params.get("fileData");
                if (multipartFile.isEmpty()) {
                    information.setData("Error");
                    information.setKeywords("multipartFile is empty!");
                    information.setLevel(InformationLevel.ERROR.value());
                    return information;
                }

                String newFileName = params.get("newFileName") != null ? String.valueOf(params.get("newFileName")) : makeNewFileName(multipartFile.getOriginalFilename());
                String filePath = filePath(String.valueOf(params.get("folder")), information);
                if (InformationLevel.ERROR.value() == information.getLevel()) {
                    return information;
                }

                InputStream inputStream = null;
                FileOutputStream outputStream = null;
                try {
                    //fileInputStream = new FileInputStream(fileData);
                    inputStream = multipartFile.getInputStream();

                    //保存文件到服务器
                    outputStream = new FileOutputStream(new File(filePath + newFileName), false);
                    byte[] buf = new byte[4096];
                    int readLength;
                    while (((readLength = inputStream.read(buf)) != -1)) {
                        outputStream.write(buf, 0, readLength);
                        outputStream.flush();
                    }
                    information.setData(newFileName);
                    information.setLevel(InformationLevel.SUCCESS.value());
                } catch (Exception ex) {
                    information.setData("Error");
                    information.setKeywords(ex.toString());
                    information.setLevel(InformationLevel.ERROR.value());
                } finally {
                    if (outputStream != null)
                        outputStream.close();
                    if (inputStream != null)
                        inputStream.close();
                }

                return information;
            }
        });
    }

    private String filePath(String path, Information information) {
        String filePath = this.applicationPath + "/upload/" + (path == null ? "" : path + "/");
        try {
            //生成目录
            File tempF = new File(filePath);
            if (!tempF.exists()) {
                tempF.mkdirs();
            }
            information.setLevel(InformationLevel.SUCCESS.value());
        } catch (Exception ex) {
            information.setData("Error");
            information.setOpInfo("filePath()");
            information.setKeywords(ex.getMessage());
            information.setLevel(InformationLevel.ERROR.value());
        }
        return filePath;
    }

    //产生新文件名
    private String makeNewFileName(String originalFilename) {
        //UUID.randomUUID().toString();
        return (new SimpleDateFormat("yyyyMMdd-HHmmss-SSS")).format(new Date()) + "-" + fileType(originalFilename);
    }

    //获取文件扩展名
    private String fileType(String fileDataFileName) {
        if (null == fileDataFileName)
            return ".txt";
        if (fileDataFileName.lastIndexOf(".") >= 0) {
            return fileDataFileName.substring(fileDataFileName.lastIndexOf("."));
        }
        return ".xls";
    }

    //protected String basePath = ServletActionContext.getServletContext().getRealPath("");
}
