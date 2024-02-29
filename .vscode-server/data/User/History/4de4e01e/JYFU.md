# Connectivity

#### Connectivity Infrastructure Overview

Gateway to the Internet : The setup begins with a Huawei Optical Network Terminal (ONT) from Orange, in bridge mode, forwarding a public IP address to the pfSense router, marking the gateway to the internet.


#### Core Network Services


###### Security and Management Core


-    **Firewall**: Filters traffic based on security rules.
-    **pfBlockerNG**: Blocks ads and malicious sites 🛡️.
-    **DHCP & DNS Services**: Assigns IP addresses and resolves DNS queries, with Unbound as a secondary DNS resolver 🔄.
-    **Intrusion Detection with Snort**: Monitors for security threats.
-    **Remote Accessibility**: Enabled through WoL and VPNs (IPsec & OpenVPN), offering remote access 🌍.

###### VLAN Management
A TP-Link managed switch facilitates VLAN segmentation, with devices organized within **VLAN57** for streamlined network management.


###### Kubernetes and Traefik 

The Kubernetes Ingress Controller, using Traefik, is pivotal for external access management, simplifying service deployment and routing.

![Traefik](/images/content/traefik2.png "Traefik")

!!!danger 
    A virtual machine running Kali Linux features for network scanning and vulnerability assessments, indicating a strong focus on security. This setup will be detailed further in the Security section.

!!!light 
    In summary, the network is designed for security, efficiency, and scalability. Integrating both traditional and modern technologies, such as Traefik, ensures the lab is prepared for current needs and future growth.




## Configs
See the network configurations of my homelab

<div class="grid cards" markdown>

- <a href="https://google.ro">:material-transit-connection-variant: __DNS__ for domain to IP translation</a>
- <a href="">:material-ip-network: __DHCP__  for automatic IP assignment</a>
- <a href="">:simple-traefikproxy: __Traefik__ for routing and load balancing</a>
- > :material-keyboard: __More configs__ ... soon

</div>
