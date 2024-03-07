---
draft: false 
date: 2024-03-06 
categories:
  - kubernetes
  - installation
authors:
  - robertmelcher
comments: true
---

# Deploying a Kubernetes-Based Media Server: A Comprehensive Guide



<figure markdown="span">
  ![header-media](/images/content/media-header.png){ width="300" }
  <figcaption>MEDIA STACK K8S</figcaption>
</figure>

For a long time, I've been on the hunt for a comprehensive and well-crafted tutorial to deploy a media server on my Kubernetes cluster. This media server stack includes Jellyfin, Radarr, Sonarr, Jackett, and qBittorrent. Let's briefly dive into what each component brings to our setup

!!! example
    Jellyfin: An open-source media system that provides a way to manage and stream your media library across various devices.<br>
    Radarr: A movie collection manager for Usenet and BitTorrent users. It automates the process of searching for movies, downloading, and managing your movie library.<br>
    Sonarr: Similar to Radarr but for TV shows. It keeps track of your series, downloads new episodes, and manages your collection with ease.<br>
    Jackett: Acts as a proxy server, translating queries from other apps (like Sonarr or Radarr) into queries that can be understood by a wide array of torrent search engines.<br>
    qBittorrent: A powerful BitTorrent client that handles your downloads. Paired with Jackett, it streamlines finding and downloading media content.

<!-- more -->
The configuration for these applications is hosted on Longhorn storage, ensuring resilience and ease of management, while the media (movies, shows, books, etc.) is stored on a Synology NAS DS223. The NAS location is utilized as a Persistent Volume (PV) through NFS 4.1 by Kubernetes.

In this tutorial, you'll find the Kubernetes configuration for each necessary component to set up, install, and secure each service used by the media server.



Let's start step by step.

## 1.Configuring PVC and PV for NFS Share

1.1) Media
Create nfs-media-pv-and-pvc.yaml:

```yaml linenums="1"
Copy code
apiVersion: v1
kind: PersistentVolume
metadata:
  name: jellyfin-videos
# Persistent Volume spec including capacity, access modes, NFS path, and server details follow
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: jellyfin-videos
  namespace: media
# Persistent Volume Claim spec including access modes, resources requests, and storage class name follow
```
Apply with:

```bash linenums="1"
kubectl apply -f nfs-media-pv-and-pvc.yaml
```

1.2) Download
Create nfs-download-pv-and-pvc.yaml:

```yaml linenums="1"
apiVersion: v1
kind: PersistentVolume
metadata:
  name: qbitt-download
# Persistent Volume spec including capacity, access modes, NFS path, and server details follow
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: qbitt-download
  namespace: media
# Persistent Volume Claim spec including access modes, resources requests, and storage class name follow
```

Apply with:
```bash linenums="1"
kubectl apply -f nfs-download-pv-and-pvc.yaml
```

## 2.Configuring Longhorn PVC for Each Application
Create app-config-pvc.yaml:

```yaml linenums="1"
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app # For example, radarr
  namespace: media
# Persistent Volume Claim spec including access modes, storage class name, and resources requests follow
```
Apply with:
```bash linenums="1"
kubectl apply -f app-config-pvc.yaml
```
!!! warning
    This type of configuration needs to be generated for each application: Jellyfin, Sonarr, Radarr, Jackett, qBittorrent.


## 3.Deploying each application

3.1) Jellyfin:
Jellyfin serves as our media streaming platform, providing access to movies, TV shows, and other media across various devices. Here's how to deploy it

Create specific yaml for each file, for example:
radarr-deployment.yaml 
Apply with
```bash linenums="1"
kubectl apply -f radarr-deployment.yaml
```

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


3.2) Sonarr:
Sonarr automates TV show downloads, managing our series collection efficiently.

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

3.3) Radarr:
Radarr works like Sonarr but focuses on movies, keeping our film library organized and up-to-date.

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
```
3.4) Jackett:
Jackett acts as a bridge between torrent search engines and our media management tools, enhancing their capabilities.
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
          value: "1057" 
        - name: PGID
          value: "1056" 
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
3.5) qbittorrent
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

## 4.Creating ClusterIP Services
For our media server applications to communicate efficiently within the Kubernetes cluster without exposing them directly to the external network, we utilize ClusterIP services.

4.1)
To set this up, we create a app-service.yaml for each application (taking Radarr as an example here):

create app-service.yaml
```yaml linenums="1"
apiVersion: v1
kind: Service
metadata:
  name: app #radarr for example 
  namespace: media
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 7878
  selector:
    app: app #radarr for example 
```
```bash linenums="1"
kubectl apply -f app-service.yaml
```


## 5.Creating middleware for Traefik in the media namespace

For enhanced security and to ensure smooth functioning with Traefik, we define middleware:

- The middleware, named `default-headers-media`, is configured in the `media` namespace.
- It sets various security headers, including XSS protection and options to prevent MIME sniffing, among others.

Create default-headers-media.yaml

``` yaml linenums="1"

apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: default-headers-media
  namespace: media
spec:
  headers:
    browserXssFilter: true
    contentTypeNosniff: true
    forceSTSHeader: true
    stsIncludeSubdomains: true
    stsPreload: true
    stsSeconds: 15552000
    customFrameOptionsValue: SAMEORIGIN
    customRequestHeaders:
      X-Forwarded-Proto: https
```

Apply with:
```bash linenums="1"
kubectl apply -f default-headers-media.yaml
```

## 6.Creating Ingress Route for Each Application

To expose each application securely, we create IngressRoutes using Traefik:

- An IngressRoute for the application (such as Radarr) is defined, which uses the `traefik-external` ingress class.
- It listens on the `websecure` entry point and routes traffic based on the host (`movies.merox.cloud` in this example, replace with your domain).
- The middleware `default-headers-media` is applied to enhance security.
- TLS configuration is included, referencing a secret that contains the SSL/TLS certificate.

Create app-ingress-route.yaml

``` yaml linenums="1"
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: app #radarr for example 
  namespace: media
  annotations:
    kubernetes.io/ingress.class: traefik-external
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`movies.merox.cloud`) # change to your domain
      kind: Rule
      services:
        - name: app #radarr for example 
          port: 80
    - match: Host(`movies.merox.cloud`) # change to your domain
      kind: Rule
      services:
        - name: app #radarr for example 
          port: 80
      middlewares:
        - name: default-headers-media
  tls:
    secretName: mycert-tls # change to your cert name
```

Apply with:
```bash linenums="1"
kubectl apply -f app-ingress-route.yaml
```

!!! danger
    **Don't forget**: You must create the host declared in your IngressRoute in your DNS server(s).
## Q&A 

!!! question
    Q: Why use a ClusterIP service?
!!! note "Answer"
    A: Because we will be using Traefik as an ingress controller to expose it to the local network/internet with SSL/TLS certificates.

This concludes the necessary steps and configurations to deploy a resilient media server in a Kubernetes cluster successfully. For more technical details or configurations that could assist, refer to the Operations -> K3S section on my website.

Quick link: [Operations->K3S](https://merox.dev/operations/containerization/k3s/manifests/media-stack/)