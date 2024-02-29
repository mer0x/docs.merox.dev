# Pentesting

## ParrotOS


Parrot Security provides a huge arsenal of tools, utilities and libraries that IT and security professionals can use to test and assess the security of their assets in a reliable, compliant and reproducible way. From information gathering to the final report. The Parrot system gets you covered with the most flexible environment.

Choose the Security Edition.

Website - https://www.parrotsec.org/
## Kali


Kali Linux is an open-source, Debian-based Linux distribution geared towards various information security tasks, such as Penetration Testing, Security Research, Computer Forensics and Reverse Engineering.

Choose either the Kali Linux VMware or VirtualBox image / default credentials "kali/kali".

Website - https://www.kali.org/
## Tools
### nmap

Command nmap -v -p- -sC -sV -oA <basename> 10.12.10.123
-v: Increase the verbosity level (use -vv or more for greater effect)
-p-: Port scan all ports
-sC: Scan with default NSE scripts. Considered useful for discovery and safe
-sV: Attempts to determine the version of the service running on port
-oA: Output in the three major formats at once in files
-Pn: Disable host discovery. Port scan only.

install with - apt -y install nmap
### netcat

netcat (often abbreviated to nc) is a computer networking utility for reading from and writing to network connections using TCP or UDP.

install with - apt -y install netcat
### Wappalyser

Find out the technology stack of any website. Create lists of websites that use certain technologies, with company and contact details.

Website - https://www.wappalyzer.com/
smbclient

### gobuster

Directory/File, DNS and VHost busting tool written in Go.

install with sudo apt install golang-go
install with go install github.com/OJ/gobuster/v3@latest

Github https://github.com/OJ/gobuster
### Ffuf!

A fast web fuzzer written in Go.

install with sudo apt install golang-go
install with go install github.com/ffuf/ffuf@latest

Github - https://github.com/ffuf/ffuf
### JohnTheRipper

John the Ripper jumbo - advanced offline password cracker, which supports hundreds of hash and cipher types, and runs on many operating systems, CPUs, GPUs, and even some FPGAs

John the Ripper step-by-step tutorials for end-users: https://openwall.info/wiki/john/tutorials

install with apt -y install john

Github - https://github.com/openwall/john/tree/bleeding-jumbo
### Responder

Responder is a LLMNR, NBT-NS and MDNS poisoner, with built-in HTTP/SMB/MSSQL/FTP/LDAP rogue authentication server supporting NTLMv1/NTLMv2/LMv2, Extended Security NTLMSSP and Basic HTTP authenticat…

Github - https://github.com/lgandx/Responder
### BurpSuite

Burp Suite est une application Java, développée par PortSwigger Ltd, qui peut être utilisée pour la sécurisation ou effectuer des tests de pénétration sur les applications web. La suite est composée de différents outils comme un serveur proxy (Burp Proxy), robot d’indexation (Burp Spider), un outil d'intrusion (Burp Intruder), un scanner de vulnérabilités (Burp Scanner) et un répéteur HTTP (Burp Repeater).

Command to encode a payload:

    BurpSuite tab to encode text => Decoder
    Use URL to encode the payload to send special characters in an HTTP request

Website - https://portswigger.net/burp/communitydownload
### ZAP - Zed Attack Proxy

Zed Attack Proxy (ZAP) is a free, open-source penetration testing tool being maintained under the umbrella of the Open Web Application Security Project (OWASP). ZAP is designed specifically for testing web applications and is both flexible and extensible.

At its core, ZAP is what is known as a “man-in-the-middle proxy.” It stands between the tester’s browser and the web application so that it can intercept and inspect messages sent between browser and web application, modify the contents if needed, and then forward those packets on to the destination. It can be used as a stand-alone application, and as a daemon process.

website - https://www.zaproxy.org/
### Impacket

Impacket is a collection of Python classes for working with network protocols. Impacket is focused on providing low-level programmatic access to the packets and for some protocols (e.g. SMB1-3 and MSRPC) the protocol implementation itself.

Grab the latest stable release (gzip’d tarbal), unpack it and run: python3 -m pip install . from the directory where you placed it.

Github - https://github.com/SecureAuthCorp/impacket
website - https://www.secureauth.com/labs/open-source-tools/impacket/
### Revshellgen

Standalone script written in Python 3 for generating reverse shells easily without typing. It automates the boring stuff like URL encoding the command and setting up a listener.

download git clone https://github.com/t0thkr1s/revshellgen

The script has 4 dependencies:
pyperclip
colorama
readchar
netifaces

You can install these by typing python3 setup.py install

Run python3 revshellgen.py

Github - https://github.com/t0thkr1s/revshellgen
### Evil-WinRM

The ultimate WinRM shell for hacking/pentesting

Github - https://github.com/Hackplayers/evil-winrm
### Watson

Watson is a .NET tool designed to enumerate missing KBs and suggest exploits for Privilege Escalation vulnerabilities.

Supported Versions
Windows 10 1507, 1511, 1607, 1703, 1709, 1803, 1809, 1903, 1909, 2004
Server 2016 & 2019

Github - https://github.com/rasta-mouse/Watson
## Webshells
### Blackarchs' Webshells

Various webshells: asp, aspx, cfm, jsp, perl, php

⚠ Usage Warning ⚠ - These webshells are not vetted by BlackArch team and may contain backdoors! Always read the source before using any webshells in this repository.

Github - https://github.com/BlackArch/webshells
