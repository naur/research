package org.naure.common.cryptography;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;

import java.security.*;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 12/31/11
 * Time: 4:57 PM
 * To change this template use File | Settings | File Templates.
 */
//DSA 签名
public class DSASignatureDeformatter {

    public synchronized static DSASignatureDeformatter getInstance() throws Exception {
        if (instance == null) {
            instance = new DSASignatureDeformatter();
            instance.initKey();
        }
        return instance;
    }

    ////签名(非对称加密DSA)
    public byte[] sign(byte[] data) throws NoSuchAlgorithmException, InvalidKeyException, SignatureException {
//        //消息签名：SHA1
//        MessageDigest alg = MessageDigest.getInstance("SHA-1");
//        alg.update(new Gson().toJson(where).getBytes());
//        container.addDTOParam("hash", new String(alg.digest()));
//
//        //对称加密：AES 加密
//        KeyGenerator keygen = KeyGenerator.getInstance("AES");
//        keygen.init(11111);
//        Key key = keygen.generateKey();
//        Cipher cipher = Cipher.getInstance("AES");
//        cipher.init(Cipher.ENCRYPT_MODE, key);
//        container.addDTOParam("AES", new String(cipher.doFinal(new Gson().toJson(where).getBytes())));

        Signature signature = Signature.getInstance(ALGORITHM);
        signature.initSign(keyPair.getPrivate());
        signature.update(data);
        return signature.sign();
    }
    public byte[] sign(String data) throws SignatureException, InvalidKeyException, NoSuchAlgorithmException {
        return sign(data.getBytes());
    }

    //验证签名
    public boolean verify(byte[] data, byte[] signed) throws NoSuchAlgorithmException, InvalidKeyException, SignatureException {
        Signature signature = Signature.getInstance(ALGORITHM);
        signature.initVerify(keyPair.getPublic());
        signature.update(data);
        return signature.verify(signed);
    }
    public boolean verify(String data, String signed) throws SignatureException, InvalidKeyException, NoSuchAlgorithmException, DecoderException {
        return verify(data.getBytes(), Hex.decodeHex(signed.toCharArray()));
    }

    // 产生 KEY
    public void initKey(final String seed) throws NoSuchAlgorithmException {
        KeyPairGenerator keygen = KeyPairGenerator.getInstance(ALGORITHM);
        keygen.initialize(KEY_SIZE, new SecureRandom() {{
            this.setSeed(seed.getBytes());
        }});
        this.keyPair = keygen.generateKeyPair();
    }

    public void initKey() throws Exception {
        initKey(DEFAULT_SEED);
    }


    private final int KEY_SIZE = 1024;
    private final String ALGORITHM = "DSA";
    private final String DEFAULT_SEED = "export-report";
    private KeyPair keyPair;
    private static DSASignatureDeformatter instance;
}
