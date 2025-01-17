# How to Mount Synology NFS Share on Proxmox Backup Server

**Synology DSM**: 6.2.4-25556 Update 3, with BTRFS volume (required) [1.2.3.4]  
**Proxmox Backup Server**: 2.1-1 [1.2.3.5]

## On Synology

1. Create a Shared Folder named `xxxx` on a BTRFS Volume (in this case, volume1), and give the user `admin` Read/Write permission.
2. In the **NFS Permissions** tab, set:
   - **Privilege**: Read/Write
   - **Squash**: No mapping
   - **Security**: sys
   - **Enabled Async**: checked
   - **Allow Connections**: unchecked
   - **Allow Subfolders**: checked

## On PBS 

3. Create and mount `xxxx`:

    ```bash
    mkdir /mnt/xxxx
    mount 1.2.3.4:/volume1/xxxx /mnt/xxxx
    ```

4. Add a Datastore named `xxxx` using the **Backing path**: `/mnt/xxxx`
5. Open/Refresh the Datastore page (you should see **Error 13** on `xxxx`).
6. Unmount `xxxx`:

    ```bash
    umount /mnt/xxxx
    ```

## Back on Synology

7. Open Shared Folder `xxxx`, go to **NFS Permissions**, and change **Squash** to: Map all users to `admin`.
8. Browse to `xxxx` and delete the `.lock` file.

## Back on PBS

9. Remount `xxxx`:

    ```bash
    mount 1.2.3.4:/volume1/xxxx /mnt/xxxx
    ```

10. Open/Refresh the Datastore page (Error 13 should clear).
11. Perform a host backup on a Proxmox Node to verify (e.g., backup the `/etc` folder which is usually small). This assumes you've already connected the Node to PBS (add Cluster Storage PBS Server).

    ```bash
    proxmox-backup-client backup nodeABC-etc.pxar:/etc --repository 1.2.3.5:xxxx
    ```

## Restore to new PBS

1. On fresh new PBS, if you want to import existing NFS datastore, just go to /etc/proxmox-backup/ and create `datastore.cfg` file with the next content:
```bash
datastore: hyperbackup
   path /mnt/hyperbackup
```
2. Do the same steps with squash no mapping - umount - mapping all users to admin
3. Add PBS again in PVE and add encrypted key if is the case.

## Notes

@grantph:<br>
"I suspect this process highlights a bug in PBS datastore creation. It requires `backup` uid/gid 34:34 to create the `.chunks` folders but seems to prefer `root` after creation (for the UI and client backups). It wasn't necessary to create a `backup` user on Synology; that just led to uid/gid headaches."

### Special thanks

<div class="grid cards" markdown>
- <a href="https://forum.proxmox.com/members/grantph.148121/">:simple-proxmox: __@grantph__  Proxmox Forum User</a>
</div>
