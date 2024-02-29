# Hypervisors 


Welcome to the heart of our homelab's virtualization infrastructure at Merox Cloud! Here, we're excited to share the details of our powerful Proxmox hypervisors that keep our virtual machines (VMs) and containers (LXCs) running smoothly. Dive into the core of PulsarDC, our Proxmox cluster, and discover the technology that powers our homelab network.


!!! info
    Proxmox environment is bolstered by three robust servers, each housed in its own mini-PC, known as Citadel, Helix, and Nexus. These servers are the pillars of the PulsarDC cluster, bringing high availability and flexibility to our virtualized infrastructure.

## Cluster Overview 
![Proxmox cluster](/images/content/proxmoxenv.png){ align=left }


## HA
-    **High Availability Proxmox Servers**: Citadel, Helix, and Nexus form the resilient backbone of our PulsarDC cluster, ensuring our applications and services are always up and running.


-    **Dedicated Network Segmentation**: Our Proxmox servers are part of a distinct network segment, isolated from other devices in our homelab. This setup enhances security and performance, ensuring that our virtualization infrastructure operates in an optimized environment.

![High Availability](/images/content/ha.png "High Availability")
## Storage
-    **NVME Storage with LVM**: Each server boasts an NVME drive for the operating system, utilizing Logical Volume Management (LVM). This setup offers fast boot times and efficient storage management, key for high-performance virtualization.

-    **ZFS Replication**: For data integrity and disaster recovery, our servers utilize ZFS Replication. This technology ensures our data is mirrored across the cluster, providing an extra layer of protection against data loss.

-    **NFS Backup Storage on Synology NAS**: A crucial aspect of our virtualization infrastructure is our backup strategy. We utilize an NFS-mounted storage location on our Synology NAS for all our backup needs. This setup allows us to store backups of VMs and containers according to our defined policies, ensuring data safety and quick recovery in case of any failure.

![Proxmox Storage](/images/content/storage.png "Proxmox Storage")

## Network
-    **1 Gb/s Ethernet Connection**: Connectivity is key in a homelab environment. Each of our Proxmox servers is equipped with a 1GB/s Ethernet connection, ensuring speedy and reliable network communication.
-
-    **VM and LXC Support**: Our cluster hosts a variety of Virtual Machines (VMs) and Linux Containers (LXCs), catering to a wide range of applications and services. These are seamlessly integrated into our network through bridge connections, allowing direct IP allocation from our DHCP pool.
-
-    **Seamless pfSense Integration**: Connection to our pfSense gateway is handled with ease, thanks to the bridge mode setup. This allows for straightforward management of network traffic and security, providing IPs directly from our DHCP pool to VMs and LXCs.

![Proxmox Network](/images/content/pnetwork.png "Proxmox Network")




## VM & LXC configs

[!ref icon="rocket" text="Also check"](/resources/virtualization/)

+++ Citadel
### VMs 💻

###### K3S-01

```bash
root@citadel:/home/merox# cat /etc/pve/nodes/citadel/qemu-server/304.conf
````
```bash #
balloon: 0
boot: c
bootdisk: scsi0
cipassword: $5$jkhUIiuewfe79877Ebvfeuewffew32dLrj1
ciupgrade: 0
ciuser: merox
cores: 2
cpu: host
ide2: Storage:vm-304-cloudinit,media=cdrom,size=4M
ipconfig0: ip=dhcp
memory: 16384
meta: creation-qemu=8.1.2,ctime=1706184272
name: k3s-01
net0: virtio=FB:10:22:1C:2E:0B,bridge=vmbr0
numa: 0
onboot: 1
scsi0: Storage:vm-304-disk-0,size=128204M,ssd=1
scsihw: virtio-scsi-pci
serial0: socket
smbios1: uuid=2eee58c6-6212-47f4-b7a5-73143cf5a6cf
sockets: 2
sshkeys: ssh-rsa%
vga: serial0
vmgenid: b09d281c-3ee0-44dc-bc43-5b1afeba8a83
```

### LXC 📦

#### **K3S-master-01**

```bash
root@citadel:/home/merox# cat /etc/pve/nodes/citadel/lxc/301.conf
````

``` bash #
arch: amd64
cores: 4
features: fuse=1
hostname: k3s-master-01
memory: 4096
net0: name=eth0,bridge=vmbr0,firewall=1,hwaddr=FC:14:11:E0:A7:02,ip=dhcp,type=veth
onboot: 1
ostype: ubuntu
rootfs: Storage:subvol-301-disk-1,size=50G
swap: 0
lxc.apparmor.profile: unconfined
lxc.cgroup.devices.allow: a
lxc.cap.drop: 
lxc.mount.auto: "proc:rw sys:rw"
```

### LXC K3S 💼
``` bash #
arch: amd64
cores: 4
features: fuse=1
hostname: lxc-k3s-ct-ready
memory: 4096
net0: name=eth0,bridge=vmbr0,firewall=1,hwaddr=BC:24:11:78:33:4B,ip=dhcp,type=veth
ostype: ubuntu
rootfs: Storage:basevol-210-disk-0,size=50G
swap: 0
template: 1
lxc.apparmor.profile: unconfined
lxc.cgroup.devices.allow: a
lxc.cap.drop: 
lxc.mount.auto: "proc:rw sys:rw"
```


>Note: It's important that the container is stopped when you try to edit the file, otherwise Proxmox's network filesystem will prevent you from saving it.{.is-warning}

In order, these options **(1) disable AppArmor**, **(2) allow the container's cgroup** to access all devices, **(3) prevent dropping any capabilities** for the container, and **(4) mount /proc and /sys** as read-write in the container.

Next, we need to publish the kernel boot configuration into the container. Normally, this isn't needed by the container since it runs using the host's kernel, but the Kubelet uses the configuration to determine various settings for the runtime, so we need to copy it into the container. To do this, first start the container using the Proxmox web UI, then run the following command on the Proxmox host:
```bash
pct push <container id> /boot/config-$(uname -r) /boot/config-$(uname -r)
```

Finally, in each of the containers, we need to make sure that /dev/kmsg exists. Kubelet uses this for some logging functions, and it doesn't exist in the containers by default. For our purposes, we'll just alias it to /dev/console. In each container, create the file /usr/local/bin/conf-kmsg.sh with the following contents:
```bash
#!/bin/sh -e
if [ ! -e /dev/kmsg ]; then
    ln -s /dev/console /dev/kmsg
fi
mount --make-rshared /
```

This script symlinks /dev/console as /dev/kmsg if the latter does not exist. Finally, we will configure it to run when the container starts with a SystemD one-shot service. Create the file /etc/systemd/system/conf-kmsg.service with the following contents:
```bash #
[Unit]
Description=Make sure /dev/kmsg exists

[Service]
Type=simple
RemainAfterExit=yes
ExecStart=/usr/local/bin/conf-kmsg.sh
TimeoutStartSec=0

[Install]
WantedBy=default.target
```

Finally, enable the service by running the following:
```bash
chmod +x /usr/local/bin/conf-kmsg.sh
systemctl daemon-reload
systemctl enable --now conf-kmsg
```

Special thanks to:  https://garrettmills.dev/

+++ Helix
### VMs 💻
###### K3S-02
```bash
root@helix:~# cat /etc/pve/nodes/helix/qemu-server/305.conf 
```
```bash #
balloon: 0
boot: c
bootdisk: scsi0
cipassword: $2ATZCNhUIiuewfe79877Ebvfeuewffew32dLrj14jvg5WdLrj1
ciupgrade: 0
ciuser: merox
cores: 2
cpu: host
ide2: Storage:vm-305-cloudinit,media=cdrom,size=4M
ipconfig0: ip=dhcp
memory: 16384
meta: creation-qemu=8.1.2,ctime=1706184272
name: k3s-02
net0: virtio=FE:21:11:35:72:3A,bridge=vmbr0
numa: 0
onboot: 1
scsi0: Storage:vm-305-disk-0,size=128204M,ssd=1
scsihw: virtio-scsi-pci
serial0: socket
smbios1: uuid=4a38edc1-641d-4c9a-bc50-d1b236fe6de0
sockets: 2
sshkeys: ssh-rsa%
vga: serial0
vmgenid: a643e4a7-4d57-4655-b0ab-d151991d724e
```

### LXC 📦
###### K3S-master-02
```bash
root@helix:/etc/pve/nodes/helix/lxc# cat /etc/pve/nodes/helix/lxc/302.conf 
```
```bash #
arch: amd64
cores: 4
features: fuse=1
hostname: k3s-master-02
memory: 4096
net0: name=eth0,bridge=vmbr0,firewall=1,hwaddr=BC:24:11:3A:A1:2A,ip=dhcp,type=veth
onboot: 1
ostype: ubuntu
rootfs: Storage:subvol-302-disk-1,size=50G
swap: 0
lxc.apparmor.profile: unconfined
lxc.cgroup.devices.allow: a
lxc.cap.drop: 
lxc.mount.auto: "proc:rw sys:rw"
```

###### Ansible
```bash
root@helix:/etc/pve/nodes/helix/lxc# cat 100.conf 
```
```bash #
arch: amd64
cores: 2
features: nesting=1
hostname: ansible
memory: 1024
nameserver: 10.57.57.1
net0: name=eth0,bridge=vmbr0,firewall=1,gw=10.57.57.1,hwaddr=92:9C:BD:89:57:E1,ip=10.57.57.113/24,type=veth
onboot: 1
ostype: debian
rootfs: Storage:subvol-100-disk-0,size=32G
searchdomain: merox.cloud
swap: 1024
tags: docker;intern;linux
```

###### Alto ( docker )
```bash
root@helix:/etc/pve/nodes/helix/lxc# cat 102.conf 
```
```bash #
#For cloning
arch: amd64
cores: 2
features: mount=nfs,nesting=1
hostname: alto
memory: 3072
nameserver: 10.57.57.1
net0: name=eth0,bridge=vmbr0,firewall=1,gw=10.57.57.1,hwaddr=E6:B3:3E:64:D2:CA,ip=10.57.57.56/24,type=veth
onboot: 1
ostype: debian
rootfs: Storage:subvol-102-disk-1,size=50G
swap: 512
tags: container;intern;linux
lxc.cap.drop: 
```

+++ Nexus

### VMs 💻
###### K3S-03
```bash
root@nexus:~# cat /etc/pve/nodes/nexus/qemu-server/306.conf 
```
```bash #
balloon: 0
boot: c
bootdisk: scsi0
cipassword: $2$ATjfo389y932hWDbjdwqNSNML8izsrq9I4jvg5WdLrj1
ciupgrade: 0
ciuser: merox
cores: 2
cpu: host
ide2: Storage:vm-306-cloudinit,media=cdrom,size=4M
ipconfig0: ip=dhcp
memory: 14336
meta: creation-qemu=8.1.2,ctime=1706184272
name: k3s-03
net0: virtio=DF:14:12:DF:42:DA,bridge=vmbr0
numa: 0
onboot: 1
scsi0: Storage:vm-306-disk-0,size=128204M,ssd=1
scsihw: virtio-scsi-pci
serial0: socket
smbios1: uuid=1319e437-1cc7-4444-9d14-2444d0953a29
sockets: 2
sshkeys: ssh-rsa%
vga: serial0
vmgenid: 6551cc5e-630c-40d3-ad9e-c5a622b71711
```
###### Windows Server 2019 ( AD/DNS )
```bash
root@nexus:~# cat /etc/pve/nodes/nexus/qemu-server/105.conf 
```
```bash #
boot: order=ide0;net0
cores: 2
cpu: host
ide0: Storage:vm-105-disk-1,format=raw,size=32G
machine: pc-i440fx-7.2
memory: 4096
meta: creation-qemu=7.2.0,ctime=1687109663
name: winserver
net0: e1000=D6:46:16:2C:CD:8C,bridge=vmbr0
numa: 0
onboot: 1
ostype: win10
scsihw: virtio-scsi-single
smbios1: uuid=3a978c5c-e1d0-482a-b12f-8fa3a5e14ce1
sockets: 2
startup: order=1
tags: windows
unused0: Storage:vm-105-disk-0
vmgenid: 14c4f1ad-59fb-4a73-981a-b97e89fab435
```
### LXC 📦
###### K3S-master-03
```bash
root@nexus:~# cat /etc/pve/nodes/nexus/lxc/303.conf 
```
```bash #
arch: amd64
cores: 4
features: fuse=1
hostname: k3s-master-03
memory: 4096
net0: name=eth0,bridge=vmbr0,firewall=1,hwaddr=FC:14:11:21:50:3B,ip=dhcp,type=veth
onboot: 1
ostype: ubuntu
rootfs: Storage:subvol-303-disk-0,size=50G
swap: 0
lxc.apparmor.profile: unconfined
lxc.cgroup.devices.allow: a
lxc.cap.drop: 
lxc.mount.auto: "proc:rw sys:rw"
```
###### K3S-admin
```bash
root@nexus:~# cat /etc/pve/nodes/nexus/lxc/300.conf 
```
```bash #
arch: amd64
cores: 4
features: fuse=1
hostname: k3s-admin
memory: 4096
net0: name=eth0,bridge=vmbr0,firewall=1,hwaddr=E4:14:11:68:C2:D6,ip=dhcp,type=veth
onboot: 1
ostype: ubuntu
rootfs: Storage:subvol-300-disk-1,size=50G
swap: 0
lxc.apparmor.profile: unconfined
lxc.cgroup.devices.allow: a
lxc.cap.drop: 
lxc.mount.auto: "proc:rw sys:rw"
```