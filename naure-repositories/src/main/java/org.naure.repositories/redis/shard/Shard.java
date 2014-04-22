package org.naure.repositories.redis.shard;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * 分片
 * 
 * @author hexiaofeng
 * 
 */
public class Shard implements Comparable<Shard> {
	private int id;// 名称
	private int weight = 1;// 权重
	private List<Node> healths = new CopyOnWriteArrayList<Node>();// 健康节点
	private List<Node> weaks = new CopyOnWriteArrayList<Node>();// 不可用节点

	/**
	 * empty construct
	 * 
	 * @return
	 */
	public Shard() {
	}

	/**
	 * construct with special id and health nodes string
	 * 
	 * @param id
	 * @param healthNodes
	 *            health nodes string. node uri separate by comma
	 * @return
	 */
	public Shard(int id, String healthNodes) {
		this.id = id;
		String[] urls = healthNodes.split(",");
		for (int i = 0; i < urls.length; i++) {
			healthNodes = urls[i].trim();
			if (!healthNodes.isEmpty()) {
				healths.add(new Node(healthNodes));
			}
		}
	}

	/**
	 * Construct a shallow clone of an exists shard.
	 * 
	 * @param shard
	 */
	public Shard(Shard shard) {
		this.id = shard.id;
		this.weight = shard.weight;
		this.healths = new CopyOnWriteArrayList<Node>(shard.getHealths());
		this.weaks = new CopyOnWriteArrayList<Node>(shard.getWeaks());
	}

	@Override
	public String toString() {
		return getName() + ":" + healths + weaks;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@JsonIgnore
	public String getName() {
		return "SHARD-" + id;
	}

	public int getWeight() {
		return this.weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

	public List<Node> getHealths() {
		return this.healths;
	}

	public void setHealths(List<Node> healths) {
		this.healths = healths;
	}

	public List<Node> getWeaks() {
		return this.weaks;
	}

	public void setWeaks(List<Node> weaks) {
		this.weaks = weaks;
	}

    @JsonIgnore
	public Node getFirstHealth() {
		if (healths == null || healths.isEmpty())
			return null;
		return healths.get(0);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Shard other = (Shard) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public int compareTo(Shard o) {
		if (o == null)
			return 1;
		return id - o.id;
	}
}