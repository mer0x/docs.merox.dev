# Adding NFS Server as Storage Class on Kubernetes

This guide walks you through the process of adding a Network File System (NFS) server as a Storage Class in Kubernetes, enabling you to use NFS for persistent storage.

## Prerequisites

- An NFS server setup and configured.
- A Kubernetes cluster with administrative access.

## Step 1: Installing and Configuring the NFS Server

Ensure your NFS server is correctly set up and that the directory you wish to share is configured in the `/etc/exports` file on your NFS server.

## Step 2: Creating a Persistent Volume on Kubernetes

Create a Persistent Volume (PV) that references your NFS server and the path to the shared directory. Here is an example YAML configuration:

```yaml linenums="1"
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteMany
  nfs:
    server: nfs-server.your-domain.com
    path: "/var/nfs/general"
```
Replace nfs-server.your-domain.com with the IP or domain name of your NFS server and /var/nfs/general with the path to your shared directory.
Step 3: Creating a Storage Class for NFS

Since NFS does not support dynamic provisioning directly through Kubernetes without an external provisioner, you might need to use an external provisioner like NFS Subdir External Provisioner for dynamic storage provisioning.
Step 4: Creating a Persistent Volume Claim

Applications will use a Persistent Volume Claim (PVC) to request storage. Below is an example PVC configuration:

```yaml linenums="1"

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nfs-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 1Gi
  volumeName: nfs-pv
```
Step 5: Using the PVC in Kubernetes Pods

You can now reference the PVC in your pod definitions to mount the NFS volume. Here's how:

```yaml linenums="1"

apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
  - name: example-container
    image: nginx
    volumeMounts:
    - mountPath: "/usr/share/nginx/html"
      name: nfs-volume
  volumes:
  - name: nfs-volume
    persistentVolumeClaim:
      claimName: nfs-pvc
```
