
# Integrating Kerberized Samba with SSSD and Winbind: Passwordless Access Setup

## Overview
This guide covers the integration of SMB, Winbind, and SSSD with Kerberos for passwordless access to Samba shares. This is ideal for environments requiring centralized authentication with Active Directory.

---

## 1. Install Necessary Packages
Ensure all required packages are installed. Here’s a sample command for installing them:
```bash
yum install realmd oddjob oddjob-mkhomedir sssd adcli samba samba-winbind krb5-workstation
```

---

## 2. Join the Machine to the Domain
To join the machine to the Active Directory domain, use the following command:
```bash
realm join <domain> -U <username> --client-software=sssd --membership-software=samba
```

---

## 3. Configure System Files for the Domain
Edit the following configuration files to match your domain settings.

### `/etc/krb5.conf`
This file configures Kerberos, setting defaults and specifying realm details.

```conf
includedir  /etc/krb5.conf.d

[libdefaults]
    default_realm = EXAMPLE.COM
    default_ccache_name = FILE:/tmp/krb5cc_%{uid}
    dns_lookup_realm = true
    dns_lookup_kdc = true
    ticket_lifetime = 24h
    renew_lifetime = 7d
    forwardable = true

[realms]
    EXAMPLE.COM = {
        kdc = serverdc1.example.com
        admin_server = serverdc1.example.com
    }

[logging]
    kdc = FILE:/var/log/krb5/krb5kdc.log
    admin_server = FILE:/var/log/krb5/kadmind.log
    default = SYSLOG:NOTICE:DAEMON
```

---

### `/etc/nsswitch.conf`
Controls lookup order for services like user information. Configure as follows for SSSD:
```conf
passwd:     files sss
group:      files sss
shadow:     files sss
hosts:      files dns

netgroup:   files sss
protocols:  files usrfiles
services:   files sss
automount:  files nis
bootparams: files
```

---

### `/etc/smb.conf`
Defines global settings for Samba and permissions for shared directories.

```conf
[global]
    workgroup = example
    realm = EXAMPLE.COM
    security = ads
    kerberos method = secrets and keytab
    idmap config * : backend = tdb
    idmap config * : range = 10000-199999
    idmap config EXAMPLE.COM : backend = sss
    idmap config EXAMPLE.COM : range = 200000-2147483647
    follow symlinks = yes
    wide links = yes
    unix extensions = no
    ad_update_samba_machine_account_password = True
    log level = 3

[share_point]
    path = /share_point
    browsable = no
    public = no
    guest ok = no
    writeable = yes
    create mask = 0770
    force create mode = 0770
    directory mask = 0770
    force directory mode = 0770
    force group = ad.group
    dfree command = /usr/local/samba/bin/dfree
    valid users = @ad.group@example.com
    oplocks = False
    level2 oplocks = False
```

---

### `/etc/sssd/sssd.conf`
Configures SSSD to integrate with Active Directory and define access controls.

```conf
[sssd]
domains = example.com
domain_resolution_order = example.com
config_file_version = 2
services = nss, pam

[nss]
filter_groups = root
filter_users = root, nobody, pbsdata
debug_level = 2

[domain/example.com]
default_shell = /bin/bash
krb5_store_password_if_offline = True
cache_credentials = True
krb5_realm = EXAMPLE.COM
realmd_tags = manages-system joined-with-adcli
id_provider = ad
fallback_homedir = /home/%u
ad_domain = example.com
use_fully_qualified_names = False
full_name_format = %1$s
ldap_id_mapping = True
ignore_group_members = True
access_provider = simple
enumerate = False

simple_allow_groups = gr.ad1@example.com, gr.ad2@example.com
simple_allow_users = user1ad@example.com, user2ad@example.com
```

---

## 4. Clear Caches and Restart Services
Use the following script to clear caches and restart the necessary services. This can help after reboots if mount points are not accessible.

Create the file `clearcaches.sh` and add the following:
```bash
#!/bin/bash

systemctl stop smb winbind
rm -f /var/lib/samba/*.tdb
rm -f /var/cache/samba/*.tdb
net cache flush
sss_cache -E
systemctl stop sssd
rm -rf /var/lib/sss/db/*
systemctl restart sssd smb winbind
```

Run the script as needed:
```bash
./clearcaches.sh
```

If you still have problem accessing samba mount points from client, you can also try to execute:

```bash
realm leave
```
and after the server is no longer in the domain, you can join again:

```bash
realm join <domain> -U <username> --client-software=sssd --membership-software=samba
```
if you still have problem accessing samba mount points from client.


---

## 5. Test Authentication and Kerberos Ticketing
Verify that user authentication and Kerberos ticket creation work as expected:
```bash
id <username>       # Verifies AD group membership
kinit <username>    # Obtains a Kerberos ticket
klist               # Lists the current Kerberos ticket
```

---

## 6. Check SSSD-Winbind ID Mapping Plugin
Confirm that the SSSD-Winbind ID Mapping Plugin is in use:
```bash
alternatives --display cifs-idmap-plugin
```
> This should display that the link points to `/usr/lib64/cifs-utils/cifs_idmap_sss.so`.

---

## 7. Test the Samba Share
From a Windows client, try mapping the Samba share by accessing it via Windows Explorer:
```plaintext
\\<hostname>\<smb-share>
```

---