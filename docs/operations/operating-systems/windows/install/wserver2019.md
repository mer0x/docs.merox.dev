## Quick Installation Guide for Windows Server 2019

1. Prepare Your Server:

    Check minimum hardware requirements: 1.4 GHz 64-bit CPU, 512 MB RAM (2 GB for Desktop Experience), 32 GB disk space.
    Have your Windows Server 2019 media ready (USB/DVD).

<div class="grid cards" markdown>
- <a href="https://www.microsoft.com/en-us/evalcenter/download-windows-server-2019">:simple-proxmox: __Windows Server 2019__ download ISO</a>
</div>
2. Install Windows Server 2019:

    Boot from the installation media.
    Select language, time, and keyboard, then click "Next" > "Install now".
    Enter your product key or select your edition.
    Accept the license terms.
    Choose “Custom: Install Windows only (advanced)” for a clean install.
    Select the disk where you want to install and follow prompts to complete installation.

3. Post-Installation Setup:

    Set a strong administrator password.
    Configure network settings (static IP recommended).
    Rename your server for easy identification.
    Activate Windows Server.
    Install necessary roles and features via Server Manager or PowerShell.
    Apply all critical Windows updates.

Best Practices After Installation

1. Security:

    Regularly update Windows Server.
    Enable Windows Defender or similar for malware protection.
    Configure Windows Firewall properly.

2. Performance and Maintenance:

    Install only necessary roles/features to reduce vulnerabilities.
    Set up regular backups to prevent data loss.
    Monitor server performance using built-in tools like Performance Monitor.

3. Remote Management:

    Enable Remote Desktop for easier management, but ensure it's secured properly.

4. Documentation:

    Keep a record of your server setup and configurations for troubleshooting and auditing purposes.

This streamlined guide covers the essentials to get your Windows Server 2019 up and running securely and efficiently. Regular maintenance and monitoring are key to a stable server environment.

## For virtualization in Proxmox

Install also virtio for hardware driver detection:

<div class="grid cards" markdown>
- <a href="https://pve.proxmox.com/wiki/Windows_VirtIO_Drivers">:simple-proxmox: __Proxmox__ docs for VirtIO Drivers</a>
- <a href="https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso">:octicons-download-16: __VirtIO Drivers__  Download</a>

</div>