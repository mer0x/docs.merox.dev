# System Monitoring

Monitoring is a cornerstone in ensuring the optimal performance, security, and reliability of my IT infrastructure. I employ two distinct monitoring setups: one tailored specifically for the K3S cluster and another for the broader infrastructure outside of the K3S cluster. Each setup is meticulously chosen to provide comprehensive insights into the health and performance of the systems.

## Monitoring Inside K3S Cluster 

!!! info
    Within the K3S cluster, I leverage a specialized monitoring stack that integrates seamlessly with Kubernetes. This setup offers detailed insights into the health, performance, and logging of the cluster.
### Components 

#### **Grafana**
Used for real-time monitoring and visualization within the K3S cluster. It allows me to create tailored dashboards displaying metrics and logs for easy analysis and troubleshooting.

#### **Prometheus**
Part of the kube-prometheus stack, serving as the primary monitoring database to collect metrics from various components of the K3S cluster.

#### **Alertmanager**
Configured to work alongside Prometheus, managing alerts within the K3S environment to ensure I'm promptly notified about potential issues.

#### **Loki**
Utilized for aggregating and querying logs from across the K3S cluster, facilitating efficient log management alongside metrics in Grafana.

#### **Netdata**
An additional tool deployed for real-time insights into the performance of individual nodes within the K3S cluster.

This tailored setup ensures a comprehensive monitoring solution for the unique needs of Kubernetes environments, offering visibility into every aspect of the cluster's operations.
## Monitoring Outside K3S Cluster 🌍

!!! info
    For the infrastructure outside the K3S cluster, including virtual machines, network components, and the Proxmox cluster, I utilize a robust set of monitoring tools running in Docker containers.


### Components 🛠️

#### **Grafana**: 
Acts as the central visualization tool, offering customizable dashboards for monitoring data related to virtual machines, networking, and the Proxmox cluster.

#### **Prometheus**: 
The core data repository, collecting metrics from Node-exporter, cAdvisor, and Proxmox Exporter, among others, to monitor physical servers, virtual machines, and containers.

#### **Alertmanager**: 
Manages alerts for the broader infrastructure, integrated with Prometheus to ensure a quick response to critical issues.

#### **Node-exporter and Proxmox Exporter**: 
These provide detailed metrics on virtual machines and the Proxmox hypervisor, feeding valuable data into Prometheus for a comprehensive monitoring view.

#### **cAdvisor**: 
Offers insights into Docker container performance, enhancing the overall visibility of the infrastructure's health.

#### **InfluxDB**: 
Utilized for monitoring data from my FreeBSD router running pfSense, aiding in network and security analysis.

This setup is meticulously designed to ensure the health, performance, and security of the entire infrastructure, offering a holistic view of the systems outside the K3S cluster.
## Architecture 🏛️

By segregating my monitoring strategies into inside and outside the K3S cluster, I achieve targeted and effective oversight of my entire infrastructure. Each component within my stacks runs in Docker containers for isolation, scalability, and ease of maintenance. This approach allows me to tailor the monitoring tools and practices to the specific needs and characteristics of different parts of the infrastructure, ensuring comprehensive coverage and proactive management.

## Conclusion 🎯

 My dual monitoring strategy ensures high performance, security, and reliability across all parts of the infrastructure. Adopting a proactive and segmented approach to monitoring allows me to detect and address issues promptly, maintaining the integrity and efficiency of my services.

For further details on configuring and utilizing the monitoring tools within each setup, please refer to the specific sections of this documentation.


Deploy monitoring with Docker: https://merox.cloud/en/Docker/monitoring-compose
Deploy monitoring in Kubernets: https://merox.cloud/en/Kubernetes
