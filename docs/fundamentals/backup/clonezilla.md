# Clonezilla: Backup Guide

## Overview

Clonezilla is a versatile tool for disk and partition imaging/cloning, perfect for backing up any disks. This guide covers how to use Clonezilla for backups using both NFS shares and local storage options, ensuring your data's safety and system's rapid recovery in various scenarios.For example, I use clonezilla to clone my Proxmox cluster installation disks.

## Pre-requisites

- Clonezilla Live on a bootable USB drive : [Downlaod link](https://clonezilla.org/downloads.php)
- Configured and accessible NFS server (for NFS share backups)
- Sufficient storage space on your backup destination

## Booting Clonezilla

1. Insert the Clonezilla Live USB into the system.
2. Reboot and select the USB drive as the boot device.
3. Follow the on-screen instructions to load Clonezilla.

## Backup using NFS Share

### Step 1: Select Backup Mode

- Choose "device-image" for disk or partition image backups.

### Step 2: Storage Selection

- Select "NFS server" to utilize an NFS share as your backup destination.

### Step 3: Configure NFS Share

- Input your NFS server's IP and the shared folder path for storing backups.

### Step 4: Select Source Disk

- Choose the disk within your Proxmox cluster to back up.

### Step 5: Start Backup

- Follow prompts to initiate the backup process to the NFS share.

## Backup to Local Storage

### Step 1: Backup Mode

- Opt for "device-image" for creating image backups.

### Step 2: Choose Storage

- Select "local_dev" for using local storage as the backup destination.

### Step 3: Connect Storage Device

- Ensure your external storage device is connected and recognized by Clonezilla.

### Step 4: Select Source Disk

- Identify and select the Proxmox cluster disk for backup.

### Step 5: Initiate Backup

- Proceed with on-screen instructions to begin backup to local storage.

## Restoring from Backup

1. Boot from the Clonezilla Live USB.
2. Follow similar steps to the backup process but choose "restore."
3. Select your backup image and follow the on-screen steps to complete restoration.

## Testing and Validation

Ensure to test your Proxmox cluster post-backup or restoration to validate functionality and data integrity.