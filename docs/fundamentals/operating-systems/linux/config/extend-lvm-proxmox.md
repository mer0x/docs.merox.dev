## Resizing/Extending Logical Volumes (LVM) in Proxmox
What is LVM?

LVM stands for Logical Volume Management. It is a system of managing logical volumes, or filesystems, that is much more advanced and flexible than the traditional method of partitioning a disk into one or more segments and formatting that partition with a filesystem. - https://wiki.ubuntu.com/Lvm

!!! warning
    Below are the steps I took when I replaced my Proxmox Backup Server 30GB SSD with a 400GB and cloned the installation from the old card to the new one. Do not attempt these steps without first having a backup as there is a high risk of data loss if the partition changes are unsuccessful

### Extending a LVM Volume
Log into the device using LVM, in this example I'll be extending the pbs-root and data volumes in Proxmox Backup Server
Run the following commands in terminal

``` yaml linenums="1"
# login as root if needed (not needed for proxmox)
sudo su
# list disks and partitions
fdisk -l
# list volume groups
vgdisplay
# list logical volumes
lvdisplay
# edit partitions with fdisk, change device id as needed
fdisk /dev/sda
# print the partition table
p
# delete a partition
d
# enter the lvm partition number
3
# create a new partition
n
# enter the new partition number, same as the number deleted
3
# press enter to accept the default first sector
# press enter to accept the default last sector
# when prompted about removing the LVM signature, enter N
n
# set the partition type
t
# enter the partition number
3
# set the type to Linux LVM
30
# write the changes
w
# list disks and partitions, noting the size increase
fdisk -l
# extend the existing physical volume
pvresize /dev/sda3
# extend the pbs-root logical volume to 100% available free space
lvresize -L +8GB /dev/pbs/root
# extend the underlying file system
resize2fs /dev/mapper/pbs-root
# list logical volumes, noting root is now 8GB larger
lvdisplay
# extend the data to 100% available free space
lvextend -l +100%FREE pbs/data
# list logical volumes, noting data is now over 35GB
lvdisplay
```