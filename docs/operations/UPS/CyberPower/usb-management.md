
# Troubleshooting USB CyberPower PowerPanel Issues on Linux

### 1. Check UPS Connection
Verify if the UPS is recognized as a USB device:
```bash
dmesg | grep -i usb
```

### 2. Review `pwrstatd` Logs
Check for any errors in the `pwrstatd` log:
```bash
cat /var/log/pwrstatd.log
```

### 3. Verify Daemon Connections
Use `lsof` to confirm `pwrstatd` connections:
```bash
sudo lsof -p $(pgrep pwrstatd)
```
Ensure `pwrstatd` is communicating with the `hiddev` device rather than `ttyS` or `ttyUSB`.

### 4. Configure `pwrstatd.conf` File
Update the `/etc/pwrstatd.conf` file to use the correct device:
```conf
allowed-device-nodes = /dev/hiddev0
```

### 5. Restart `pwrstatd` Service
Restart the service to apply changes:
```bash
sudo systemctl restart pwrstatd
```

---

Credit: [major.io](https://major.io/p/troubleshooting-cyberpower-powerpanel-issues-in-linux/)
