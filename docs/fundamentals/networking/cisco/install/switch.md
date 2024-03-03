# Cisco Switch: Layer 2 and Layer 3

This document outlines the steps for basic configuration of Cisco switches, including setups for both Layer 2 and Layer 3 functionalities. It's designed to serve as a practical guide for configuring Cisco switches to support various network architectures and designs.

## Basic Switch Configuration

### Accessing the Switch

1. Connect to the switch via a console cable and use a terminal emulator to access the switch's command-line interface (CLI).

### Entering Global Configuration Mode

```bash linenums="1" 
Switch> enable
Switch# configure terminal
```
Setting Hostname

```bash linenums="1"

Switch(config)# hostname SwitchA
```
Configuring Console and VTY Passwords

```bash linenums="1"

SwitchA(config)# line console 0
SwitchA(config-line)# password PASSWORD
SwitchA(config-line)# login
SwitchA(config-line)# exit
SwitchA(config)# line vty 0 15
SwitchA(config-line)# password PASSWORD
SwitchA(config-line)# login
SwitchA(config-line)# exit
```
Setting the Enable Secret Password

```bash linenums="1"

SwitchA(config)# enable secret EN_PASSWORD
```
Saving the Configuration

```bash linenums="1"

SwitchA(config)# exit
SwitchA# copy running-config startup-config
```
Layer 2 Switch Configuration
Creating VLANs

```bash linenums="1"

SwitchA(config)# vlan 10
SwitchA(config-vlan)# name Sales
SwitchA(config-vlan)# exit
SwitchA(config)# vlan 20
SwitchA(config-vlan)# name Engineering
SwitchA(config-vlan)# exit
```
Assigning VLANs to Ports

```bash linenums="1"

SwitchA(config)# interface range fa0/1 - 2
SwitchA(config-if-range)# switchport mode access
SwitchA(config-if-range)# switchport access vlan 10
SwitchA(config-if-range)# exit
SwitchA(config)# interface range fa0/3 - 4
SwitchA(config-if-range)# switchport mode access
SwitchA(config-if-range)# switchport access vlan 20
SwitchA(config-if-range)# exit
```
Configuring Trunk Ports

```bash linenums="1"

SwitchA(config)# interface fa0/24
SwitchA(config-if)# switchport mode trunk
SwitchA(config-if)# switchport trunk allowed vlan 10,20
SwitchA(config-if)# exit
```
Layer 3 Switch Configuration
Enabling IP Routing

```bash linenums="1"

SwitchA(config)# ip routing
```
Creating SVIs for Inter-VLAN Routing

```bash linenums="1"

SwitchA(config)# interface vlan 10
SwitchA(config-if)# ip address 192.168.10.1 255.255.255.0
SwitchA(config-if)# no shutdown
SwitchA(config-if)# exit
SwitchA(config)# interface vlan 20
SwitchA(config-if)# ip address 192.168.20.1 255.255.255.0
SwitchA(config-if)# no shutdown
SwitchA(config-if)# exit
```
Configuring Static Routing (if necessary)

```bash linenums="1"

SwitchA(config)# ip route 0.0.0.0 0.0.0.0 <next_hop_ip_address>
```
Configuring Routing Protocols (Optional)

For example, enabling OSPF:

```bash linenums="1"

SwitchA(config)# router ospf 1
SwitchA(config-router)# network 192.168.10.0 0.0.0.255 area 0
SwitchA(config-router)# network 192.168.20.0 0.0.0.255 area 0
SwitchA(config-router)# exit
```
Verifying Configurations
For Layer 2

```bash linenums="1"

SwitchA# show vlan brief
SwitchA# show interfaces trunk
```
For Layer 3

```bash linenums="1"

SwitchA# show ip interface brief
SwitchA# show ip route
```
By following these configuration steps, your Cisco switch will be equipped to handle both Layer 2 switching and Layer 3 routing functionalities. Adjust configurations based on your specific network requirements and design.