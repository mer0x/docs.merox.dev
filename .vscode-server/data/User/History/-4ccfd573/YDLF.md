# DHCP

Dynamic Host Configuration Protocol (DHCP), allows a device such as pfSense® software to dynamically allocate IP addresses to clients from a predefined pool of addresses. DHCP also sends configuration information to clients such as a gateway, DNS servers, domain name, and other useful settings.

```bash linenums="1"

[2.7.0-RELEASE][admin@fw.merox.cloud]/root: cat /var/dhcpd/etc/dhcpd.conf 

option domain-name "merox.cloud";
option ldap-server code 95 = text;
option domain-search-list code 119 = text;
option arch code 93 = unsigned integer 16; # RFC4578

default-lease-time 7200;
max-lease-time 86400;
log-facility local7;
one-lease-per-client true;
deny duplicates;
update-conflict-detection false;
authoritative;
class "s_lan" {
        match pick-first-value (option dhcp-client-identifier, hardware);
}
subnet X.X.X.X.0 netmask 255.255.255.0 {
        pool {
                option domain-name-servers X.X.X.X.188,X.X.X.X.1;

                range X.X.X.X.202 X.X.X.X.254;
        }

        option routers X.X.X.X.1;
        option domain-name-servers X.X.X.X.188,X.X.X.X.1;
        ping-check true;

}


subclass "s_lan" 1:bc:24:11:f8:37:bd;
host s_lan_7 {
        hardware ethernet bc:24:11:68:c2:c6;
        fixed-address X.X.X.X.80;
        option host-name "k3s-admin";

}
subclass "s_lan" 1:bc:24:11:68:c2:c6;
host s_lan_8 {
        hardware ethernet bc:24:11:e0:a7:02;
        fixed-address X.X.X.X.81;
        option host-name "k3s-master-01";

}

subclass "s_lan" 1:90:09:d0:50:08:4b;
class "s_opt1" {
        match pick-first-value (option dhcp-client-identifier, hardware);
}
subnet X.X.X.Y.0 netmask 255.255.255.0 {
        pool {
                option domain-name-servers X.X.X.X.1;

                range X.X.X.Y.100 X.X.X.Y.200;
        }

        option routers X.X.X.Y.1;
        option domain-name-servers X.X.X.X.1;
        ping-check true;

}
host s_opt1_0 {
        hardware ethernet 14:4f:8a:dc:13:ba;
        option dhcp-client-identifier "merox_lenovo_laptop";
        fixed-address X.X.X.Y.10;

}
subclass "s_opt1" 1:14:4f:8a:dc:13:ba;
subclass "s_opt1" "merox_lenovo_laptop";

subclass "s_opt1" 1:c4:c1:7d:a5:13:8e;
subclass "s_opt1" "iphone_merox";
```