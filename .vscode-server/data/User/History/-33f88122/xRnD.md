##### VM creation in Proxmox

```yaml
---
- name: Create VM in Proxmox
  hosts: localhost
  gather_facts: no
  tasks:
    - name: Create a new VM
      community.general.proxmox_kvm:
        api_user: root@pam
        api_password: YOUR_PASSWORD
        api_host: YOUR_PROXMOX_HOST
        validate_certs: no
        vmid: "100"
        name: "ansible-vm"
        node: "pve"
        memory: 2048
        cores: 2
        sockets: 1
        cpu: "host"
        net: '{"net0":"virtio,bridge=vmbr0"}'
        disk: '{"size":"30G"}'
        ostype: l26
        iso: "local:iso/ubuntu-22.04.1-live-server-amd64.iso"
        ide2: "local:iso/ubuntu-22.04.1-live-server-amd64.iso,media=cdrom"
        bootdisk: "virtio0"
        boot: "cdn"
        description: "Created by Ansible"
        state: "present"