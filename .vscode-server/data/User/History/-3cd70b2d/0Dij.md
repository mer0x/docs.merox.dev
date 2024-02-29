## Wordpress

### Introduction

1. This chart bootstraps a **WordPress** deployment on a Kubernetes cluster using the Helm package manager.

It also packages the Bitnami **MariaDB** chart which is required for bootstrapping a MariaDB deployment for the database requirements of the WordPress application, and the Bitnami Memcached chart that can be used to cache database queries.

Bitnami charts can be used with Kubeapps for deployment and management of Helm Charts in clusters.

 **Prerequisites:**

>   Kubernetes 1.23+
   Helm 3.8.0+
   PV provisioner support in the underlying infrastructure
   ReadWriteMany volumes for deployment scaling
{.is-info}

2. Complete YAML on [Github](https://github.com/mer0x/merox.cloud/blob/k3s/K3S/wordpress/deploy.yaml)
{.is-warning}

3. P.S: Interesting tutorial for [Horizontally Scalable](https://dev.to/otumba/implementation-of-a-prototype-kubernetes-based-cluster-for-scalable-web-based-wordpress-deployment-using-k3s-on-raspberry-pis-1goe)

```yaml linenums="1"
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