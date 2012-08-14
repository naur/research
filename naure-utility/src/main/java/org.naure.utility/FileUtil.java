package org.naure.utility;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * User: hanxy
 * Date: 2010-8-25
 * Time: 10:52:11
 * 文件操作的工具类
 */
public class FileUtil {
    //private final static Log log = LogFactory.getLog(FileUtil.class);
    public static final String coding="UTF-8";

    /**
     * 读取远程文件
     * @param path  远程文件地址  e.g:http://www.jvcms.com/tps.txt
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
            BufferedReader d = new BufferedReader(new InputStreamReader(httpUrl.getInputStream(),coding));
            String line;
            while((line = d.readLine())!=null) {
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
     * @param path      要写入的文件地址
     * @param context   要写入的内容
     * @return
     */
    public static boolean writeLocalFile(String path,String context) {
        boolean isSuccess = true;
        OutputStreamWriter output = null;
        try {
            output = new OutputStreamWriter(new FileOutputStream(path),coding);
            output.write(context);
        } catch(Exception e) {
            isSuccess = false;
            //log.error("FileUtil----------->write "+path+" error",e);
        } finally {
            try {
                output.close();
            } catch(Exception ex) {
                isSuccess = false;
                //log.error("FileUtil----------->close OutputStreamWriter error",ex);
            }
        }
        return isSuccess;
    }

    /***
     * 保存文件信息
     * @param local 上传的文件
     * @param save 保存的文件
     * @return
     * @throws java.io.IOException
     */
    public static boolean uploadImage(File local, File save) throws IOException{
        InputStream in = null ;
        OutputStream out = null ;
        try  {
            in = new BufferedInputStream(new FileInputStream(local), 2048);
            out = new BufferedOutputStream(new FileOutputStream(save), 2048);
            byte [] buffer = new byte [2048];
            while (in.read(buffer) > 0 )  {
                out.write(buffer);
            }
            return true;
        } catch (Exception e)  {
            e.printStackTrace();
            return false;
        } finally  {
            if ( null != in)  {
                in.close();
            }
            if ( null != out)  {
                out.close();
            }
        }
    }
    /**
     * 读取指定路径下的文件内容
     * @param filePath
     * @return
     */
    public static String readLocalFile(String filePath) {
        StringBuffer sb = new StringBuffer(1000);
        InputStreamReader read = null;
        BufferedReader reader = null;    //定义BufferedReader
        try{
            read = new InputStreamReader (new FileInputStream(filePath),coding);
            reader = new BufferedReader(read);
            //按行读取文件并加入到content中。
            //当readLine方法返回null时表示文件读取完毕。
            String line;
            while((line = reader.readLine())!=null) {
                sb.append(line+"\n");
            }
        } catch(IOException e){
            //log.error("FileUtil----------->read "+filePath+" error",e);
        } finally {
            //最后要在finally中将 reader对象关闭
            if(reader != null) {
                try {
                    reader.close();
                } catch(Exception e) {
                    //log.error("FileUtil----------->close "+filePath+" BufferedReader error",e);
                }
            }
        }
        return sb.toString();
    }

    /**
     * 删除本地文件
     * @param path
     * @return
     */
    public static boolean removeLocalFile(String path) {
        File file = new File(path);
        boolean isSuccessed = false;
        if(file.exists() && file.isFile()) {
            isSuccessed = file.delete();
        }
        return isSuccessed;
    }
    
    public static boolean  copyLocalFile(String srcFilePath, String destFilePath) throws Exception{
        File srcFile = new File(srcFilePath);
        boolean isSuccessed = false;
        if(srcFile.exists() && srcFile.isFile()) {
            File destFile = new File(destFilePath);
            //FileUtils.copyFile(srcFile, destFile);
        }
        return isSuccessed;
    }
}
