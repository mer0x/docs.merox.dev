#### Unbound DNS

Unbound is a validating, recursive, caching DNS resolver. It is designed to be fast and lean and incorporates modern features based on open standards.

```bash 
[2.7.0-RELEASE][merox@fw]/root: cat /var/unbound/unbound.conf
##########################
# Unbound Configuration
##########################

##
# Server configuration
##
server:

chroot: /var/unbound
username: "unbound"
directory: "/var/unbound"
pidfile: "/var/run/unbound.pid"
use-syslog: yes
port: 53
verbosity: 1
hide-identity: yes
hide-version: yes
harden-glue: yes
do-ip4: yes
do-ip6: yes
do-udp: yes
do-tcp: yes
do-daemonize: yes
module-config: "iterator"
unwanted-reply-threshold: 0
num-queries-per-thread: 4096
jostle-timeout: 200
infra-keep-probing: yes
infra-host-ttl: 900
infra-cache-numhosts: 10000
outgoing-num-tcp: 10
incoming-num-tcp: 10
edns-buffer-size: 1432
cache-max-ttl: 86400
cache-min-ttl: 0
harden-dnssec-stripped: yes
msg-cache-size: 4m
rrset-cache-size: 8m

num-threads: 2
msg-cache-slabs: 2
rrset-cache-slabs: 2
infra-cache-slabs: 2
key-cache-slabs: 2
outgoing-range: 4096
#so-rcvbuf: 4m

prefetch: no
prefetch-key: no
use-caps-for-id: no
serve-expired: no
aggressive-nsec: no
# Statistics
# Unbound Statistics
statistics-interval: 0
extended-statistics: yes
statistics-cumulative: yes

# TLS Configuration
tls-cert-bundle: "/etc/ssl/cert.pem"

# Interface IP addresses to bind to
interface-automatic: yes

# Outgoing interfaces to be used
outgoing-interface: X.X.X.X

# DNS Rebinding
# For DNS Rebinding prevention
private-address: 127.0.0.0/8
private-address: 10.0.0.0/8
private-address: ::ffff:a00:0/104
private-address: 172.16.0.0/12
private-address: ::ffff:ac10:0/108
private-address: 169.254.0.0/16
private-address: ::ffff:a9fe:0/112
private-address: 192.168.0.0/16
private-address: ::ffff:c0a8:0/112
private-address: fd00::/8
private-address: fe80::/10



# Access lists
include: /var/unbound/access_lists.conf

# Static host entries
include: /var/unbound/host_entries.conf

# dhcp lease entries
include: /var/unbound/dhcpleases_entries.conf



# Domain overrides
include: /var/unbound/domainoverrides.conf
# Forwarding
forward-zone:
        name: "."
        forward-addr: 1.1.1.1
        forward-addr: 8.8.8.8
        forward-addr: X.X.X.188


# Unbound custom options
server:include: /var/unbound/pfb_dnsbl.*conf


###
# Remote Control Config
###
include: /var/unbound/remotecontrol.conf
```