# Pentesting Tools Overview

Welcome to the comprehensive guide on essential pentesting tools and resources, meticulously curated for security professionals and enthusiasts exploring the realm of penetration testing.

## ParrotOS

**Parrot Security** offers an extensive collection of tools, utilities, and libraries for IT and security professionals to assess their assets' security comprehensively. From information gathering to generating final reports, Parrot ensures a flexible environment for reliable, compliant, and reproducible testing.

- **Edition**: Choose the Security Edition for optimal features.
- **Website**: [Parrot Security](https://www.parrotsec.org/)

## Kali Linux

**Kali Linux** is a Debian-based distribution tailored for various information security tasks, including Penetration Testing, Security Research, Computer Forensics, and Reverse Engineering.

- **Installation**: Opt for the Kali Linux VMware or VirtualBox image. Default credentials are "kali/kali".
- **Website**: [Kali Linux](https://www.kali.org/)

## Essential Tools for Pentesting

### nmap

A versatile tool for network discovery and security auditing. Useful for scanning large networks or single hosts.

- **Install**: `apt -y install nmap`
- **Command**: `nmap -v -p- -sC -sV -oA <basename> 10.12.10.123`

### netcat

Often abbreviated to nc, netcat is a networking utility for reading from and writing to network connections using TCP or UDP.

- **Install**: `apt -y install netcat`

### Wappalyzer

Discover the technology stack of any website. Useful for reconnaissance.

- **Website**: [Wappalyzer](https://www.wappalyzer.com/)

### gobuster

A tool written in Go for brute-forcing URIs (directories and files) in web sites, DNS subdomains, and Virtual Host names.

- **Install**:
  - `sudo apt install golang-go`
  - `go install github.com/OJ/gobuster/v3@latest`
- **GitHub**: [gobuster](https://github.com/OJ/gobuster)

### Ffuf (Fuzz Faster U Fool)

A fast web fuzzer written in Go, ideal for web penetration testing.

- **Install**:
  - `sudo apt install golang-go`
  - `go install github.com/ffuf/ffuf@latest`
- **GitHub**: [ffuf](https://github.com/ffuf/ffuf)

### JohnTheRipper

An advanced offline password cracker supporting numerous hash and cipher types.

- **Install**: `apt -y install john`
- **Tutorials**: [John the Ripper Tutorials](https://openwall.info/wiki/john/tutorials)
- **GitHub**: [JohnTheRipper](https://github.com/openwall/john/tree/bleeding-jumbo)

### Responder

A tool for poisoning LLMNR, NBT-NS, and MDNS, with a built-in rogue authentication server.

- **GitHub**: [Responder](https://github.com/lgandx/Responder)

### Burp Suite

A Java application for web application security testing, including tools like a proxy server, web spider, intruder, and scanner.

- **Website**: [Burp Suite Community Edition](https://portswigger.net/burp/communitydownload)

### ZAP - Zed Attack Proxy

An OWASP-maintained tool for penetration testing web applications, acting as a man-in-the-middle proxy.

- **Website**: [ZAP](https://www.zaproxy.org/)

### Impacket

Python classes for working with network protocols, providing low-level access to packets and protocol implementations.

- **Install**: `python3 -m pip install .`
- **GitHub**: [Impacket](https://github.com/SecureAuthCorp/impacket)
- **Website**: [Impacket by SecureAuth](https://www.secureauth.com/labs/open-source-tools/impacket/)

### Revshellgen

Generates reverse shells easily, automating common setup tasks.

- **Download**: `git clone https://github.com/t0thkr1s/revshellgen`
- **Run**: `python3 revshellgen.py`
- **GitHub**: [Revshellgen](https://github.com/t0thkr1s/revshellgen)

### Evil-WinRM

The ultimate WinRM shell for hacking/pentesting Windows environments.

- **GitHub**: [Evil-WinRM](https://github.com/Hackplayers/evil-winrm)

### Watson

Enumerates missing KBs and suggests exploits for Privilege Escalation vulnerabilities.

- **Supported Versions**: Windows 10, Server 2016 & 2019
- **GitHub**: [Watson](https://github.com/rasta-mouse/Watson)

## Webshells

### Blackarch's Webshells

A collection of various webshells for ASP, ASPX, CFM, JSP, Perl, PHP.

- **Usage Warning**: Review the source code for safety before use.
- **GitHub**: [BlackArch Webshells](https://github.com/BlackArch/webshells)

Dive deeper into each tool and harness their power effectively for your pentesting needs.
