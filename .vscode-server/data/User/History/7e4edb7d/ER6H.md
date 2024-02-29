## Loki

### Installing Loki Stack

1. First add Loki’s chart repository to helm
```bash linenums="1"
helm repo add grafana https://grafana.github.io/helm-charts
```
2. Then update the chart repository
```bash linenums="1"
helm repo update
```

This command will:

-    install grafana
-    install prometheus
-    install loki
-    enable persistence for your stack and create a PVC
```bash linenums="1"
helm upgrade --install loki grafana/loki-stack  --set grafana.enabled=true,prometheus.enabled=true,prometheus.alertmanager.persistentVolume.enabled=false,prometheus.server.persistentVolume.enabled=false,loki.persistence.enabled=true,loki.persistence.storageClassName=longhorn,loki.persistence.size=5Gi
```
>To configure your StorageClass, you should specify loki.persistence.storageClassName=longhorn. In this instance, I am utilizing longhorn as the Kubernetes loghorn Provisioner.
{.is-info}
