
 Below, I will provide some YAML examples of how to expose both internal or external Kubernetes services through Traefik.

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