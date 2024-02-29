# Ansible

In the realm of DevOps and automation, I've embarked on a journey exploring various configuration management and orchestration tools. Over the years, I've worked with **Puppet** and **Salt** for personal and professional projects, each offering unique insights into the automation landscape. Recently, my homelab has seen a new addition: **Ansible**.

## Embracing Ansible in My Homelab 🛠
Ansible has become my go-to tool for automating and managing my homelab infrastructure. Its simplicity and agentless architecture make it an appealing choice for quick wins in automation without the overhead of managing agents on nodes. Here, I'll share insights into two of the playbooks I've employed to streamline my setup.

## A Glimpse into My Ansible Playbooks 📖

!!! info 
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



### ⏰ Automation with Crontab

To ensure these playbooks run regularly and keep my systems in peak condition, I've scheduled them with crontab entries. This setup automates weekly updates for both Linux and Windows servers, with output and errors redirected to specific files for easy monitoring:
```bash
0 0 * * 0 /usr/local/bin/ansible-playbook /home/merox/playbooks/upgrade.yml -i /home/merox/playbooks/hosts.ini >> /home/merox/playbooks/last_update.txt 2>> /home/merox/playbooks/last_update.err
0 0 * * 0 /usr/local/bin/ansible-playbook -i /home/merox/playbooks/hosts_windows.ini -T 60 /home/merox/playbooks/upgrade_windows.yml >> /home/merox/playbooks/last_windows_update.txt 2>> /home/merox/playbooks/last_windows_update.err
```

## Continuous Learning and the Path Forward with Ansible 🌱

As I venture deeper into the world of DevOps with my homelab, I recognize that my journey with Ansible is just beginning. Despite the initial strides I've made, there's a vast landscape of knowledge and skills yet to be explored. Ansible, with its powerful capabilities and simplicity, has opened a new chapter in my automation endeavors, one where I'm both a learner and an explorer.


## The Road Ahead 🛣
As I continue to build, automate, and refine my homelab with Ansible, the journey is as much about acquiring new skills as it is about applying them. The beauty of Ansible lies not just in its technical prowess but in its community, resources, and the continuous evolution of its ecosystem.

The exploration doesn't end with mastering Ansible. The DevOps landscape is ever-changing, and with tools like Terraform on the horizon, the integration of configuration management and infrastructure provisioning is an exciting prospect. The journey ahead promises a blend of challenges and opportunities, pushing the boundaries of what's possible in my homelab and beyond.

## Playbooks

<div class="grid cards" markdown>

- <a href="/fundamentals/networking/configs/DNS/">:material-transit-connection-variant: __Linux UPgrade__ for domain to IP translation</a>
- <a href="/fundamentals/networking/configs/DHCP/">:material-ip-network: __Windows UPgrade__  for automatic IP assignment</a>
- <a href="/operations/containerization/k3s/manifests/traefik">:simple-traefikproxy: __Proxmox VMs__ for routing and load balancing</a>
- > :material-keyboard: __More configs__ ... soon

</div>
