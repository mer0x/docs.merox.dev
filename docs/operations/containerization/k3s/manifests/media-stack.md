# Deploying Media Stack on Kubernetes with Longhorn and NFS Storage
### Prerequisites
- A Kubernetes cluster
- kubectl configured for your cluster
- Longhorn installed on your Kubernetes cluster
- An NFS server configured and accessible
- Traefik Ingress controller installed in your Kubernetes cluster


### PV & PVC
``` yaml linenums="1"
apiVersion: v1
kind: PersistentVolume
metadata:
  name: qbitt-download
spec:
  capacity:
    storage: 400Gi
  accessModes:
    - ReadWriteOnce
  nfs:
    path: /volume1/Server/Data/alto/media_nas/qbittorrent/
    server: storage.merox.cloud
  persistentVolumeReclaimPolicy: Retain
  mountOptions:
    - hard
    - nfsvers=3
  storageClassName: ""
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: qbitt-download
  namespace: media
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 400Gi
  volumeName: qbitt-download
  storageClassName: ""
```
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
    server: storage.merox.cloud
  persistentVolumeReclaimPolicy: Retain
  mountOptions:
    - hard
    - nfsvers=3
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

### Jellyfin
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
``` yaml linenums="1"
---
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
    - match: Host(`www.jellyfin.merox.cloud`) # change to your domain
      kind: Rule
      services:
        - name: jellyfin
          port: 80
    - match: Host(`jellyfin.merox.cloud`) # change to your domain
      kind: Rule
      services:
        - name: jellyfin
          port: 80
      middlewares:
        - name: default-headers-jellyfin

```
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
### Sonarr

``` yaml linenums="1"
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: sonarr-config
  namespace: media
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: longhorn
  resources:
    requests:
      storage: 5Gi
```
``` yaml linenums="1"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sonarr
  namespace: media
spec:
  replicas: 1
  selector:
    matchLabels:
      app: sonarr
  template:
    metadata:
      labels:
        app: sonarr
    spec:
      containers:
      - name: sonarr
        image: linuxserver/sonarr
        env:
        - name: PUID
          value: "1057"
        - name: PGID
          value: "1056"
        volumeMounts:
        - name: config
          mountPath: /config
        - name: videos
          mountPath: /tv
        - name: downloads
          mountPath: /downloads
        ports:
        - containerPort: 8989
      volumes:
      - name: config
        persistentVolumeClaim:
          claimName: sonarr-config
      - name: videos
        persistentVolumeClaim:
          claimName: jellyfin-videos
      - name: downloads
        persistentVolumeClaim:
          claimName: qbitt-download  
```
``` yaml linenums="1"
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: sonarr
  namespace: media
  annotations:
    kubernetes.io/ingress.class: traefik-external
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`www.tv.merox.cloud`) # change to your domain
      kind: Rule
      services:
        - name: sonarr
          port: 80
    - match: Host(`tv.merox.cloud`) # change to your domain
      kind: Rule
      services:
        - name: sonarr
          port: 80
      middlewares:
        - name: default-headers-jellyfin
```
``` yaml linenums="1"
apiVersion: v1
kind: Service
metadata:
  name: sonarr
  namespace: media
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 8989
  selector:
    app: sonarr
```

### Radarr
``` yaml linenums="1"
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: radarr-config
  namespace: media
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: longhorn
  resources:
    requests:
      storage: 5Gi
```
``` yaml linenums="1"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: radarr
  namespace: media
spec:
  replicas: 1
  selector:
    matchLabels:
      app: radarr
  template:
    metadata:
      labels:
        app: radarr
    spec:
#      initContainers:
#      - name: set-perms
#        image: alpine
#        command: ['sh', '-c', 'chown -R 1057:1056 /movies']
      containers:
      - name: radarr
        image: linuxserver/radarr
        env:
        - name: PUID
          value: "1057"  
        - name: PGID
          value: "1056"  
        volumeMounts:
        - name: config
          mountPath: /config
        - name: videos
          mountPath: /movies
        - name: downloads
          mountPath: /downloads
        ports:
        - containerPort: 7878
      volumes:
      - name: config
        persistentVolumeClaim:
          claimName: radarr-config
      - name: videos
        persistentVolumeClaim:
          claimName: jellyfin-videos
      - name: downloads
        persistentVolumeClaim:
          claimName: qbitt-download  
``` yaml linenums="1"
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: radarr
  namespace: media
  annotations:
    kubernetes.io/ingress.class: traefik-external
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`movies.tv.merox.cloud`) # change to your domain
      kind: Rule
      services:
        - name: radarr
          port: 80
    - match: Host(`movies.merox.cloud`) # change to your domain
      kind: Rule
      services:
        - name: radarr
          port: 80
      middlewares:
        - name: default-headers-jellyfin

``` yaml linenums="1"
apiVersion: v1
kind: Service
metadata:
  name: radarr
  namespace: media
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 7878
  selector:
    app: radarr
```

### Jackett
``` yaml linenums="1"
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: jackett-config
  namespace: media
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: longhorn
  resources:
    requests:
      storage: 5Gi
```
``` yaml linenums="1"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jackett
  namespace: media
spec:
  replicas: 1
  selector:
    matchLabels:
      app: jackett
  template:
    metadata:
      labels:
        app: jackett
    spec:
      containers:
      - name: jackett
        image: linuxserver/jackett
        env:
        - name: PUID
          value: "1057"  # Ajustează această valoare conform nevoilor tale
        - name: PGID
          value: "1056"  # Ajustează această valoare conform nevoilor tale
        volumeMounts:
        - name: config
          mountPath: /config
        ports:
        - containerPort: 9117
      volumes:
      - name: config
        persistentVolumeClaim:
          claimName: jackett-config
```
``` yaml linenums="1"
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: jackett
  namespace: media
  annotations:
    kubernetes.io/ingress.class: traefik-external
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`www.jackett.merox.cloud`) # change to your domain
      kind: Rule
      services:
        - name: jackett
          port: 80
    - match: Host(`jackett.merox.cloud`) # change to your domain
      kind: Rule
      services:
        - name: jackett
          port: 80
      middlewares:
        - name: default-headers-jellyfin

```
``` yaml linenums="1"
apiVersion: v1
kind: Service
metadata:
  name: jackett
  namespace: media
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 9117
  selector:
    app: jackett

```
### qBittorrent
``` yaml linenums="1"
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: qbitt-config
  namespace: media
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: longhorn
  resources:
    requests:
      storage: 5Gi
```
``` yaml linenums="1"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: qbittorrent
  namespace: media
spec:
  replicas: 1
  selector:
    matchLabels:
      app: qbittorrent
  template:
    metadata:
      labels:
        app: qbittorrent
    spec:
      containers:
      - name: qbittorrent
        image: linuxserver/qbittorrent
        resources:
          limits:
            memory: "2Gi"
          requests:
            memory: "512Mi"
        env:
        - name: PUID
          value: "1057"  
        - name: PGID
          value: "1056" 
        volumeMounts:
        - name: config
          mountPath: /config
        - name: downloads
          mountPath: /downloads
        ports:
        - containerPort: 8080
      volumes:
      - name: config
        persistentVolumeClaim:
          claimName: qbitt-config
      - name: downloads
        persistentVolumeClaim:
          claimName: qbitt-download 
```
``` yaml linenums="1"
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: qbittorrent
  namespace: media
  annotations:
    kubernetes.io/ingress.class: traefik-external
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`www.qbitt.merox.cloud`) # change to your domain
      kind: Rule
      services:
        - name: qbittorrent
          port: 80
    - match: Host(`qbitt.merox.cloud`) # change to your domain
      kind: Rule
      services:
        - name: qbittorrent
          port: 80
      middlewares:
        - name: default-headers-jellyfin
```
``` yaml linenums="1"
apiVersion: v1
kind: Service
metadata:
  name: qbittorrent
  namespace: media
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 8080
  selector:
    app: qbittorrent
```


### Conclusion
This comprehensive guide walked you through deploying Jellyfin on a Kubernetes cluster, configuring Longhorn for configuration storage, setting up NFS for media storage, deploying Jellyfin, and exposing it externally using Traefik. 
With Jellyfin now deployed, you can enjoy your personal media server with robust and flexible storage solutions provided by Kubernetes
