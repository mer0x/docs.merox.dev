# Proxmox LXCs

Containers are a lightweight alternative to fully virtualized machines (VMs). They use the kernel of the host system that they run on, instead of emulating a full operating system (OS). This means that containers can access resources on the host system directly.

The runtime costs for containers is low, usually negligible. However, there are some drawbacks that need be considered:

Only Linux distributions can be run in Proxmox Containers. It is not possible to run other operating systems like, for example, FreeBSD or Microsoft Windows inside a container.

!!! danger
    For security reasons, access to host resources needs to be restricted. Therefore, containers run in their own separate namespaces. Additionally some syscalls (user space requests to the Linux kernel) are not allowed within containers.




!!! info "LXCs configurations on 3 nodes Proxmox Cluster"

    === "Citadel"

        ###### **K3S-master-01**

        ```bash
        root@citadel:/home/merox# cat /etc/pve/nodes/citadel/lxc/301.conf
        ```

        ``` bash linenums="1"
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

    === "Helix"


        ###### K3S-master-02
        ```bash
        root@helix:/etc/pve/nodes/helix/lxc# cat /etc/pve/nodes/helix/lxc/302.conf 
        ```
        ``` bash linenums="1"
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
        ``` bash linenums="1"
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
        ``` bash linenums="1"
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


    === "Nexus"

        ###### K3S-master-03
        ```bash
        root@nexus:~# cat /etc/pve/nodes/nexus/lxc/303.conf 
        ```
        ``` bash linenums="1"
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
        ``` bash linenums="1"
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

## Configuration for K3S

I was struggle many hours to make K3S to work on LXCs, and here I want to special thanks to this guy: https://garrettmills.dev/ <br>
So let's start how can you make K3S run on LXC.

!!! warning

    ###### LXC K3S 💼
    ``` bash hl_lines="11-14"
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

1. Make sure you add above highlighted lines to your LXC config.
2. >Note: It's important that the container is stopped when you try to edit the file, otherwise Proxmox's network filesystem will prevent you from saving it.
3. In order, these options **(1) disable AppArmor**, **(2) allow the container's cgroup** to access all devices, **(3) prevent dropping any capabilities** for the container, and **(4) mount /proc and /sys** as read-write in the container.
4. Next, we need to publish the kernel boot configuration into the container. Normally, this isn't needed by the container since it runs using the host's kernel, but the Kubelet uses the configuration to determine various settings for the runtime, so we need to copy it into the container. To do this, first start the container using the Proxmox web UI, then run the following command on the Proxmox host:
5.
```bash
pct push <container id> /boot/config-$(uname -r) /boot/config-$(uname -r)
```
6. Finally, in each of the containers, we need to make sure that /dev/kmsg exists. Kubelet uses this for some logging functions, and it doesn't exist in the containers by default. For our purposes, we'll just alias it to /dev/console. In each container, create the file /usr/local/bin/conf-kmsg.sh with the following contents:
```bash linenums="1"
#!/bin/sh -e
if [ ! -e /dev/kmsg ]; then
    ln -s /dev/console /dev/kmsg
fi
mount --make-rshared /
```

7.This script symlinks /dev/console as /dev/kmsg if the latter does not exist. Finally, we will configure it to run when the container starts with a SystemD one-shot service. Create the file /etc/systemd/system/conf-kmsg.service with the following contents:

```bash linenums="1"
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

8.Finally, enable the service by running the following:
```bash linenums="1"
chmod +x /usr/local/bin/conf-kmsg.sh
systemctl daemon-reload
systemctl enable --now conf-kmsg
```