package org.naur.repositories.redis.shard;

import java.net.URI;
import java.net.URISyntaxException;


/**
 * 节点
 * 
 * @author hexiaofeng
 * 
 */
public class Node {
	public static final int DEFAULT_PORT = 6379;
	private String host;// 主机
	private int port;// 端口
	private int db;

	public Node() {
 	}
	
	/**
	 * construct with uri like string: host[:port][/db]
	 * <p>
	 * port and db is optional with default value.
	 * 
	 * @param host
	 */
	public Node(String uriString) {
        if (uriString == null || uriString.isEmpty()) {
			throw new IllegalArgumentException("invalid url:" + uriString);
		}
        URI uri = null;
        try {
            if (uriString.indexOf("://") < 0) {
                uri = new URI("tcp://" + uriString);
            } else {
                uri = new URI(uriString);
            }
        } catch (URISyntaxException e) {
            uri = null;
        }
        if (uri == null) {
            throw new IllegalArgumentException("invalid url:" + uriString);
		}

		this.host = uri.getHost();
        this.port = (uri.getPort() < 0) ? DEFAULT_PORT : uri.getPort();
        String path = uri.getPath();
        if (path != null && path.trim().length() > 0) {
            try {
                this.db = Integer.parseInt(path.substring(
                        path.lastIndexOf("/") + 1));
            } catch (Exception e) {
                throw new IllegalArgumentException("invalid url:" + uriString);
            }
        } else {
            this.db = 0;
        }
	}

	/**
	 * construct with host/port, default db
	 * 
	 * @param host
	 * @param port
	 */
	public Node(String host, int port) {
		this(host, port, 0);
	}

	public Node(String host, int port, int db) {
		this.host = host;
		if (port < 0) {
			this.port = DEFAULT_PORT;
		} else {
			this.port = port;
		}
		if (db > 0)
			this.db = db;
	}

 	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public int getPort() {
		if(port<0)
			port=DEFAULT_PORT; 
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public int getDb() {
		if(db<0)
			db=0;
		return db;
	}

	public void setDb(int db) {
		this.db = db;
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append(host);
		if (port > 0)
			sb.append(':').append(port);
		if (db > 0)
			sb.append('/').append(db);
		return sb.toString();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + db;
		result = prime * result + ((host == null) ? 0 : host.hashCode());
		result = prime * result + port;
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
		Node other = (Node) obj;
		if (db != other.db)
			return false;
		if (host == null) {
			if (other.host != null)
				return false;
		} else if (!host.equals(other.host))
			return false;
		if (port != other.port)
			return false;
		return true;
	}

}