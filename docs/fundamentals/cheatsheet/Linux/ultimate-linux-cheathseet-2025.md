# Linux Power User Complete Cheatsheet 2024

## System Operations & Monitoring
```bash
# System Information
uname -a                  # Full system info
hostnamectl              # Detailed host/OS info
lscpu                    # CPU details
free -h                  # Memory usage human readable
df -h                    # Disk usage human readable
uptime                   # System uptime and load
w                        # Who is logged in and what they're doing
last | head -n 10        # Last logged in users
dmesg | tail            # Kernel messages
cat /proc/cpuinfo       # CPU information
cat /proc/meminfo       # Memory information

# System Monitoring
top                     # Task manager
htop                    # Enhanced task manager
atop                    # Advanced system monitor
vmstat 1                # Virtual memory stats (every 1 sec)
mpstat -P ALL 1         # CPU usage per core
iostat -xz 1            # IO stats
sar -u 1 5              # CPU usage (1 sec intervals, 5 times)
sar -r 1 5              # Memory usage
sar -b 1 5              # IO usage
iotop                   # IO monitor
nethogs                 # Per-process network usage
iftop                   # Network usage monitor
perf top                # CPU performance monitor
strace -p PID           # Trace system calls
ltrace -p PID           # Trace library calls

# Process Management
ps aux                  # All processes
ps -ef | grep process   # Find specific process
pgrep process_name      # Get process ID
pkill process_name      # Kill process by name
kill -9 PID            # Force kill by PID
nice -n 19 command     # Run with low priority
renice 10 -p PID       # Change process priority
pstree                 # Process tree
pidof process_name     # Find PIDs of process
fuser -mv /path        # Show processes using path
```

## File System Operations
```bash
# Basic Operations
ls -lahR                # List all files recursively
cp -av source dest      # Copy with progress
mv -v source dest       # Move with verbose
rm -rf directory        # Remove directory forcefully
mkdir -p path/dir       # Create full directory path
ln -s target link      # Create symbolic link
readlink symlink       # Show where symlink points
tree -L 2              # Directory tree, 2 levels
du -sh *               # Directory sizes
ncdu                   # NCurses disk usage

# File Search & Text Processing
find / -name pattern   # Find files by name
find / -type f -size +100M # Find large files
find / -mtime +30     # Files not modified in 30 days
locate filename       # Quick file search (needs updatedb)
grep -r "pattern" /path # Recursive text search
awk '{print $1}' file  # Print first column
sed 's/old/new/g' file # Replace text
cut -d: -f1 /etc/passwd # Cut specific fields

# File Attributes & Permissions
chmod 755 file         # Change permissions
chmod -R g+w directory # Recursive group write
chown user:group file  # Change ownership
chattr +i file        # Make file immutable
lsattr file           # List special attributes
getfacl file          # Show ACL permissions
setfacl -m u:user:rwx file # Modify ACL

# Archive & Compression
tar -czf archive.tar.gz dir/  # Create gzip archive
tar -xzf archive.tar.gz       # Extract gzip archive
tar -cjf archive.tar.bz2 dir/ # Create bzip2 archive
tar -xjf archive.tar.bz2      # Extract bzip2 archive
zip -r archive.zip directory  # Create zip archive
unzip archive.zip            # Extract zip archive
gzip file                    # Compress file
gunzip file.gz              # Decompress file
```

## Network Operations
```bash
# Interface Management
ip addr                # Show IP addresses
ip link set dev eth0 up/down # Toggle interface
ip route show         # Show routing table
ss -tuln             # Show listening ports
ss -ta               # Show all TCP connections
netstat -tulpn       # Traditional port listing
nmcli dev status     # NetworkManager status
nmcli con show       # Show connections
iwconfig             # Wireless interface info
iw dev wlan0 scan    # Scan for wireless networks

# Network Testing & Monitoring
ping host            # Basic connectivity test
mtr host            # Traceroute and ping combined
traceroute host     # Show route to host
dig domain          # DNS query
nslookup domain     # Simple DNS query
whois domain        # Domain registration info
curl -IL url        # HTTP headers only
wget -c url         # Download with resume
tcpdump -i eth0     # Packet capture
nmap -p- host       # Port scan
iperf3 -s          # Network speed test (server)
iperf3 -c server   # Network speed test (client)
nethogs            # Per-process bandwidth
iftop              # Bandwidth monitoring by IP

# Network Configuration
ip addr add 192.168.1.100/24 dev eth0 # Add IP
ip route add default via 192.168.1.1   # Add route
iptables -L -n -v   # List firewall rules
ufw status         # UFW firewall status
hostnamectl set-hostname new-name # Change hostname
systemd-resolve --status # DNS resolver status
```

## Storage Management
```bash
# Disk Operations
fdisk -l            # List disk partitions
gdisk /dev/sda      # GPT partition editor
parted -l           # List partitions (alternative)
lsblk               # List block devices
blkid              # Show block device info
smartctl -a /dev/sda # Disk health info
hdparm -tT /dev/sda # Disk speed test

# LVM Management
pvs                 # List physical volumes
vgs                 # List volume groups
lvs                 # List logical volumes
pvcreate /dev/sdb   # Create physical volume
vgcreate vg0 /dev/sdb # Create volume group
lvcreate -L 10G vg0 # Create logical volume
lvextend -L +5G /dev/vg0/lv0 # Extend LV
resize2fs /dev/vg0/lv0 # Resize filesystem

# RAID Management
mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sd[bc]1 # Create RAID
mdadm --detail /dev/md0 # RAID details
mdadm --manage /dev/md0 --add /dev/sdd1 # Add disk to RAID
cat /proc/mdstat    # RAID status

# Filesystem Operations
mkfs.ext4 /dev/sda1 # Create ext4 filesystem
mkfs.xfs /dev/sda2  # Create XFS filesystem
mount /dev/sda1 /mnt # Mount filesystem
umount /mnt         # Unmount filesystem
fstrim -av          # TRIM SSD
xfs_repair /dev/sda2 # Repair XFS filesystem
e2fsck -f /dev/sda1 # Force ext4 filesystem check
```

## Process & Performance Tuning
```bash
# System Control
sysctl -a           # Show all kernel parameters
sysctl vm.swappiness=10 # Set kernel parameter
ulimit -n 65535    # Set file descriptor limit
nice -n 19 command # Run with low priority
ionice -c2 -n0 command # Set IO priority
chrt -f -p 99 PID  # Set real-time priority

# Performance Analysis
perf record -a -g  # Record system performance
perf report        # Show performance report
perf top          # Real-time perf analysis
sar -u 1 10       # CPU usage (10 samples)
sar -r 1 10       # Memory usage
sar -b 1 10       # IO usage
pidstat 1         # Per-process statistics
vmstat 1          # Virtual memory stats
dstat             # System resource stats

# Memory Management
free -h           # Show memory usage
swapon -s         # Show swap usage
swapoff -a        # Disable all swap
swapon -a         # Enable all swap
echo 3 > /proc/sys/vm/drop_caches # Clear cache
sync && echo 3 > /proc/sys/vm/drop_caches # Safer cache clear
```

## Security & Access Control
```bash
# User Management
useradd -m user    # Create user with home
usermod -aG group user # Add user to group
passwd user        # Set user password
chage -l user      # Password policy info
last              # Show last logins
who               # Show who is logged in
w                 # Show who is logged in and what they're doing

# File Permissions
chmod 750 file     # Change permissions
chown user:group file # Change ownership
umask 027         # Set default permissions
getfacl file      # Show ACL
setfacl -m u:user:rwx file # Set ACL

# Security Monitoring
fail2ban-client status # Show banned IPs
ausearch -k sudo_cmds # Search audit logs
aureport -au # Authentication report
lastlog      # Last login report
grep "Failed password" /var/log/auth.log # Failed logins

# Firewall Management
iptables -L -n -v # List rules
iptables -A INPUT -p tcp --dport 22 -j ACCEPT # Allow SSH
ufw allow 22/tcp  # UFW allow SSH
ufw status       # UFW status
firewall-cmd --list-all # firewalld rules
```

## System Maintenance
```bash
# Package Management
apt update && apt upgrade -y # Update (Debian/Ubuntu)
dnf update                  # Update (RHEL/CentOS)
apt-mark hold package       # Prevent package updates
apt-mark unhold package     # Allow package updates
dpkg -l | grep package     # List installed packages
rpm -qa | grep package     # List installed packages (RPM)
apt-cache policy package   # Show package info
dnf info package          # Show package info

# Service Management
systemctl status service  # Service status
systemctl start service  # Start service
systemctl enable service # Enable at boot
journalctl -u service   # Service logs
journalctl -f          # Follow system logs
journalctl --since "1 hour ago" # Recent logs

# Backup Operations
rsync -avz source/ dest/ # Sync directories
rsync -avz -e ssh source/ user@host:dest/ # Remote sync
dd if=/dev/sda of=disk.img bs=4M # Disk image
tar --exclude=/proc --exclude=/sys -czf backup.tar.gz / # System backup
```

## Virtualization & Containers
```bash
# Docker Operations
docker ps -a           # List all containers
docker images         # List images
docker exec -it container bash # Enter container
docker-compose up -d  # Start services
docker logs container # Container logs
docker stats         # Container resources

# KVM/QEMU Management
virsh list --all     # List all VMs
virsh start vm_name  # Start VM
virsh shutdown vm_name # Shutdown VM
virsh edit vm_name   # Edit VM config
virt-install --name=vm --ram=2048 # Create VM

# LXC/LXD Containers
lxc list            # List containers
lxc launch ubuntu:20.04 container # Create container
lxc exec container bash # Enter container
lxc stop container   # Stop container
lxc delete container # Delete container
```

## Troubleshooting Commands
```bash
# System Diagnosis
dmesg | tail        # Kernel messages
journalctl -xn 50   # Last 50 system log entries
top -b -n 1        # Process snapshot
ps auxf            # Process tree
lsof               # List open files
strace command     # Trace system calls
ltrace command     # Trace library calls

# Network Troubleshooting
ping host          # Basic connectivity
traceroute host    # Route tracing
mtr host          # Continuous traceroute
ss -tuln          # Open ports
netstat -i         # Interface statistics
tcpdump -i eth0    # Packet capture

# Disk & Filesystem
iostat -xz 1       # IO statistics
iotop              # IO monitoring
smartctl -H /dev/sda # Disk health
df -h              # Disk space usage
du -sh /* | sort -h # Directory sizes
lsof +D /path      # Files open in directory
```
