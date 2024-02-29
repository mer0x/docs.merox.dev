# InfluxDB

Real-time insights from any time series data with a single, purpose-built database. Run at any scale in any environment in the cloud, on-premises, or at the edge.

```yaml linenums="1"
version: '3'
services:
  influxdb:
    image: influxdb:1.8
    container_name: influxdb
    ports:
      - "8086:8086"  
    volumes:
      - /docker/influxdb:/var/lib/influxdb  
    restart: always  # 
```