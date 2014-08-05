package org.naure.research.labs.feature;

import org.naure.common.patterns.Enable;
import org.naure.research.labs.Sub;

import java.io.FileOutputStream;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.channels.Channels;
import java.nio.channels.FileChannel;
import java.nio.channels.ReadableByteChannel;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 2/23/13
 * Time: 10:35 AM
 * To change this template use File | Settings | File Templates.
 */
@Enable(false)
public class JIO extends Sub {

    @Override
    public void execute() throws Exception {
        //有 flip
        ByteBuffer buffer = ByteBuffer.allocate(32);
        CharBuffer charBuffer = buffer.asCharBuffer();
        String content = charBuffer.put("Hello ").put("World").flip().toString();
        logger.info(format(
                "flip", content,
                "position", buffer.position()));

        //没有 flip
        ByteBuffer buffer1 = ByteBuffer.allocate(32);
        CharBuffer charBuffer1 = buffer1.asCharBuffer();
        String content1 = charBuffer1.put("Hello ").put("World").toString();
        logger.info(format(
                "noflip", content,
                "position", buffer.position()));

        //Channel
        FileChannel writeChannel = new FileOutputStream("bing.com").getChannel();
        ReadableByteChannel readChannel = Channels.newChannel(new URL("http://cn.bing.com").openStream());
        writeChannel.transferFrom(readChannel, 0, Integer.MAX_VALUE);
    }
}
