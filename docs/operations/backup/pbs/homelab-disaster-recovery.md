# Homelab Disaster Recovery Guide

## Infrastructure Overview

### Components
- Synology DS223 (2x2TB RAID1)
- Proxmox Backup Server (PBS) with 4x Intel D3-S4510 in RAIDz2
- Hetzner VPS with attached StorageBox
- Local KeyPass on iOS/MacOS containing encryption keys

### Backup Flow & Schedule
1. VM/LXC backups to PBS: Every Saturday at 02:00
2. PBS to Synology rsync: Every Saturday at 06:00
3. Synology to Hetzner StorageBox rsync: Every Saturday at 08:00

## Critical Scripts and Configurations

### PBS to Synology Rsync (On PBS Server)
```bash
0 6 * * 6 rsync -av --delete --progress /mnt/datastore/ /mnt/hyperbackup/ >> /var/log/rsync_backup.log 2>&1
```

### VPS Backup Script (backup-pbs.sh)
```bash
#!/bin/bash

# 1) Export token secret as "PBS_PASSWORD"
export PBS_PASSWORD='token-secret-from-PBS'

# 2) Define user@pbs + token
export PBS_USER_STRING='token-id-from-PBS'

# 3) PBS IP/hostname
export PBS_SERVER='PBS-IP'

# 4) Datastore name
export PBS_DATASTORE='DATASTORE_PBS'

# 5) Build complete repository
export PBS_REPOSITORY="${PBS_USER_STRING}@${PBS_SERVER}:${PBS_DATASTORE}"

# 6) Get local server shortname
export PBS_HOSTNAME="$(hostname -s)"

# 7) ENCRYPTION KEY
export PBS_KEYFILE='/root/pbscloud_key.json'

echo "Run pbs backup for $PBS_HOSTNAME ..."

proxmox-backup-client backup \
  srv.pxar:/srv \
  volumes.pxar:/var/lib/docker/volumes \
  netw.pxar:/var/lib/docker/network \
  etc.pxar:/etc \
  scripts.pxar:/usr/local/bin \
  --keyfile /root/pbscloud_key.json \
  --skip-lost-and-found \
  --repository "$PBS_REPOSITORY"

# List existing backups
proxmox-backup-client list --repository "${PBS_REPOSITORY}"

echo "Done."
```

### VPS Restore Script (backup-pbs-restore.sh)
```bash
#!/bin/bash

# Global configs
export PBS_PASSWORD='token-secret-from-PBS'
export PBS_USER_STRING='token-id-from-PBS'
export PBS_SERVER='PBS_IP'
export PBS_DATASTORE='DATASTORE_FROM_PBS'
export PBS_KEYFILE='/root/pbscloud_key.json'
export PBS_REPOSITORY="${PBS_USER_STRING}@${PBS_SERVER}:${PBS_DATASTORE}"

# Input parameters
SNAPSHOT_PATH="$1"
ARCHIVE_NAME="$2"
RESTORE_DEST="$3"

# Parameter validation
if [[ -z "$SNAPSHOT_PATH" || -z "$ARCHIVE_NAME" || -z "$RESTORE_DEST" ]]; then
  echo "Usage: $0 <snapshot_path> <archive_name> <destination>"
  echo "Example: $0 \"host/cloud/2025-01-22T15:19:17Z\" srv.pxar /root/restore-srv"
  exit 1
fi

# Create destination if needed
mkdir -p "$RESTORE_DEST"

# Summary display
echo "=== PBS Restore ==="
echo "Snapshot:      $SNAPSHOT_PATH"
echo "Archive:       $ARCHIVE_NAME"
echo "Destination:   $RESTORE_DEST"
echo "Repository:    $PBS_REPOSITORY"
echo "Encryption key $PBS_KEYFILE"
echo "====================="

# Run restore
proxmox-backup-client restore \
  "$SNAPSHOT_PATH" \
  "$ARCHIVE_NAME" \
  "$RESTORE_DEST" \
  --repository "$PBS_REPOSITORY" \
  --keyfile "$PBS_KEYFILE"

EXIT_CODE=$?

if [[ $EXIT_CODE -eq 0 ]]; then
  echo "=== Restore completed successfully! ==="
else
  echo "Restore error (code $EXIT_CODE)."
fi

exit $EXIT_CODE
```

## Recovery Scenarios

### 1. Synology NAS Failure
- Data remains safe in two locations:
  1. PBS (4x Intel D3-S4510 in RAIDz2)
  2. Hetzner StorageBox
- Recovery steps:
  1. Replace failed hardware
  2. Reconfigure RAID1
  3. Restore HyperBackup schedule (Saturday 08:00)
  4. Verify first backup cycle completion

### 2. Hetzner VPS/StorageBox Failure
1. Provision new VPS
2. Install proxmox-backup-client:
   - Ubuntu: Follow [official guide](https://forum.proxmox.com/threads/install-the-backup-client-on-ubuntu-desktop-24-04.146065/)
   - Debian: Standard package installation
3. Create `/root/pbscloud_key.json`:
   - Get encryption key from KeyPass (iOS/MacOS)
4. Deploy backup scripts:
   - `backup-pbs.sh`
   - `backup-pbs-restore.sh`
5. Test backup and restore functionality

### 3. PBS Server Failure
1. Get new PBS ISO
2. Configure storage:
```bash
# /etc/proxmox-backup/datastore.cfg
datastore: raidz2
        comment
        gc-schedule sat 03:30
        notification-mode notification-system
        path /mnt/datastore
```
3. Check /etc/fstab
```bash
#raidz2
/dev/sdb /mnt/datastore ext4 defaults 0 2
```
/dev/sdb is <RAIDz2>

4. Required datastore structure:
   - `.chunks`
   - `vm`
   - `.gc-status`
   - `ct`
   - `host`

5. Data can be restored from:
   - RAIDz2 array (if drives are intact)
   - Hetzner StorageBox (/mnt/storagebox/Storage_1)
   - Synology NAS (/volume1/Backup/Proxmox/hyperbackup)
   And need to added in '/mnt/datastore'

6. Import VM/LXC encryption key from KeyPass in PVE.

## Critical Keys & Files
- Encryption keys in KeyPass (iOS/MacOS):
  - `/root/pbscloud_key.json`
  - PBS VM/LXC encryption key
- PBS Config: `/etc/proxmox-backup/datastore.cfg`
- Backup locations:
  1. PBS: `/mnt/datastore`
  2. Synology: `/volume1/Backup/Proxmox/hyperbackup`
  3. Hetzner: `/mnt/storagebox/Storage_1`

## Recommended Improvements
1. Regular backup verification
2. Automated testing of restore procedures
3. Monitoring for backup completion
4. Alert system for backup failures
5. Regular testing of KeyPass accessibility
