# Protection

Welcome to the core of my digital fortress. With over two years of professional experience as a cybersecurity engineer and a profound journey in system administration focusing on Linux, networking, and security, I've honed my skills to craft a homelab that's not just a testbed for technology but a bulwark against digital threats.

#### Restricted Access:
**Access Control**: Leveraging biometric verification and secure device placement, ensuring that only I can navigate the sanctum of my technological domain.

**Network Moats**: Configuring smart port guardians on my routers and switches to permit solely known allies (devices), repelling any unidentified invaders.
#### Firewall rules
Here are some basic examples of my firewall rules from my homelab.

##### Command
```bash linenums="1"
iptables -A INPUT -d LAN_ADDRESS -p tcp --dport 8443 -j ACCEPT #Anti Lockout rule
iptables -A FORWARD -d DESTINATION_IP -j ACCEPT #pfB_PRI1_v4 auto rule
iptables -A FORWARD -s OPT1_NET -d X.X.X.X -p tcp -j ACCEPT
```

####  Essential Service Management

   **Service Disablement**: Non-essential services across devices are disabled to minimize vulnerabilities.
        **Example**: Disabling unused services via **systemctl disable** <service_name> on Linux
        servers.
!!! warning
    Always check your running services. ON ALL SYSTEMS, LINUX IS JUST AN EXAMPLE HERE

```bash linenums="1"
  root@alto ~# systemctl list-units --type=service --state=active
  UNIT                                 LOAD   ACTIVE SUB     DESCRIPTION
  blk-availability.service             loaded active exited  Availability of block devices
  console-getty.service                loaded active running Console Getty
  container-getty@1.service            loaded active running Container Getty on /dev/tty1
  container-getty@2.service            loaded active running Container Getty on /dev/tty2
  containerd.service                   loaded active running containerd container runtime
  cron.service                         loaded active running Regular background program processing daemon
  dbus.service                         loaded active running D-Bus System Message Bus
  docker.service                       loaded active running Docker Application Container Engine
  fail2ban.service                     loaded active running Fail2Ban Service
```

####  Security Assessment Tools

   **Nessus, Nmap, Wireshark**<br> Employed for deep network insights.
Nmap Command:
 ```bash linenums="1"
     nmap -sV -O -p- 192.168.1.0/24 #for comprehensive network scanning.
 ```
**Burp Suite** <br>
Utilized for rigorous web application testing.
Demo: Setting up Burp Suite as a proxy for HTTP/HTTPS traffic to inspect web application requests and responses.

####  Internet Exposure and Protection

**HTTPS Traffic** 
Managed by Traefik, ensuring secure web exposure.
Traefik Config: Enforce HTTPS using middleware redirections in Traefik.
    ![traefik2.png](/traefik2.png)


**SSL/TLS**:
Harnessing LetsEncrypt and Cloudflare for encrypted connections.
Cloudflare Setting: Enabling "WAF" in the Cloudflare dashboard.
![cf.png](/cf.png)

####  Firewall and Intrusion Detection

**pfBlockerNG & Snort**: Integral for intrusion detection.<br>
**Snort Rule**:
```bash linenums="1"
 alert icmp any any -> $HOME_NET any (msg:"ICMP test"; sid:1000001;) #for ICMP traffic monitoring.
```
#### Monitoring with Grafana
        Grafana Dashboard: Set up a dashboard to monitor real-time network traffic and alerts from Snort.
![fwgraf.png](/fwgraf.png)

####  Password Management

   **Password Manager**: Essential for secure credential storage.
        **Best Practice**: Use of complex passwords and enabling two-factor authentication where possible.

####  Penetration Testing

   **Kali Linux Machine**: Dedicated for security testing and penetration exercises.
        **Metasploit Example**: msfconsole to launch Metasploit for vulnerability exploitation and testing.
 ```bash
   msfconsole
use exploit/multi/handler
set PAYLOAD <payload_name>
set LHOST <local_host>
exploit
```
!!! info
    If you want to learn more about Cybersec, I recommend you to practice more about security on this vulnerable VM created by Rapid7: [Metasploitable2](https://docs.rapid7.com/metasploit/metasploitable-2/)
