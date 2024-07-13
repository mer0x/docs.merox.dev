---
draft: false 
date: 2024-07-13
categories:
  - server
  - installation
authors:
  - robertmelcher
comments: true
---

# Setting Up My Dell R720 in the Home Lab

<figure markdown="span">
  ![header-media](/images/dellr720.svg){ width="400" }
  <figcaption>Dell R720 in my Home Lab</figcaption>
</figure>

I've recently found an incredible deal on a Dell PowerEdge R720 server, featuring 192GB of RAM, dual 6-core CPUs with Hyper-Threading (24 threads), iDrac7 enterprise and eight 300GB SAS drives at 6Gb/s.

*This article covers my journey of integrating this powerhouse into my home lab setup.*

<!-- more -->

## Delivery and Initial Setup

The server arrived in good condition, but I encountered an issue where the front backplane wasn't connected because the included mini SAS cable was too short. I had to search online to find a 59cm mini SAS cable long enough to connect the backplane to the motherboard.

I was lucky and I found this cable pretty quick thanks to this company in Romania: 
[i-Service - MiniSAS](https://i-service.ro/cablu-server-dell-poweredge-r720-dell-sas-ab-8-x-sff%C2%A02.5in-dpn-mjcp4-coms000692a)


## Configuring the Cooling System with IPMItool

Managing server cooling effectively is crucial for optimal performance and longevity. Using IPMItool, I was able to configure the fans to balance between cooling efficiency and noise levels. Below are the steps and commands I used:

### 1. Install IPMItool:

```bash
sudo apt-get install ipmitool
```

### 2. Enable/disable manual fan control
#### 2.1 Enable
```
ipmitool -I lanplus -H ip_addr -U username -P password raw 0x30 0x30 0x01 0x00
```
#### 2.2 Disable
```
ipmitool -I lanplus -H ip_addr -U username -P password raw 0x30 0x30 0x01 0x01
```

### 3. Set fan speed
```
ipmitool -I lanplus -H ip_addr -U username -P password raw 0x30 0x30 0x02 0xff 0x14
```

#### 3.1 Consult the table to adapt the speed to your needs

<details>
  <summary>Vezi tabelul complet</summary>


| Procentaj | Hexadecimal | RPM               |
|-----------|-------------|-------------------|
| 10%       | 0xA         | ~3,300 RPM        |
| 11%       | 0xB         |                   |
| 12%       | 0xC         |                   |
| 13%       | 0xD         |                   |
| 14%       | 0xE         |                   |
| 15%       | 0xF         |                   |
| 16%       | 0x10        | ~3,900 RPM        |
| 17%       | 0x11        |                   |
| 18%       | 0x12        |                   |
| 19%       | 0x13        |                   |
| 20%       | 0x14        | ~4,000 RPM        |
| 21%       | 0x15        | ~4,200 RPM        |
| 22%       | 0x16        | ~4,300 RPM        |
| 23%       | 0x17        | ~4,400 RPM        |
| 24%       | 0x18        | ~4,500 RPM        |
| 25%       | 0x19        | ~4,700 RPM        |
| 26%       | 0x1A        | ~4,800 RPM        |
| 27%       | 0x1B        | ~5,000 RPM        |
| 28%       | 0x1C        | ~5,100 RPM        |
| 29%       | 0x1D        | ~5,200 RPM        |
| 30%       | 0x1E        | ~5,400 RPM        |
| 31%       | 0x1F        | ~5,500 RPM        |
| 32%       | 0x20        | ~5,700 RPM        |
| 33%       | 0x21        | ~5,800 RPM        |
| 34%       | 0x22        | ~6,000 RPM        |
| 35%       | 0x23        | ~6,100 RPM        |
| 36%       | 0x24        | ~6,200 RPM        |
| 37%       | 0x25        | ~6,300 RPM        |
| 38%       | 0x26        | ~6,500 RPM        |
| 39%       | 0x27        |                   |
| 40%       | 0x28        |                   |
| 41%       | 0x29        |                   |
| 42%       | 0x2A        |                   |
| 43%       | 0x2B        |                   |
| 44%       | 0x2C        | ~7,300 RPM        |
| 45%       | 0x2D        |                   |
| 46%       | 0x2E        |                   |
| 47%       | 0x2F        |                   |
| 48%       | 0x30        |                   |
| 49%       | 0x31        |                   |
| 50%       | 0x32        | ~8,000 RPM        |
| 51%       | 0x33        |                   |
| 52%       | 0x34        |                   |
| 53%       | 0x35        |                   |
| 54%       | 0x36        |                   |
| 55%       | 0x37        |                   |
| 56%       | 0x38        |                   |
| 57%       | 0x39        |                   |
| 58%       | 0x3A        |                   |
| 59%       | 0x3B        |                   |
| 60%       | 0x3C        | ~9,400 RPM        |
| 61%       | 0x3D        |                   |
| 62%       | 0x3E        |                   |
| 63%       | 0x3F        |                   |
| 64%       | 0x40        |                   |
| 65%       | 0x41        |                   |
| 66%       | 0x42        |                   |
| 67%       | 0x43        |                   |
| 68%       | 0x44        |                   |
| 69%       | 0x45        |                   |
| 70%       | 0x46        | ~10,800 RPM       |
| 71%       | 0x47        |                   |
| 72%       | 0x48        |                   |
| 73%       | 0x49        |                   |
| 74%       | 0x4A        |                   |
| 75%       | 0x4B        |                   |
| 76%       | 0x4C        |                   |
| 77%       | 0x4D        |                   |
| 78%       | 0x4E        |                   |
| 79%       | 0x4F        |                   |
| 80%       | 0x50        | ~12,100 RPM       |
| 81%       | 0x51        |                   |
| 82%       | 0x52        |                   |
| 83%       | 0x53        |                   |
| 84%       | 0x54        |                   |
| 85%       | 0x55        |                   |
| 86%       | 0x56        |                   |
| 87%       | 0x57        |                   |
| 88%       | 0x58        |                   |
| 89%       | 0x59        |                   |
| 90%       | 0x5A        | ~13,300 RPM       |
| 91%       | 0x5B        |                   |
| 92%       | 0x5C        |                   |
| 93%       | 0x5D        |                   |
| 94%       | 0x5E        |                   |
| 95%       | 0x5F        |                   |
| 96%       | 0x60        |                   |
| 97%       | 0x61        |                   |
| 98%       | 0x62        |                   |
| 99%       | 0x63        |                   |
| 100%      | 0x64        | 15,000 RPM        |

</details>

### 4. Monitor fan status
```bash
ipmitool sensor | grep -i fan
```
!!! info
    Fine-tuning the fan speeds can drastically reduce the noise levels in a home lab environment, which is often a crucial consideration compared to a data center where noise is less of an issue.

## Upgrading Firmware via UpdateYODell.net
Keeping firmware up-to-date is essential for security and performance. I upgraded my R720's firmware using the resources available on UpdateYODell.net. Here’s a step-by-step guide:

### 1. Identify Your Server’s Generation:
Visit [Wikipedia's Dell PowerEdge](https://en.wikipedia.org/wiki/List_of_PowerEdge_servers) page to find your server model and its generation.

### 2. Configure iDRAC for FTP Update:
Access the iDRAC web interface.
Navigate to <b>Maintenance > System Update</b>.
Select <b>FTP</b> as the update method and use the default Dell FTP site: <b>ftp.dell.com</b>.
Click <b>Check for Updates</b> and proceed with the upgrade.

!!! warning
    Updating the firmware ensures that the server runs smoothly and is protected against known vulnerabilities. It can also bring new features and improvements to your system, which is particularly beneficial in a home lab setting where experimentation and learning are key.

## Migrating Proxmox Cluster
Migrating my Proxmox cluster to the new server was simplified by utilizing an NFS share on my Synology DS223 in the homelab. Here’s how I did it:

### 1. Mount NFS Share on New Proxmox Server:
```bash
mount -t nfs <synology_ip>:/path/to/nfs /mnt/pve/nfs
```

### 2. Restore VMs from NFS:
```bash
pct restore <vmid> /mnt/pve/nfs/dump/dump.tar
```

Benefits of Using NFS with Proxmox:
Using an NFS share for backups and migrations offers several advantages:

* Simplicity: Easy to set up and manage.
* Efficiency: Fast transfer speeds, especially with a dedicated network.
* Flexibility: Can easily expand storage as needed.

## Storage Configuration

In the Dell R720, I configured the storage with two 2TB SSDs in RAID 1 for the operating system and primary applications, and six 300GB SAS drives in RAID 10 for data storage. This setup offers a great balance between performance, redundancy, and storage capacity.

### Benefits of This Storage Setup:
* RAID 1 for SSDs: Provides redundancy, ensuring that the OS and critical applications are safe even if one SSD fails.
* RAID 10 for SAS Drives: Combines the speed benefits of RAID 0 with the redundancy of RAID 1, offering fast read/write speeds and protection against drive failures.


## Integrating with UPS Using PowerPanel
To protect the server from power outages, integrating it with a UPS (Uninterruptible Power Supply) was crucial. Instead of using NUT, I opted for PowerPanel:

### 1. Install PowerPanel:
Download and install the PowerPanel software from the CyberPower website.

#### 1.1 Download
```bash
curl -o cyberpowerpowerpanel.deb https://www.cyberpower.com/tw/en/File/GetFileSampleByType?fileId=SU-18070001-06&fileType=Download%20Center&fileSubType=FileOriginal
```
#### 1.2 Install
```bash
dpkg -i cyberpowerpowerpanel.deb
```

### 2. Configure PowerPanel:
I configured PowerPanel in my environment with the following command:
```bash
pwrstat -lowbatt -runtime 300 -capacity 35 -active on -cmd /etc/pwrstatd-lowbatt.sh -duration 1 -shutdown on
```

#### Explanation of the Command:
* -lowbatt: Triggers the action when the battery is low.
* -runtime 300: Triggers the action when the UPS runtime drops below 300 seconds.
* -capacity 35: Triggers the action when the battery capacity drops below 35%.
* -active on: Enables the action.
* -cmd /etc/pwrstatd-lowbatt.sh: Executes the specified script when the condition is met.
* -duration 1: Specifies the duration in minutes to wait before executing the shutdown.
* -shutdown on: Initiates a system shutdown when the condition is met.

<i>This configuration ensures that my server shuts down gracefully in the event of a power outage, protecting data integrity and preventing hardware damage.</i>


## Monitoring and Management
For monitoring the server's performance and health, I use a combination of Prometheus and Grafana. These tools provide detailed metrics and visualizations, allowing me to keep an eye on resource usage, temperatures, and potential issues.

## Backup Strategy
Having a robust backup strategy is crucial in any lab environment. I use Proxmox's built-in backup tools to create regular snapshots of my VMs, which are then stored on the NFS share. This ensures that I can quickly recover from any data loss or corruption.

## Conclusion
Setting up the Dell R720 in my home lab has been an exciting journey. From configuring cooling and upgrading firmware to migrating my Proxmox cluster and integrating with a UPS, every step has enhanced my lab's performance and reliability. Additionally, the advanced network and storage configurations have made my setup more robust and efficient. I hope this guide helps you in your home lab endeavors.

* Stay tuned for more updates and experiments in my home lab!

### Credits

<div class="grid cards" markdown>

- <a href="https://www.youtube.com/watch?v=KamY5zMpXKI&list=LL&index=13">:simple-youtube: __Tutorial__ Dell & HP Server Manual Fan Control.</a>
- <a href="https://github.com/phirephly">:octicons-mark-github-24: __Kenneth Finnegan__  Update your old ass Dell servers</a>
- <a href="https://forum.proxmox.com/threads/cyberpower-power-panel.120376/">:simple-proxmox: __NOiSEA__  Cyberpower power panel</a>

</div>