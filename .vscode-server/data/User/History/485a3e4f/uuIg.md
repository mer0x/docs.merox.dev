This is my proxmox vms config files
!!! info "VMs configurations on 3 nodes Proxmox Cluster"
    === "Citadel"


        ###### K3S-01

        ``` bash 
        root@citadel:/home/merox# cat /etc/pve/nodes/citadel/qemu-server/304.conf
        ````
        
        ``` bash linenums="1"
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


    === "Helix"

        ###### K3S-02
        ``` bash
        root@helix:~# cat /etc/pve/nodes/helix/qemu-server/305.conf 
        ```
        ``` bash linenums="1"
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

    === "Nexus"


        ###### K3S-03
        ``` bash
        root@nexus:~# cat /etc/pve/nodes/nexus/qemu-server/306.conf 
        ```
        ``` bash linenums="1"
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
        ``` bash
        root@nexus:~# cat /etc/pve/nodes/nexus/qemu-server/105.conf 
        ```

        ```bash linenums="1"
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