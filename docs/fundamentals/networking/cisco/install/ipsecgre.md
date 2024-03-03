# Configuring IPsec over GRE Tunnel on Cisco Devices

This guide outlines the steps to configure an IPsec over GRE tunnel on Cisco routers. This setup combines the advantages of GRE tunnels, such as the ability to encapsulate a wide variety of network layer protocols over a single point-to-point link, with the security features of IPsec.

## Prerequisites

- Two Cisco routers with IP connectivity.
- IOS with crypto support.
- Knowledge of the network topology and IP addressing scheme.

## Configuration Overview

1. **Configure GRE Tunnel**
2. **Configure IPsec**
3. **Verify the Tunnel and IPsec Configuration**

## Step 1: Configure GRE Tunnel

### Router A Configuration

Replace `192.168.1.1` with the local tunnel IP and `192.168.2.1` with the remote tunnel IP.

```bash linenums="1" linenums="1"
interface Tunnel0
 ip address 192.168.1.1 255.255.255.0
 tunnel source <RouterA_Outside_Interface>
 tunnel destination <RouterB_Public_IP>
 tunnel mode gre ip
```
Router B Configuration

Replace 192.168.2.1 with the local tunnel IP and 192.168.1.1 with the remote tunnel IP.

```bash linenums="1"
interface Tunnel0
 ip address 192.168.2.1 255.255.255.0
 tunnel source <RouterB_Outside_Interface>
 tunnel destination <RouterA_Public_IP>
 tunnel mode gre ip
```
Step 2: Configure IPsec
Define ISAKMP Policy (on both routers)

This policy defines the main mode parameters.

```bash linenums="1"

crypto isakmp policy 10
 encr aes 256
 authentication pre-share
 group 5
```
Specify Pre-shared Key (on both routers)

Replace YourPSK with your pre-shared key.

```bash linenums="1"

crypto isakmp key YourPSK address <Peer_Public_IP>
```
Define IPsec Transform Set (on both routers)

This set specifies the transform parameters for IPsec.

```bash linenums="1"

crypto ipsec transform-set MYSET esp-aes 256 esp-sha-hmac
 mode transport
```
Define the Crypto Map (on both routers)

This map ties the ISAKMP and IPsec configuration together and applies it to the interface.

```bash linenums="1"

crypto map MYMAP 10 ipsec-isakmp
 set peer <Peer_Public_IP>
 set transform-set MYSET
 match address 100
```
Apply the Crypto Map to the Outside Interface (on both routers)

Replace OutsideInterface with the actual interface name facing the peer.

```bash linenums="1"

interface <OutsideInterface>
 crypto map MYMAP
```
Configure Access Control List (ACL) (on both routers)

This ACL permits the GRE tunnel traffic to be encrypted by IPsec.

```bash linenums="1"
access-list 100 permit gre host <Local_Public_IP> host <Peer_Public_IP>
```
Step 3: Verify the Tunnel and IPsec Configuration
Verify GRE Tunnel Status

```bash linenums="1"

show interface Tunnel0
```
Verify IPsec SA (Security Associations)

```bash linenums="1"

show crypto ipsec sa
```
Verify ISAKMP SA

```bash linenums="1"

show crypto isakmp sa
```
These commands help ensure that the GRE tunnel is up and that IPsec encryption is operational between the two endpoints.

By following these steps, you will have successfully configured an IPsec over GRE tunnel on Cisco routers, providing a secure and encapsulated VPN tunnel for your network traffic.