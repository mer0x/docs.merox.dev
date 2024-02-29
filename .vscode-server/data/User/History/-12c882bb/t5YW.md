### How to upgrade K3S cluster

```bash linenums="1"
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
```bash linenums="1"
helm upgrade rancher rancher-latest/rancher \
 --namespace cattle-system \
 --set hostname=rancher.my.org \
```

### How to upgrade Longhorn
```bash linenums="1"
kubectl apply -f https://raw.githubusercontent.com/longhorn/longhorn/v1.5.3/deploy/longhorn.yaml
```

### How to upgrade Metallb
!!! warning
    Change version on the delete command to the version you are currently running (e.g., v0.13.11)
    Change version on the apply to the new version (e.g., v0.13.12)
    Ensure your Lbrange is still the one you want (check ipAddressPool.yaml)


```bash linenums="1"
kubectl delete -f https://raw.githubusercontent.com/metallb/metallb/v0.13.11/config/manifests/metallb-native.yaml
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.13.12/config/manifests/metallb-native.yaml
kubectl apply -f ipAddressPool.yaml
kubectl apply -f https://raw.githubusercontent.com/mer0x/merox.cloud/k3s/K3S/cluster-deployment/l2Advertisement.yaml
```
### How to upgrade KubeVIP
!!! warning
    Delete the daemonset in Rancher or use kubectl delete
    Redeploy the daemonset with updated values (check kube-vip file)

```bash linenums="1"
kubectl delete -f kube-vip
kubectl apply -f kube-vip
```