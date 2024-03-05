# Deploying Jellyfin on Kubernetes with Longhorn and NFS Storage
### Prerequisites
- A Kubernetes cluster
- kubectl configured for your cluster
- Longhorn installed on your Kubernetes cluster
- An NFS server configured and accessible
- Traefik Ingress controller installed in your Kubernetes cluster

## 1. Setting Up Storage
Configuring Longhorn for Jellyfin Configuration
File: jellyfin-longhorn-pvc.yaml

``` yaml linenums="1"

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: jellyfin-config
  namespace: media
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: longhorn
  resources:
    requests:
      storage: 10Gi
```
Apply with:
kubectl apply -f jellyfin-longhorn-pvc.yaml

## 2.Configuring NFS for Media Storage
File: nfs-media-pvc-pv.yaml

``` yaml linenums="1"
apiVersion: v1
kind: PersistentVolume
metadata:
  name: jellyfin-videos
spec:
  capacity:
    storage: 400Gi
  accessModes:
    - ReadWriteOnce
  nfs:
    path: /volume1/Server/Data/alto/media_nas
    server: 10.57.57.201
  persistentVolumeReclaimPolicy: Retain
  mountOptions:
    - hard
    - nfsvers=4.1
  storageClassName: ""
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: jellyfin-videos
  namespace: media
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 400Gi
  volumeName: jellyfin-videos
  storageClassName: ""
```

Apply with:
kubectl apply -f nfs-media-pvc-pv.yaml

## 3. Deploying Jellyfin
Deploy Jellyfin to utilize the configured storage.

File: jellyfin-deployment.yaml

``` yaml linenums="1"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jellyfin
  namespace: media
spec:
  replicas: 1
  selector:
    matchLabels:
      app: jellyfin
  template:
    metadata:
      labels:
        app: jellyfin
    spec:
      containers:
      - name: jellyfin
        image: jellyfin/jellyfin
        volumeMounts:
        - name: config
          mountPath: /config
        - name: videos
          mountPath: /data/videos
        ports:
        - containerPort: 8096
      volumes:
      - name: config
        persistentVolumeClaim:
          claimName: jellyfin-config
      - name: videos
        persistentVolumeClaim:
          claimName: jellyfin-videos
```
Apply with:
kubectl apply -f jellyfin-deployment.yaml

## 4.Creating a Service for Jellyfin
File: jellyfin-service.yaml

``` yaml linenums="1"
apiVersion: v1
kind: Service
metadata:
  name: jellyfin
  namespace: media
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 8096
  selector:
    app: jellyfin
```

Apply with:
kubectl apply -f jellyfin-service.yaml

## 5. Exposing Jellyfin Externally
File: ingress.yaml

``` yaml linenums="1"
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: jellyfin
  namespace: media
  annotations:
    kubernetes.io/ingress.class: traefik-external
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`www.jellyfin.merox.cloud`) # Change to your domain
      kind: Rule
      services:
        - name: jellyfin
          port: 80
    - match: Host(`jellyfin.merox.cloud`) # Change to your domain
      kind: Rule
      services:
        - name: jellyfin
          port: 80
      middlewares:
        - name: default-headers-jellyfin
```
Apply with:
kubectl apply -f ingress.yaml

### Conclusion
This comprehensive guide walked you through deploying Jellyfin on a Kubernetes cluster, configuring Longhorn for configuration storage, setting up NFS for media storage, deploying Jellyfin, and exposing it externally using Traefik. 
With Jellyfin now deployed, you can enjoy your personal media server with robust and flexible storage solutions provided by Kubernetes
