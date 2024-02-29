# Hypervisors 


Welcome to the heart of our homelab's virtualization infrastructure at Merox Cloud! Here, we're excited to share the details of our powerful Proxmox hypervisors that keep our virtual machines (VMs) and containers (LXCs) running smoothly. Dive into the core of PulsarDC, our Proxmox cluster, and discover the technology that powers our homelab network.


!!! info
    Proxmox environment is bolstered by three robust servers, each housed in its own mini-PC, known as Citadel, Helix, and Nexus. These servers are the pillars of the PulsarDC cluster, bringing high availability and flexibility to our virtualized infrastructure.

## Cluster Overview 
![Proxmox cluster](/images/content/proxmoxenv.png) 
*Proxmox cluster*


## HA
-    **High Availability Proxmox Servers**: Citadel, Helix, and Nexus form the resilient backbone of our PulsarDC cluster, ensuring our applications and services are always up and running.


-    **Dedicated Network Segmentation**: Our Proxmox servers are part of a distinct network segment, isolated from other devices in our homelab. This setup enhances security and performance, ensuring that our virtualization infrastructure operates in an optimized environment.

![High Availability](/images/content/ha.png "High Availability")
*High Availability in Proxmox cluster*
## Storage
-    **NVME Storage with LVM**: Each server boasts an NVME drive for the operating system, utilizing Logical Volume Management (LVM). This setup offers fast boot times and efficient storage management, key for high-performance virtualization.

-    **ZFS Replication**: For data integrity and disaster recovery, our servers utilize ZFS Replication. This technology ensures our data is mirrored across the cluster, providing an extra layer of protection against data loss.

-    **NFS Backup Storage on Synology NAS**: A crucial aspect of our virtualization infrastructure is our backup strategy. We utilize an NFS-mounted storage location on our Synology NAS for all our backup needs. This setup allows us to store backups of VMs and containers according to our defined policies, ensuring data safety and quick recovery in case of any failure.

![Proxmox Storage](/images/content/storage.png "Proxmox Storage")
*Proxmox storage*

## Network
**1 Gb/s Ethernet Connection**: Connectivity is key in a homelab environment. Each of our Proxmox servers is equipped with a 1GB/s Ethernet connection, ensuring speedy and reliable network communication.

**VM and LXC Support**: Our cluster hosts a variety of Virtual Machines (VMs) and Linux Containers (LXCs), catering to a wide range of applications and services. These are seamlessly integrated into our network through bridge connections, allowing direct IP allocation from our DHCP pool.

**Seamless pfSense Integration**: Connection to our pfSense gateway is handled with ease, thanks to the bridge mode setup. This allows for straightforward management of network traffic and security, providing IPs directly from our DHCP pool to VMs and LXCs.

![Proxmox Network](/images/content/pnetwork.png "Proxmox Network")
*Proxmox network*


## VM & LXC configs


VM & LXC Configurations Overview

In modern infrastructures, VMs and LXCs are essential for running services and applications. Below is a streamlined overview of the configurations for VMs and LXCs on different servers, focusing on Kubernetes (K3S) clusters and other services.

!!! info "Cluster nodes"
    === "Citadel"
        **VMs**

        K3S-01: A VM with 16GB RAM, 2 CPU cores, and 128GB SSD for running a K3S node, utilizing cloud-init for setup and emphasizing security with pre-configured SSH access.

        **LXC**

        K3S-master-01 & K3S: Containers designated for Kubernetes master nodes, each with 4GB RAM and configured for optimal Kubernetes performance, including necessary    adjustments for logging and device management.

    === "Helix"
        **VMs**

        K3S-02: Similar to K3S-01, ensuring a distributed K3S cluster setup across servers.

        **LXC**

        K3S-master-02, Ansible, and Alto: The master node mirrors Citadel's setup, while Ansible focuses on automation with minimal resources, and Alto is optimized for Docker     with enhanced features like NFS mounts and nesting.

    === "Nexus"
        **VMs**

        K3S-03: A K3S VM with slightly less RAM, maintaining the cluster's resilience and efficiency.

        Windows AD: A VM dedicated to running Windows Active Directory, serving as the backbone for network authentication and policy management across the infrastructure. This VM is crucial for integrating Windows-based services and managing user access in a secure manner.

   
   

!!! warning 
    Key Configuration Insights
    Both VMs and LXCs are fine-tuned for Kubernetes, including logging enhancements and network optimizations.
    Adjustments such as disabling AppArmor and modifying cgroup settings are crucial for Kubernetes compatibility.
    The configurations across servers demonstrate a balanced approach to virtualization, ensuring a scalable, secure, and efficient Kubernetes infrastructure.

## Configs
See the network configurations of my homelab

<div class="grid cards" markdown>

- <a href="/fundamentals/networking/configs/DNS/">:material-transit-connection-variant: __VMs__ for domain to IP translation</a>
- <a href="/fundamentals/networking/configs/DHCP/">:material-ip-network: __LXCs__  for automatic IP assignment</a>

</div>
