---
draft: false 
date: 2024-03-27
categories:
  - kubernetes
  - installation
authors:
  - robertmelcher
comments: true
---

# Tailscale site-to-site pfSense - Linux

I've decided to implement monitoring for my homelab through a cloud virtual machine (VM) (I've opted for Hetzner, but more on that in a future post).

To enhance the security of this setup, I've chosen to establish the cloud VM from Hetzner as the single entry point to my infrastructure. For this purpose, I've opted to use Tailscale for tunneling, not only for client-to-site but also for site-to-site connectivity.

!!! info
    Informations provided by tailscale:
    "Use site-to-site layer 3 (L3) networking to connect two subnets on your Tailscale network with each other. The two subnets are each required to provide a subnet router but their devices do not need to install Tailscale. This scenario applies to Linux subnet routers only."

!!! warning
    This scenario will not work on subnets with overlapping CIDR ranges, nor with 4via6 subnet routing.

<!-- more -->
In my case, there are two private subnets without any connectivity between them.
<br>
Subnet 1 - Homelab:  10.57.57.0/24<br>
Subnet 2 - Cloudlab: 192.168.57.0/24

IP addresses of the routers for each subnet:
<br>
Subnet 1 -> 10.57.57.1 ( pfSense )<br>
Subnet 2 -> 192.168.57.254 ( Linux VM )

## Setting up Tailscale site-to-site on pfSense (Subnet 1)
Let's dive into the configuration. Due to pfSense being based on FreeBSD and Tailscale not offering as much support for pfSense as for other platforms, this configuration is a bit trickier. But let's see how it looks.

### Install tailscale on pfSense:

Navigate to Package Manager:
Go to System > Package Manager in the pfSense web interface.

Install Package: 
Click on the "Available Packages" tab. Search for tailscale and click "Install".

### Configure tailscale on pfSense:


Navigate to Tailscale:
VPN -> Tailscale

#### Authentication:

* Copy auth-key from https://login.tailscale.com/admin/settings/keys
* Generate Auth keys

![Tailscale pfSense](/images/blog-tailscale-pfsense.png)

#### Settings:

* Check: "Enable tailscale" 
* Listen port: leave it as it is
* Check: Accept Subnet Routes
* Optional check: Advertise Exit Node
* Advertised Routes: 10.57.57.0/24 

#### Tricky part: Outbound NAT Rules

Navigate to Firewall-> NAT-> Outbound

#### Make sure Outbound NAT Mode is configured to be configured as:
Hybrid Outbound NAT 
#### Create next manual mapping:

* Interface: Tailscale
* Address Family: IPV4+IPV6
* Protocol: Any
* Source Network or Alias: 10.57.57.0/24
* Destination: Any

This part is broken from last update ( 23.09.1 ) so NAT Alias is missing. <br>
Workaround ( working as expected ):<br>
* Translation section:<br>
    * Address: Network or Alias put the tailscale ip address 100.xx.xx.xx/32<br>
This is how should look like:
![Tailscale pfSense2](/images/blog-tailscale-pfsense2.png)

## Configure tailscale site-to-site on Linux VM (Subnet 2)

### Install tailscale and activate routing:

``` bash linenums="1"
    curl -sSL https://tailscale.com/install.sh | sh #Install tailscale
    echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf #Activate routing for IPv4
    echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.conf #Activate routing for IPv6
    sudo sysctl -p /etc/sysctl.conf # Apply routing configuration at kernel level
```

### On the 192.168.57.254 device, advertise routes for 192.168.57.0/24:

``` bash linenums="1"
    tailscale up --advertise-routes=192.168.57.0/24 --snat-subnet-routes=false --accept-routes
```

Command explained:<br>
<b>--advertise-routes</b>: Exposes the physical subnet routes to your entire Tailscale network.<br>
<b>--snat-subnet-routes=false</b>: Disables source NAT. In normal operations, a subnet device will see the traffic originating from the subnet router. This simplifies routing, but does not allow traversing multiple networks. By disabling source NAT, the end machine sees the LAN IP address of the originating machine as the source.<br>
<b>--accept-routes</b>: Accepts the advertised route of the other subnet router, as well as any other nodes that are subnet routers.

## Enable subnet routes from the admin console 
!!! info 
    This step is not required if using autoApprovers.

Open the Machines page of the admin console, and locate the devices that you configured as subnet routers. You can look for the Subnets badge in the machines list, or use the property:subnet filter to see all devices advertising subnet routes. For each device that you need to approve, click the ellipsis icon menu at the end of the table, and select Edit route settings. In the Edit route settings panel, approve the device.

!!! success
    The Tailscale side of the routing is complete.


### Credits:

<div class="grid cards" markdown>

- <a href="https://tailscale.com/kb/1214/site-to-site#step-2-enable-subnet-routes-from-the-admin-console">:material-file-document: __Tailscale__ Seamless networking for secure connections.</a>
- <a href="https://www.youtube.com/watch?v=Fg_jIPVcioY">:simple-youtube: __Christian McDonald__  YouTube Channel</a>

</div>
