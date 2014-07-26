package org.naure.repositories.redis.shard;

import java.nio.charset.Charset;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Hash一致性算法实现
 * 
 * @author hexiaofeng
 * @author xiaofei
 * 
 */
public class KetamaHashing implements ShardPolicy {

	private HashAlgorithm hashAlgo;
	private TreeMap<Long, Shard> nodes;
	private List<Shard> shards;

    /**
     * The default pattern used for extracting a key tag. The pattern must have
     * a group (between parenthesis), which delimits the tag to be hashed. A
     * null pattern avoids applying the regular expression for each lookup,
     * improving performance a little bit is key tags aren't being used.
     */
    private final Pattern tagPattern;
    // the tag is anything between {}
    public static final Pattern DEFAULT_KEY_TAG_PATTERN = Pattern
            .compile("\\{(.+?)\\}");

    private final Charset keyEncoding;

    public KetamaHashing() {
        this(new MD5Hash(), null);
    }

    public KetamaHashing(HashAlgorithm hashAlgo) {
        this(hashAlgo, null);
    }

    /**
     * 
     * @param hashAlgo
     * @param keyTagPattern
     * @since 1.2
     */
    public KetamaHashing(HashAlgorithm hashAlgo, String keyTagPattern) {
        this(hashAlgo, keyTagPattern, "utf-8");
    }

    /**
     * 
     * @param hashAlgo
     * @param keyTagPattern
     * @param keyEncoding
     * @since 1.2.1
     */
    public KetamaHashing(HashAlgorithm hashAlgo, String keyTagPattern, String keyEncoding) {
        if (hashAlgo == null) {
            this.hashAlgo = new MD5Hash();
        } else {
            this.hashAlgo = hashAlgo;
        }
        if (keyTagPattern != null) {
            this.tagPattern = Pattern.compile(keyTagPattern);
        } else {
            this.tagPattern = null;
        }
        this.keyEncoding = Charset.forName(keyEncoding);
    }

	public HashAlgorithm getHashAlgo() {
		return this.hashAlgo;
	}

	@Override
	public void setShards(List<Shard> shards) {
		if (shards == null || shards.isEmpty())
			throw new IllegalArgumentException("shards is empty");
		this.shards = shards;
		if (shards.size() > 1) {
			nodes = new TreeMap<Long, Shard>();
			Shard shard;
			String key;
			for (int i = 0; i < shards.size(); i++) {
				shard = shards.get(i);
				for (int n = 0; n < 160 * shard.getWeight(); n++) {
					key = shard.getName() + "-" + n;
					nodes.put(hashAlgo.hash(key.getBytes()), shard);
				}
			}
		}
	}

	@Override
	public Shard getShard(byte[] key) {
        if (shards == null || shards.isEmpty())
            return null;
        if (shards.size() == 1)
            return shards.get(0);
        return getShard(hashAlgo.hash(key));
	}

    @Override
    public Shard getShard(String key) {
        if (shards == null || shards.isEmpty())
            return null;
        if (shards.size() == 1)
            return shards.get(0);
        return getShard(hashAlgo.hash(getKeyTag(key).getBytes(keyEncoding)));
    }

    private Shard getShard(long hash) {
        SortedMap<Long, Shard> tail = nodes.tailMap(hash);
        if (tail.size() == 0) {
            return nodes.get(nodes.firstKey());
        }
        return tail.get(tail.firstKey());
    }

    /**
     * A key tag is a special pattern inside a key that, if preset, is the only
     * part of the key hashed in order to select the server for this key.
     * 
     * @see Hash tags in http://oldblog.antirez.com/post/redis-presharding.html
     * @param key
     * @return The tag if it exists, or the original key
     */
    private String getKeyTag(String key) {
        if (tagPattern != null) {
            Matcher m = tagPattern.matcher(key);
            if (m.find())
                return m.group(1);
        }
        return key;
    }

}