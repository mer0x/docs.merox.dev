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