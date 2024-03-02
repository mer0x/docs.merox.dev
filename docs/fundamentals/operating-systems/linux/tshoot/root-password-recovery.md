Resetting a Linux password can be crucial if you've forgotten it or need to access a system without the current user's credentials. There are two primary methods to accomplish this: through the GRUB bootloader or using a Live CD/USB. Here's a comprehensive guide on how to execute both procedures, ensuring you can regain access to your Linux system.
## Via GRUB Bootloader

The GRUB (Grand Unified Bootloader) provides a way to regain access by booting into a special mode where you can reset a user's password.

 1. Access GRUB Menu: Start or restart your computer. Immediately press the Shift (or Esc in some cases) key to open the GRUB menu.

 2. Edit Boot Parameters: Navigate to the default boot entry using the arrow keys and press 'E' to edit it.
    ![](/images/content/password-recovery.png)
 3. Boot into Single-User Mode: Look for the line beginning with linux or linux16. Change ro quiet to rw and append single or init=/bin/bash. Confirm and boot with these parameters by pressing Ctrl + X or F10.

 4. Enable Write Permissions: To modify the password, the filesystem must be writable. Execute mount -n -o remount,rw /.

 5. Change the Password: Use passwd <username>, substituting <username> with the actual user's name. Follow the prompts to set a new password.

 6. Reboot the System: Ensure changes are written and reboot with sync followed by reboot -f.

## sing a Live CD/USB

If the GRUB method is not an option, a Live CD/USB provides an alternative approach.

 1. Boot from Live Media: Insert the Live CD/USB and select it as the boot device during startup.

 2. Access a Terminal: In the live environment, open a terminal window.

 3. Locate the Root Partition: Use sudo fdisk -l or sudo lsblk -f to find the partition that contains the Linux system.

 4. Mount the Root Partition: Create a directory for mounting, e.g., sudo mkdir /mnt/myroot, and mount the partition (sudo mount /dev/sdXY /mnt/myroot).

 5. Change Root Directory: Enter into your system's environment with sudo chroot /mnt/myroot.

 6. Reset User Password: Use passwd <username>, replacing <username> with the name of the user or root to change the root password.

 7. Cleanup: Exit the chroot environment with exit and unmount the partition with sudo umount /mnt/myroot.

 8. Restart: Remove the Live media and reboot. You should now be able to log in with the new password.

By following these detailed steps, you can reset a Linux user's password using either the GRUB method for quick fixes or the Live CD/USB method for more complex situations or when GRUB access is restricted. Both approaches are effective for regaining access to your Linux system.