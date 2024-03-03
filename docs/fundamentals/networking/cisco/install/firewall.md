# Basic Cisco ASA Firewall Configuration Guide

This document outlines the steps for a basic configuration of the Cisco ASA firewall, covering initial setup, interface security levels, NAT configurations, and basic access control rules.

## Initial Setup

### Accessing the ASA

1. Connect to the ASA via console cable and use a terminal emulator to access the ASA's command-line interface (CLI).

### Entering Global Configuration Mode

```bash linenums="1"
asa> enable
Password: [Enter password here]
asa# configure terminal
```
Setting Hostname

```bash linenums="1"

asa(config)# hostname ASAfirewall
```
Configuring Console and VTY Passwords

```bash linenums="1"

ASAfirewall(config)# aaa authentication serial console LOCAL
ASAfirewall(config)# username admin password PASSWORD privilege 15
```
Setting the Enable Secret Password

```bash linenums="1"

ASAfirewall(config)# enable password EN_PASSWORD
```
Configuring Interfaces
Setting Interface Names and Security Levels

```bash linenums="1"

ASAfirewall(config)# interface GigabitEthernet0/0
ASAfirewall(config-if)# nameif outside
ASAfirewall(config-if)# security-level 0
ASAfirewall(config-if)# ip address dhcp setroute
ASAfirewall(config-if)# no shutdown

ASAfirewall(config)# interface GigabitEthernet0/1
ASAfirewall(config-if)# nameif inside
ASAfirewall(config-if)# security-level 100
ASAfirewall(config-if)# ip address 192.168.1.1 255.255.255.0
ASAfirewall(config-if)# no shutdown
```
Configuring PAT (Port Address Translation)

```bash linenums="1"

ASAfirewall(config)# object network obj_any
ASAfirewall(config-network-object)# subnet 0.0.0.0 0.0.0.0
ASAfirewall(config-network-object)# nat (inside,outside) dynamic interface
```
Configuring Access Rules
Allowing Internal Users to Access the Internet

```bash linenums="1"

ASAfirewall(config)# access-list outside_access_in extended permit ip any any
ASAfirewall(config)# access-group outside_access_in in interface outside
```
Allowing SSH Access to the ASA

```bash linenums="1"

ASAfirewall(config)# crypto key generate rsa modulus 2048
ASAfirewall(config)# aaa authentication ssh console LOCAL
ASAfirewall(config)# ssh 192.168.1.0 255.255.255.0 inside
ASAfirewall(config)# ssh timeout 60
```
Saving the Configuration

```bash linenums="1"

ASAfirewall(config)# write memory
```
Verifying Configuration

```bash linenums="1"

ASAfirewall# show running-config interface
ASAfirewall# show running-config object
ASAfirewall# show running-config access-list
```
This guide provides a foundational approach to configuring the Cisco ASA firewall for basic network protection and connectivity. It covers setting up interface names and security levels, configuring PAT to allow internal network access to the internet, and setting up basic access rules. Adjustments might be needed based on your specific network requirements and ASA model.