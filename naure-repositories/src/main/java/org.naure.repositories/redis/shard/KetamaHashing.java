package org.naure.repositories.redis.shard;

import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;

/**
 * Hash一致性算法实现
 * 
 * @author hexiaofeng
 * 
 */
public class KetamaHashing implements ShardPolicy {

	private HashAlgorithm hashAlgo;
	private TreeMap<Long, Shard> nodes;
	private List<Shard> shards;

    public KetamaHashing() {
        this(new MD5Hash());
    }

    public KetamaHashing(HashAlgorithm hashAlgo) {
        this.hashAlgo = hashAlgo;
    }

	public HashAlgorithm getHashAlgo() {
		return this.hashAlgo;
	}

	public void setHashAlgo(HashAlgorithm hashAlgo) {
		this.hashAlgo = hashAlgo;
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
		SortedMap<Long, Shard> tail = nodes.tailMap(hashAlgo.hash(key));
		if (tail.size() == 0) {
			return nodes.get(nodes.firstKey());
		}
		return tail.get(tail.firstKey());
	}

}