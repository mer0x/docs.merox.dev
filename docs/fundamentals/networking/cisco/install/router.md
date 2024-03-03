# Basic Cisco Router Configuration Guide

This tutorial covers the essentials of configuring a Cisco router for a CCNA-level routing and switching environment. It includes initial setup, interface configuration, and setting up routing protocols.

## Accessing the Router

1. **Connect to the Router**:
   Use a console cable to connect your computer to the router's console port. Use terminal emulation software (like PuTTY or Tera Term) to access the router's command line interface (CLI).

2. **Enter Global Configuration Mode**:
   After accessing the CLI, enter the global configuration mode to make changes to the router's configuration:

```bash linenums="1"
Router> enable
Router# configure terminal
Router(config)#
```

## Basic Configuration

1. **Set Hostname**:
   Assign a hostname to the router for easy identification:

```bash linenums="1"
Router(config)# hostname MyRouter
MyRouter(config)#
```

2. **Secure Access**:
   Configure a secret password to secure privileged EXEC mode access:

    ```bash linenums="1"
    MyRouter(config)# enable secret mySecretPassword
    ```

   Optionally, set a password for console access:

```bash linenums="1"
MyRouter(config)# line console 0
MyRouter(config-line)# password consolePassword
MyRouter(config-line)# login
MyRouter(config-line)# exit
```

3. **Configure Interfaces**:
   Assign IP addresses to the router's interfaces and bring them up:

```bash linenums="1"
MyRouter(config)# interface GigabitEthernet0/0
MyRouter(config-if)# ip address 192.168.1.1 255.255.255.0
MyRouter(config-if)# no shutdown
MyRouter(config-if)# exit
```

   Repeat these steps for other interfaces as needed, adjusting the interface identifiers and IP addresses according to your network design.

4. **Save Configuration**:
   To save your configuration to the startup configuration file:

```bash linenums="1"
MyRouter(config)# exit
MyRouter# copy running-config startup-config
```

## Setting Up Routing

1. **Static Routing**:
   For a simple network, you can set up static routing by specifying a destination network and the next-hop address or exit interface:

```bash linenums="1"
MyRouter(config)# ip route 0.0.0.0 0.0.0.0 GigabitEthernet0/1
```

   This command sets a default route, directing all unknown traffic to the next hop specified by the `GigabitEthernet0/1` interface.

2. **Dynamic Routing**:


EIGRP Configuration

    Enable EIGRP:

    Specify the EIGRP autonomous system number. This number must match across all routers in the EIGRP domain.

```bash  linenums="1"

RouterA(config)# router eigrp 1
```
Advertise Networks:

Use the network command to specify which networks to advertise via EIGRP.

```bash  linenums="1"

RouterA(config-router)# network 192.168.1.0 0.0.0.255
RouterA(config-router)# network 10.1.1.0 0.0.0.255
```
Optional: Configure EIGRP for IPv6 (if required):

```bash linenums="1"

RouterA(config)# ipv6 router eigrp 1
RouterA(config-rtr)# eigrp router-id 1.1.1.1
RouterA(config-rtr)# no shutdown
RouterA(config)# interface GigabitEthernet0/0
RouterA(config-if)# ipv6 eigrp 1
```
OSPF Configuration

- Enable OSPF:

- Define the OSPF process ID and router ID.

```bash  linenums="1"

RouterA(config)# router ospf 1
RouterA(config-router)# router-id 1.1.1.1
```
Advertise Networks:

Use the network command to advertise networks, specifying the area.

```bash  linenums="1"

RouterA(config-router)# network 192.168.1.0 0.0.0.255 area 0
RouterA(config-router)# network 10.1.1.0 0.0.0.255 area 0
```
Optional: Configure OSPF for IPv6 (if required):

```bash  linenums="1"

RouterA(config)# ipv6 router ospf 1
RouterA(config-rtr)# router-id 1.1.1.1
RouterA(config)# interface GigabitEthernet0/0
RouterA(config-if)# ipv6 ospf 1 area 0
```
Verifying Configuration

After configuring the router, use various show commands to verify the setup and the operation of the dynamic routing protocols.
For EIGRP:

```bash  linenums="1"

RouterA# show ip eigrp neighbors
RouterA# show ip eigrp topology
```
For OSPF:

```bash  linenums="1"

RouterA# show ip ospf neighbor
RouterA# show ip route ospf
```

## Best Practices

- **Security**: Always change default passwords and consider implementing additional security features such as ACLs (Access Control Lists).
- **Backup Configuration**: Regularly backup your router's configuration to avoid data loss.
- **Firmware Updates**: Keep your router's firmware up to date to ensure you have the latest features and security patches.

This guide provides a foundation for configuring a Cisco router in a CCNA routing and switching context. For more detailed configurations and advanced features, refer to Cisco's official documentation and CCNA study resources.
