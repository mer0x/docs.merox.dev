
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