package org.naure.web.controllers;

import httl.util.StringUtils;
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
    public Information upload(HttpServletRequest request,
                              //上传的文件数据
                              @RequestParam final MultipartFile fileData) throws IOException {
        this.setApplicationPath(request);
        //是否重命名上传的文件
        final boolean rename;
        //从命名上传的文件的名字
        final String fileName;
        //上传文件的路径
        final String folder;

        if (request.getParameter("rename") != null)
            rename = true;
        else
            rename = false;
        if (request.getParameter("fileName") != null)
            fileName = request.getParameter("fileName");
        else
            fileName = null;
        if (request.getParameter("folder") != null)
            folder = request.getParameter("folder");
        else
            folder = null;


        return handler(new Information<String>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) throws Exception {
                information = new Information<String>();

                MultipartFile multipartFile = fileData;
                if (multipartFile.isEmpty()) {
                    information.setData("Error");
                    information.setKeywords("multipartFile is empty!");
                    information.setLevel(InformationLevel.ERROR.value());
                    return information;
                }

                //判断是否重命名上传的文件名，顺序：【fileName，rename】
                String newFileName = null;
                if (StringUtils.isNotEmpty(fileName)) {
                    newFileName = fileName;
                } else {
                    if (rename) {
                        newFileName = makeNewFileName(multipartFile.getOriginalFilename());
                    } else {
                        newFileName = multipartFile.getOriginalFilename();
                    }
                }

                String filePath = filePath(folder, information);
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

    //产生新文件名，格式【原文件名_yyyyMMdd-HHmmss-SSS.xxx】
    private String makeNewFileName(String originalFilename) {
        //UUID.randomUUID().toString();
        return fileName(originalFilename) + "_" + (new SimpleDateFormat("yyyyMMdd-HHmmss-SSS")).format(new Date()) + fileType(originalFilename);
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

    //获取不包含扩展名的文件名
    private String fileName(String fileDataFileName) {
        if (null == fileDataFileName)
            return "";
        if (fileDataFileName.lastIndexOf(".") >= 0) {
            return fileDataFileName.substring(0, fileDataFileName.lastIndexOf("."));
        }
        return ".xls";
    }

    //protected String basePath = ServletActionContext.getServletContext().getRealPath("");
}
