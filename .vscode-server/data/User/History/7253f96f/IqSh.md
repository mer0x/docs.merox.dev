# Monitoring stack

The monitoring stack with Grafana, Prometheus, and Alertmanager delivers efficient system and application insights. Grafana visualizes metrics, Prometheus monitors and alerts on time series data, and Alertmanager handles alert notifications. This setup ensures proactive infrastructure management.

```yaml

version: '3.3'
networks:
  monitoring:
    driver: bridge
volumes:
  prometheus_data: {}
services:
  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    restart: unless-stopped
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    ports:
      - 9100:9100
    networks:
      - monitoring
	  
  prometheus:
    image: prom/prometheus:latest
    user: "1001"
    environment:
      - PUID=1001
      - PGID=1001
    container_name: prometheus
    restart: unless-stopped
    volumes:
      - /home/1001/promgrafnode/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - /home/1001/promgrafnode/prometheus/alert.rules.yml:/etc/prometheus/alert.rules.yml
      - /home/1001/promgrafnode/prometheus:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--web.enable-lifecycle'
    ports:
      - 9090:9090
    networks:
      - monitoring
	  
  grafana:
    image: grafana/grafana:latest
    user: "1001"
    container_name: grafana
    ports:
      - 3000:3000
    restart: unless-stopped
    volumes:
      - /home/1001/promgrafnode/grafana/provisioning/datasources:/etc/grafana/provisioning/datasources
      - /home/1001/promgrafnode/grafana:/var/lib/grafana
    networks:
      - monitoring
	  
  alertmanager:
    image: prom/alertmanager:latest
    command:
      - '--config.file=/etc/alertmanager/config.yml'
    ports:
      - '9093:9093'
    volumes:
      - '/home/alertmanager/:/etc/alertmanager'
    networks:
      - alertmanager-net

networks:
  alertmanager-net:
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    container_name: cadvisor
    ports:
      - 8081:8080
    networks:
      - monitoring
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:rw
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    depends_on:
      - redis
  redis:
    image: redis:latest
    container_name: redis
    ports:
      - 6379:6379
    networks:
      - monitoring
 ```
 
 ## prometheus.yml

 ```yaml
global:
  scrape_interval: 1m

rule_files:
  - alert.rules.yml

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alto.merox.cloud:9093']


scrape_configs:
  - job_name: "prometheus"
    scrape_interval: 1m
    static_configs:
    - targets: ["localhost:9090"]

  - job_name: "AltoVM"
    static_configs:
    - targets: ["node-exporter:9100"]

  - job_name: "CirrusVM"
    static_configs:
    - targets: ["cirrus.merox.cloud:9100"]

  - job_name: "cadvisor_alto"
    scrape_interval: 5s
    static_configs:
    - targets: ["alto.merox.cloud:8081"]

  - job_name: "cadvisor_cirrus"
    scrape_interval: 5s
    static_configs:
    - targets: ["cirrus.merox.cloud:8081"]

#  - job_name: "cadvisor_tower"
#    scrape_interval: 5s
#    static_configs:
#    - targets: ["media.merox.cloud:8081"]

#Windows machines
  - job_name: "Tower"
    scrape_interval: 5s
    static_configs:
    - targets: ["tower.merox.cloud:9182"]

  - job_name: "Wserver"
    scrape_interval: 5s
    static_configs:
    - targets: ["wserver.merox.cloud:9182"]
#Proxmox
  - job_name: 'pve-exporter'
    static_configs:
      - targets:
        - nexus.merox.cloud:9221
    metrics_path: /pve
    params:
      module: [default]
```

## alert.rules.yml

```yaml
groups:
- name: alert.rules
  rules:
  - alert: InstanceDown
    expr: up == 0
    for: 1m
    labels:
      severity: "critical"
    annotations:
      summary: "Endpoint {{ $labels.instance }} down"
      description: "{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 1 minutes."

  - alert: HostOutOfMemory
    expr: node_memory_MemAvailable / node_memory_MemTotal * 100 < 25
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "Host out of memory (instance {{ $labels.instance }})"
      description: "Node memory is filling up (< 25% left)\n  VALUE = {{ $value }}\n  LABELS: {{ $labels }}"


  - alert: HostOutOfDiskSpace
    expr: (node_filesystem_avail{mountpoint="/"}  * 100) / node_filesystem_size{mountpoint="/"} < 50
    for: 1s
    labels:
      severity: warning
    annotations:
      summary: "Host out of disk space (instance {{ $labels.instance }})"
      description: "Disk is almost full (< 50% left)\n  VALUE = {{ $value }}\n  LABELS: {{ $labels }}"


  - alert: HostHighCpuLoad
    expr: (sum by (instance) (irate(node_cpu{job="node_exporter_metrics",mode="idle"}[5m]))) > 80
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "Host high CPU load (instance {{ $labels.instance }})"
      description: "CPU load is > 80%\n  VALUE = {{ $value }}\n  LABELS: {{ $labels }}"

  - alert: HighHTTPRequestRate
    expr: rate(http_requests_total[1m]) > 1000
    for: 1m
    labels:
      severity: warning
    annotations:
      summary: "Possible DDoS Attack Detected"
      description: "High rate of HTTP requests detected. Possible DDoS attack."
```

```bash 
docker-compose -f /path/to/your/docker-compose-file.yml up -d
```