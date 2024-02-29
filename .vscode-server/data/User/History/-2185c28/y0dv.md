## Dashboard
- If you're like me and enjoy having a dashboard in your homelab for all the services you run, for me, Homepage was the perfect solution. So, if you like what you see in the image below, let me tell you how to set it up.


!!! warning
    Complete YAML on [Github](https://github.com/mer0x/merox.cloud/tree/k3s/K3S/dashboard/homepage)


![dashboard.png](/images/content/dashboard.png)

### resources.yaml
```yaml linenums="1"
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
