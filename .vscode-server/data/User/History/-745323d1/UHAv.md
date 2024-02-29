# Kubernetes

Kubernetes, also known as K8s, is an open-source system for automating deployment, scaling, and management of containerized applications.

## Overview


!!! info
    My cluster is designed with a focus on reliability and performance:<br>
    3 master nodes ensure high availability and cluster management, marked with node-role.kubernetes.i.o/master=true:NoSchedule.
    3 worker nodes, tagged with longhorn=true worker=true, handle the workload and storage, optimizing the environment for distributed applications.


```bash
merox@k3s-admin:~$ kubectl get nodes -o wide
NAME            STATUS   ROLES                       AGE   VERSION          OS-IMAGE             KERNEL-VERSION    CONTAINER-RUNTIME
k3s-01          Ready    <none>                      14d   v1.29.1+k3s2     Ubuntu 22.04.3 LTS   5.15.0-1049-kvm   containerd://1.7.11-k3s2
k3s-02          Ready    <none>                      14d   v1.29.1+k3s2     Ubuntu 22.04.3 LTS   5.15.0-1049-kvm   containerd://1.7.11-k3s2
k3s-03          Ready    <none>                      14d   v1.29.1+k3s2     Ubuntu 22.04.3 LTS   5.15.0-1049-kvm   containerd://1.7.11-k3s2
k3s-master-01   Ready    control-plane,etcd,master   14d   v1.29.1+k3s2     Ubuntu 22.04.3 LTS   6.5.11-7-pve      containerd://1.7.11-k3s2
k3s-master-02   Ready    control-plane,etcd,master   14d   v1.29.1+k3s2     Ubuntu 22.04.3 LTS   6.5.11-7-pve      containerd://1.7.11-k3s2
k3s-master-03   Ready    control-plane,etcd,master   14d   v1.29.1+k3s2     Ubuntu 22.04.3 LTS   6.5.11-7-pve      containerd://1.7.11-k3s2
```



### Advanced Tooling for an Optimized Experience

Leveraging cutting-edge tools enhances my cluster's capabilities:

-    **MetalLB** and **KubeVIP** offer reliable load balancing.
-    **Longhorn** provides resilient and scalable storage.
-    **Rancher** simplifies cluster management with its intuitive UI.
-    **Traefik** serves as the ingress controller, directing traffic efficiently.
-    **Kube-Prometheus** and **Loki** deliver comprehensive monitoring and logging.
-    **ArgoCD**, integrated with GitHub, automates deployment, keeping my cluster in sync with the latest configurations and applications.



!!!success
How to deploy your own K3S cluster in no time:
[K3S-deploy.sh](/resources/containerization/2.kubernetes/)
!!!



## Traefik

### values.yaml
```yaml

globalArguments:
  - "--global.sendanonymoususage=false"
  - "--global.checknewversion=false"

additionalArguments:
  - "--serversTransport.insecureSkipVerify=true"
  - "--log.level=INFO"

deployment:
  enabled: true
  replicas: 3 # match with number of workers
  annotations: {}
  podAnnotations: {}
  additionalContainers: []
  initContainers: []

nodeSelector:
  worker: "true" # add these labels to your worker nodes before running

ports:
  web:
    redirectTo:
      port: websecure
      priority: 10
  websecure:
    tls:
      enabled: true

ingressRoute:
  dashboard:
    enabled: false

providers:
  kubernetesCRD:
    enabled: true
    ingressClass: traefik-external
    allowExternalNameServices: true
  kubernetesIngress:
    enabled: true
    allowExternalNameServices: true
    publishedService:
      enabled: false

rbac:
  enabled: true

service:
  enabled: true
  type: LoadBalancer
  annotations: {}
  labels: {}
  spec:
    loadBalancerIP: X.X.X.100 # this should be an IP in the Kube-VIP range
  loadBalancerSourceRanges: []
  externalIPs: []
```
### middleware.yaml
```yaml
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: default-headers
  namespace: traefik
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
## Traefik Dashboard

### traefik_ingress.yaml
```yaml
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: traefik-dashboard
  namespace: traefik
  annotations:
    kubernetes.io/ingress.class: traefik-external
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`traefik.merox.cloud`)
      kind: Rule
      middlewares:
        - name: traefik-dashboard-basicauth
          namespace: traefik
      services:
        - name: api@internal
          kind: TraefikService
  tls:
    secretName: X-tls
```
### secret-dashboard.yaml

```yaml


---
apiVersion: v1
kind: Secret
metadata:
  name: traefik-dashboard-auth
  namespace: traefik
type: Opaque
data:
  users: 2YW3sSRtaW4nOIfbenjenwfewipo732tdSadUuRU0wRzZSLg==

  ```

### middleware.yaml
```yaml
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: traefik-dashboard-basicauth
  namespace: traefik
spec:
  basicAuth:
    secret: traefik-dashboard-auth
```
## IngressRoute


> Below, I will provide some YAML examples of how to expose both internal and external Kubernetes services through Traefik.
{.is-info}

### robertmelcherro_wordpress_ingress.yaml
```yaml
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: wordpress-robertmelcher
  namespace: external-websites
  annotations:
    kubernetes.io/ingress.class: traefik-external
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`www.robertmelcher.ro`) || Host(`robertmelcher.ro`)
      kind: Rule
      services:
        - name: wordpress
          port: 80
  tls:
    secretName: X-tls
```
### External service

#### service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: synology
  namespace: external-websites
spec:
  externalName: X.X.X.X
  type: ExternalName
  ports:
  - name: websecure
    port: 10003
    targetPort: 10003
```

#### synology_ingress.yaml

```yaml
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: synology
  namespace: external-websites
  annotations:
    kubernetes.io/ingress.class: traefik-external
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`www.sv1.merox.cloud`)
      kind: Rule
      services:
        - name: synology
          port: 10003
          scheme: https
          passHostHeader: true
    - match: Host(`sv1.merox.cloud`)
      kind: Rule
      services:
        - name: synology
          port: 10003
          scheme: https
          passHostHeader: true
      middlewares:
        - name: default-headers
  tls:
    secretName: X-tls
```

## Cert-Manager

### Production/merox-production.yaml
```bash
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: merox.cloud # change to your domain
  namespace: traefik # add to traefik namespace so it can use it (you DO NOT need it in each app namespace!!!)
spec:
  secretName: X-tls # change to your secretname
  issuerRef:
    name: letsencrypt-production
    kind: ClusterIssuer
  commonName: "*.merox.cloud" # change to your domain
  dnsNames:
  - "*.merox.cloud" # change to your domain
  - merox.cloud # change to your domain
  - "*.robertmelcher.ro" # adauga al doilea domeniu
  - robertmelcher.ro # adauga al doilea domeniu
```
### Issuers/secret-cf-token.yaml

```bash
apiVersion: v1
kind: Secret
metadata:
  name: cloudflare-token-secret
  namespace: cert-manager
type: Opaque
stringData:
  cloudflare-token: ZzZZzZZzZzzZzZzZZwZ0 #  https://cert-manager.io/docs/configuration/acme/dns01/cloudflare/#api-tokens
```

### Issuers/letsencrypt-production.yaml
```bash
---
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-production
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: e@mail.com # add your emaill
    privateKeySecretRef:
      name: letsencrypt-production
    solvers:
      - dns01:
          cloudflare:
            email: e@mail.com # add your email to your cloudflare account
            apiTokenSecretRef:
              name: homelab
              key: key-homelab
        selector:
          dnsZones:
            - "merox.cloud" # change to your zone on CloudFlare
            - "robertmelcher.ro" # change to your zone on CloudFlare
```
### values.yaml

```bash
installCRDs: false
replicaCount: 3 # change to number of masternodes
extraArgs: # required for querying for certificate
  - --dns01-recursive-nameservers=1.1.1.1:53,8.8.4.4:53
  - --dns01-recursive-nameservers-only
podDnsPolicy: None
podDnsConfig:
  nameservers:
    - 1.1.1.1
    - 8.8.4.4
```
## ArgoCD



**Install and configure ArgoCD**


1. Create a new namespace argocd and deploy ArgoCD with the web UI included.
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```
2. Log in to the ArgoCD web interface

Log in to the ArgoCD web interface https://**[your-dns-record/]** by using the default username admin and the password, collected by the following command.

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```
#### Screenshot from homelab
![argo.png](/argo.png)
## More

### How to upgrade K3S

```bash
#Upgrade master1
curl -sfL https://get.k3s.io | INSTALL_K3S_CHANNEL=latest sh -s - server \
    --cluster-init \
    --tls-san x.x.x.x.88 \
    --disable traefik \
    --disable servicelb \
    --flannel-iface eth0 \
    --node-ip x.x.x.x.81 \
    --node-taint "node-role.kubernetes.io/master=true:NoSchedule"
#Upgrade master2
curl -sfL https://get.k3s.io | INSTALL_K3S_CHANNEL=latest sh -s - server \
    --server https://x.x.x.x.81:6443 \
    --disable traefik \
    --disable servicelb \
    --flannel-iface eth0 \
    --node-ip x.x.x.x.82 \
    --node-taint "node-role.kubernetes.io/master=true:NoSchedule"
#Upgrade master3
curl -sfL https://get.k3s.io | INSTALL_K3S_CHANNEL=latest sh -s - server \
    --server https://x.x.x.x.81:6443 \
    --disable traefik \
    --disable servicelb \
    --flannel-iface eth0 \
    --node-ip x.x.x.x.83 \
    --node-taint "node-role.kubernetes.io/master=true:NoSchedule"
#Upgrade workers
curl -sfL https://get.k3s.io | INSTALL_K3S_CHANNEL=latest K3S_URL=https://x.x.x.x.81:6443 K3S_TOKEN=/var/lib/rancher/k3s/server/node-token sh -s - agent \
    --node-label 'longhorn=true' \
    --node-label 'worker=true'
```

### How to upgrade Rancher
```bash
helm upgrade rancher rancher-latest/rancher \
 --namespace cattle-system \
 --set hostname=rancher.my.org \
```
### How to upgrade Longhorn
```bash
kubectl apply -f https://raw.githubusercontent.com/longhorn/longhorn/v1.5.3/deploy/longhorn.yaml
```

### How to upgrade Metallb

>   Change version on the delete command to the version you are currently running (e.g., v0.13.11)
   Change version on the apply to the new version (e.g., v0.13.12)
   Ensure your Lbrange is still the one you want (check ipAddressPool.yaml)
{.is-warning}

```bash
kubectl delete -f https://raw.githubusercontent.com/metallb/metallb/v0.13.11/config/manifests/metallb-native.yaml
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.13.12/config/manifests/metallb-native.yaml
kubectl apply -f ipAddressPool.yaml
kubectl apply -f https://raw.githubusercontent.com/mer0x/merox.cloud/k3s/K3S/cluster-deployment/l2Advertisement.yaml
```
### How to upgrade KubeVIP

> Delete the daemonset in Rancher or use kubectl delete
   Redeploy the daemonset with updated values (check kube-vip file)
{.is-warning}
```bash
kubectl delete -f kube-vip
kubectl apply -f kube-vip
```

# Apps
# Tabs {.tabset}




## Wordpress

### Introduction

This chart bootstraps a **WordPress** deployment on a Kubernetes cluster using the Helm package manager.

It also packages the Bitnami **MariaDB** chart which is required for bootstrapping a MariaDB deployment for the database requirements of the WordPress application, and the Bitnami Memcached chart that can be used to cache database queries.

Bitnami charts can be used with Kubeapps for deployment and management of Helm Charts in clusters.

 **Prerequisites:**

>   Kubernetes 1.23+
   Helm 3.8.0+
   PV provisioner support in the underlying infrastructure
   ReadWriteMany volumes for deployment scaling
{.is-info}

>Complete YAML on [Github](https://github.com/mer0x/merox.cloud/blob/k3s/K3S/wordpress/deploy.yaml)
{.is-warning}

>P.S: Interesting tutorial for [Horizontally Scalable](https://dev.to/otumba/implementation-of-a-prototype-kubernetes-based-cluster-for-scalable-web-based-wordpress-deployment-using-k3s-on-raspberry-pis-1goe)
```yaml
affinity: {}
allowEmptyPassword: true
allowOverrideNone: false
apacheConfiguration: ''
args: []
automountServiceAccountToken: false
autoscaling:
  enabled: false
  maxReplicas: 11
  minReplicas: 1
  targetCPU: 50
  targetMemory: 50
clusterDomain: cluster.local
command: []
commonAnnotations: {}
commonLabels: {}
containerPorts:
  http: 8080
  https: 8443
containerSecurityContext:
  allowPrivilegeEscalation: false
  capabilities:
    drop:
      - ALL
  enabled: true
  privileged: false
  readOnlyRootFilesystem: false
  runAsNonRoot: true
  runAsUser: 1001
  seLinuxOptions: {}
  seccompProfile:
    type: RuntimeDefault
customHTAccessCM: ''
customLivenessProbe: {}
customPostInitScripts: {}
customReadinessProbe: {}
customStartupProbe: {}
diagnosticMode:
  args:
    - infinity
  command:
    - sleep
  enabled: false
existingApacheConfigurationConfigMap: ''
existingSecret: ''
existingWordPressConfigurationSecret: ''
externalCache:
  host: localhost
  port: 11211
externalDatabase:
```



## Netdata
### Install Netdata via the helm install command


1. Add the Netdata Helm chart repository by running:
```bash
helm repo add netdata https://netdata.github.io/helmchart/
```

2. To install Netdata using the helm install command, run:
```bash
helm install netdata netdata/netdata
```
3. If you want to deploy with specific parameters:
```bash
helm install netdata netdata/netdata --set service.type=LoadBalancer,service.loadBalancerIP="X.X.X.X",service.port=19900,parent.database.storageclass=longhorn
```
More info: [netdata docs](https://learn.netdata.cloud/docs/netdata-agent/installation/kubernetes-helm-chart-reference)
## WikiJS
>If you want to deploy all services needed by WikiJS, please check on my Github repo:
[WikiJS](https://github.com/mer0x/merox.cloud/tree/k3s/K3S/app-deployment/wikijs)
{.is-info}
### wikijs-deployment.yaml
```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wikijs
  namespace: wikijs
  labels:
    app: wikijs
spec:
  selector:
    matchLabels:
      app: wikijs
  template:
    metadata:
      labels:
        app: wikijs
    spec:
      containers:
      - name: wikijs
        image: requarks/wiki:latest
        imagePullPolicy: Always
        env:
        - name: DB_TYPE
          value: "mariadb"
        - name: DB_HOST
          value: "mariadb"
        - name: DB_PORT
          value: "3306"
        - name: DB_NAME
          valueFrom:
            secretKeyRef:
              name: mariadb-secret
              key: DATABASE
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: mariadb-secret
              key: USER
        - name: DB_PASS
          valueFrom:
            secretKeyRef:
              name: mariadb-secret
              key: PASSWORD
        ports:
        - containerPort: 3000
          name: http
```

## Loki

### Installing Loki Stack

1. First add Loki’s chart repository to helm
```bash
helm repo add grafana https://grafana.github.io/helm-charts
```
2. Then update the chart repository
```bash
helm repo update
```

This command will:

-    install grafana
-    install prometheus
-    install loki
-    enable persistence for your stack and create a PVC
```bash
helm upgrade --install loki grafana/loki-stack  --set grafana.enabled=true,prometheus.enabled=true,prometheus.alertmanager.persistentVolume.enabled=false,prometheus.server.persistentVolume.enabled=false,loki.persistence.enabled=true,loki.persistence.storageClassName=longhorn,loki.persistence.size=5Gi
```
>To configure your StorageClass, you should specify loki.persistence.storageClassName=longhorn. In this instance, I am utilizing longhorn as the Kubernetes loghorn Provisioner.
{.is-info}

## Dashboard
- If you're like me and enjoy having a dashboard in your homelab for all the services you run, for me, Homepage was the perfect solution. So, if you like what you see in the image below, let me tell you how to set it up.
{.grid-list}
> Complete YAML on [Github](https://github.com/mer0x/merox.cloud/tree/k3s/K3S/dashboard/homepage)
{.is-warning}

![dashboard.png](/dashboard.png)
### resources.yaml
```yaml
apiVersion: v1
kind: Service
metadata:
  name: merox-dashboard
  namespace: default
  labels:
    app.kubernetes.io/service: merox-dashboard
    app.kubernetes.io/instance: merox-dashboard
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/name: merox-dashboard
    app.kubernetes.io/version: v0.6.10
    helm.sh/chart: homepage-1.2.3
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
      name: http
  selector:
    app.kubernetes.io/instance: merox-dashboard
    app.kubernetes.io/name: merox-dashboard
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: merox-dashboard-homepage-logs
  namespace: default
  labels:
    app.kubernetes.io/name: homepage
    app.kubernetes.io/instance: merox-dashboard
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: longhorn
  resources:
    requests:
      storage: 2Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: merox-dashboard
  namespace: default
  labels:
    app.kubernetes.io/instance: merox-dashboard
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/name: merox-dashboard
    app.kubernetes.io/version: v0.6.10
    helm.sh/chart: homepage-1.2.3
spec:
  revisionHistoryLimit: 3
  replicas: 1
  strategy:
    type: RollingUpdate
  selector:
    matchLabels:
      app.kubernetes.io/name: merox-dashboard
      app.kubernetes.io/instance: merox-dashboard
  template:
    metadata:
      labels:
        app.kubernetes.io/name: merox-dashboard
        app.kubernetes.io/instance: merox-dashboard
    spec:
      serviceAccountName: homepage
      automountServiceAccountToken: true
      dnsPolicy: ClusterFirst
      enableServiceLinks: true
      containers:
        - name: merox-dashboard
          image: "ghcr.io/benphelps/homepage:v0.6.10"
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 3000
              protocol: TCP
          volumeMounts:
            - name: homepage-config
              subPath: bookmarks.yaml
              mountPath: /app/config/bookmarks.yaml
            - name: homepage-config
              subPath: docker.yaml
              mountPath: /app/config/docker.yaml
            - name: homepage-config
              subPath: kubernetes.yaml
              mountPath: /app/config/kubernetes.yaml
            - name: homepage-config
              subPath: services.yaml
              mountPath: /app/config/services.yaml
            - name: homepage-config
              subPath: settings.yaml
              mountPath: /app/config/settings.yaml
            - name: homepage-config
              subPath: widgets.yaml
              mountPath: /app/config/widgets.yaml
            - name: logs
              mountPath: /app/config/logs
      volumes:
        - name: homepage-config
          configMap:
            name: merox-dashboard-homepage
        - name: logs
          persistentVolumeClaim:
            claimName: merox-dashboard-homepage-logs
```

## Monitor stack

> Thanks [TechnoTim](https://technotim.live/posts/kube-grafana-prometheus/?__cf_chl_tk=IQ40EBQqm3mWArUj.3gtSvCf.rQ6E7uvfnLCKBO0Juk-1707820973-0-4389)

1. Create a Kubernetes Namespace

```bash
kubectl create namespace monitoring
```
2. Echo username and password to a file
```bash
echo -n 'adminuser' > ./admin-user
echo -n 'p@ssword!' > ./admin-password
```

3. Create a Kubernetes Secret

```bash
 kubectl create secret generic grafana-admin-credentials --from-file=./admin-user --from-file=admin-password -n monitoring
```

4. Verify your secret
```bash
kubectl describe secret -n monitoring grafana-admin-credentials
```
5. You should see
```bash
Name:         grafana-admin-credentials
Namespace:    monitoring
Labels:       <none>
Annotations:  <none>

Type:  Opaque

Data
====
admin-password:  9 bytes
admin-user:      9 bytes
```

6. Create a values file to hold our helm values
7. ***Copy** values from* [Github](https://github.com/mer0x/merox.cloud/blob/k3s/K3S/monitoring/values.yaml)
```bash
nano values.yaml
```
8. Install helm chart with specific values from above
```bash
helm install -n monitoring prometheus prometheus-community/kube-prometheus-stack -f values.yaml
```

