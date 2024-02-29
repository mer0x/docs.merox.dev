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