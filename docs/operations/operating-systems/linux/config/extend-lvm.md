# Extending an LVM Volume on a Constantly Written Virtual Disk (vmdisk)

This guide explains how to safely extend an LVM volume that uses a virtual disk (vmdisk) without affecting existing data.

---

## 1. Extend the Virtual Disk in the Hypervisor
If not already done, extend the virtual disk size from your hypervisor (e.g., Proxmox, VMware, etc.).

---

## 2. Detect the Resized Disk
On the guest operating system, rescan the disk to detect the new size:

```bash
echo 1 > /sys/class/block/<device>/device/rescan
```

Then check the disk size:

```bash
lsblk
```

---

## 3. Resize the Partition
If the disk used by LVM has a partition that does not cover the newly allocated space, resize the partition. Follow these steps:

### Using `parted`:
1. Start `parted`:
    ```bash
    parted /dev/sda
    ```
2. View the current partitions:
    ```bash
    print
    ```
3. Resize the partition:
    ```bash
    resizepart <partition_number> 100%
    ```
    Example:
    ```bash
    resizepart 1 100%
    ```
4. Exit `parted`:
    ```bash
    quit
    ```

### Using `fdisk` (for MBR partitions):
1. Start `fdisk`:
    ```bash
    fdisk /dev/sda
    ```
2. Note the starting sector of the current partition (`Start`).
3. Delete the current partition (`d`) and recreate it (`n`) using the same starting sector. The new size will occupy all available space.
4. Save changes with:
    ```bash
    w
    ```

---

## 4. Resize the LVM Physical Volume
Update the LVM physical volume to reflect the new size:

```bash
pvresize /dev/sda1
```

---

## 5. Extend the Logical Volume
Extend the logical volume using the additional space:

- To add a specific size (e.g., 10GB):
    ```bash
    lvextend -L+10G /dev/<vg_name>/<lv_name>
    ```

- To use all the available free space:
    ```bash
    lvextend -l +100%FREE /dev/<vg_name>/<lv_name>
    ```

---

## 6. Extend the Filesystem
Resize the filesystem to use the newly extended space:

- For **ext4**:
    ```bash
    resize2fs /dev/<vg_name>/<lv_name>
    ```

- For **xfs**:
    ```bash
    xfs_growfs /dev/<vg_name>/<lv_name>
    ```

---

## 7. Final Verification
Ensure the resizing was successful:

```bash
lsblk
df -h
```

---

## Important Note
Extending an LVM volume with constant writes is safe if the steps are followed correctly. However, it is recommended to back up critical data before making any changes.
