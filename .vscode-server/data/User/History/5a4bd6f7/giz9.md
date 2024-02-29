> Thanks [TechnoTim](https://technotim.live/posts/kube-grafana-prometheus/?__cf_chl_tk=IQ40EBQqm3mWArUj.3gtSvCf.rQ6E7uvfnLCKBO0Juk-1707820973-0-4389)

### Create a Kubernetes Namespace

```bash linenums="1"
kubectl create namespace monitoring
```
### username and password 
```bash linenums="1"
echo -n 'adminuser' > ./admin-user
echo -n 'p@ssword!' > ./admin-password
```

### Create a Kubernetes Secret

```bash linenums="1"
 kubectl create secret generic grafana-admin-credentials --from-file=./admin-user --from-file=admin-password -n monitoring
```

### Verify your secret
```bash linenums="1"
kubectl describe secret -n monitoring grafana-admin-credentials
```
### You should see
```bash linenums="1"
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

### Create a values file 
### Copy values 
 [Github](https://github.com/mer0x/merox.docs/blob/k3s/K3S/monitoring/values.yaml)
```bash linenums="1"
nano values.yaml
```
### Install helm chart 
```bash linenums="1"
helm install -n monitoring prometheus prometheus-community/kube-prometheus-stack -f values.yaml
``` 