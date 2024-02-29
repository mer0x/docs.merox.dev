# Virtual Machines

Virtual machines (VMs) simulate physical computers, enabling the running of different operating systems and applications on a single hardware host. In a Proxmox cluster, VMs host Kubernetes to orchestrate containerized applications, providing efficient resource use and scalability. This configuration supports workload isolation and simplifies application deployment and management.

## Virtual Machines Features

## Why Proxmox and QEMU?

I chose Proxmox and QEMU for their robust performance and open-source nature. Proxmox provides a user-friendly interface on top of QEMU, making complex virtualization tasks manageable. Coupled with KVM, QEMU offers near-native performance, essential for the resource-intensive tasks my VMs perform.


## Virtual Machines Features

- **QEMU Integration**: Utilizing QEMU with KVM enhances performance, making it an ideal choice for my Kubernetes orchestration needs.
- **Multi-OS Support**: Running Windows, Linux, and BSD, ensures flexibility across various projects and tasks.
- **Advanced Management**: QEMU Guest Agent and VNC/Spice Client access simplify management and monitoring.
- **Optimization**: Virtio devices and hotplug capabilities allow for efficient resource use and dynamic scaling.
- **Hardware Utilization**: Host CPU and GPU passthrough ensure optimal performance for specific applications.

## Virtual Machines Cluster Overview

### Ubuntu VMs for Kubernetes

- **Specs**: 3 VMs, each with 16GB RAM, 4 CPU cores, and 100GB SSD.
- **Configuration**: Cloud-init for automation and Longhorn for Kubernetes storage solutions.

### KASM for Secure Browsing

- **Specs**: 6GB RAM, 2 CPU cores, 64GB SSD.
- **Purpose**: Isolates web browsing to protect against online threats.

### Windows Server 2019 for Active Directory

- **Specs**: 6GB RAM, 4 CPU cores, 32GB SSD.
- **Role**: Manages network access, identities, and policies through AD and DNS.

## Enhancing Network and Security

- **DHCP Management**: Handled by pfSense for efficient IP allocation.
- **Backup Strategy**: Bi-weekly backups to a Synology DS223, ensuring data integrity and quick recovery.

## Monitoring and Alerts

- **Real-time Metrics**: Utilizing prometheus-node-exporter.
- **Alert System**: Email notifications via Alertmanager for operational anomalies.

!!! info
    | id       | type | cpu   | maxdisk   | maxmem    | mem     | name        | node    |
    |----------|------|-------|-----------|-----------|---------|-------------|---------|
    | qemu/103 | qemu | 0.00% | 64.00 GiB | 6.00 GiB  | 0.00 B  | kasm        | citadel |
    | qemu/105 | qemu | 4.84% | 32.00 GiB | 4.00 GiB  | 2.02 GiB| winserver   | nexus   |
    | qemu/304 | qemu | 13.36%| 125.20 GiB| 16.00 GiB | 5.18 GiB| k3s-01      | citadel |
    | qemu/305 | qemu | 12.63%| 125.20 GiB| 16.00 GiB | 6.58 GiB| k3s-02      | helix   |
    | qemu/306 | qemu | 17.99%| 125.20 GiB| 14.00 GiB | 8.83 GiB| k3s-03      | nexus   |
    | qemu/800 | qemu | 0.00% | 25.20 GiB | 4.00 GiB  | 0.00 B  | ubuntu-cloud| helix   |

