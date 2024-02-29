
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
  database: bitnami_wordpress
  existingSecret: ''
  host: localhost
  password: 'defaultOne'
  port: 3306
  user: bn_wordpress
extraContainerPorts: []
extraDeploy: []
extraEnvVars: []
extraEnvVarsCM: ''
extraEnvVarsSecret: ''
extraVolumeMounts: []
extraVolumes: []
fullnameOverride: ''
global:
  imagePullSecrets: []
  imageRegistry: ''
  storageClass: 'longhorn'
hostAliases:
  - hostnames:
      - status.localhost
    ip: 127.0.0.1
htaccessPersistenceEnabled: false
image:
  debug: false
  digest: ''
  pullPolicy: IfNotPresent
  pullSecrets: []
  registry: docker.io
  repository: bitnami/wordpress
  tag: 6.4.2-debian-11-r18
ingress:
  annotations: {}
  apiVersion: ''
  enabled: false
  extraHosts: []
  extraPaths: []
  extraRules: []
  extraTls: []
  hostname: wordpress.local
  ingressClassName: ''
  path: /
  pathType: ImplementationSpecific
  secrets: []
  selfSigned: false
  tls: false
  tlsWwwPrefix: false
initContainers: []
kubeVersion: ''
lifecycleHooks: {}
livenessProbe:
  enabled: true
  failureThreshold: 6
  httpGet:
    httpHeaders: []
    path: /wp-admin/install.php
    port: '{{ .Values.wordpressScheme }}'
    scheme: '{{ .Values.wordpressScheme | upper }}'
  initialDelaySeconds: 120
  periodSeconds: 10
  successThreshold: 1
  timeoutSeconds: 5
mariadb:
  architecture: standalone
  auth:
    database: bitnami_wordpress
    password: 'defaultOne'
    rootPassword: 'defaultOneRoot'
    username: bn_wordpress
  enabled: true
  primary:
    persistence:
      accessModes:
        - ReadWriteOnce
      enabled: true
      size: 8Gi
      storageClass: ''
memcached:
  auth:
    enabled: false
    existingPasswordSecret: ''
    password: ''
    username: ''
  enabled: false
  service:
    port: 11211
metrics:
  containerPorts:
    metrics: 9117
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
  customLivenessProbe: {}
  customReadinessProbe: {}
  customStartupProbe: {}
  enabled: false
  image:
    digest: ''
    pullPolicy: IfNotPresent
    pullSecrets: []
    registry: docker.io
    repository: bitnami/apache-exporter
    tag: 1.0.5-debian-11-r3
  livenessProbe:
    enabled: true
    failureThreshold: 3
    initialDelaySeconds: 15
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 5
  readinessProbe:
    enabled: true
    failureThreshold: 3
    initialDelaySeconds: 5
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 3
  resources:
    limits: {}
    requests: {}
  service:
    annotations:
      prometheus.io/port: '{{ .Values.metrics.containerPorts.metrics }}'
      prometheus.io/scrape: 'true'
    ports:
      metrics: 9150
  serviceMonitor:
    enabled: false
    honorLabels: false
    interval: ''
    jobLabel: ''
    labels: {}
    metricRelabelings: []
    namespace: ''
    relabelings: []
    scrapeTimeout: ''
    selector: {}
  startupProbe:
    enabled: false
    failureThreshold: 15
    initialDelaySeconds: 10
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 1
multisite:
  enable: false
  enableNipIoRedirect: false
  host: ''
  networkType: subdomain
nameOverride: ''
networkPolicy:
  egressRules:
    customRules: {}
    denyConnectionsToExternal: false
  enabled: false
  ingress:
    enabled: false
    namespaceSelector: {}
    podSelector: {}
  ingressRules:
    accessOnlyFrom:
      enabled: false
      namespaceSelector: {}
      podSelector: {}
    backendOnlyAccessibleByFrontend: false
    customBackendSelector: {}
    customRules: {}
  metrics:
    enabled: false
    namespaceSelector: {}
    podSelector: {}
nodeAffinityPreset:
  key: ''
  type: ''
  values: []
nodeSelector: {}
overrideDatabaseSettings: false
pdb:
  create: false
  maxUnavailable: ''
  minAvailable: 1
persistence:
  accessMode: ReadWriteOnce
  accessModes:
    - ReadWriteOnce
  annotations: {}
  dataSource: {}
  enabled: true
  existingClaim: ''
  selector: {}
  size: 10Gi
  storageClass: ''
podAffinityPreset: ''
podAnnotations: {}
podAntiAffinityPreset: soft
podLabels: {}
podSecurityContext:
  enabled: true
  fsGroup: 1001
  fsGroupChangePolicy: Always
  supplementalGroups: []
  sysctls: []
priorityClassName: ''
readinessProbe:
  enabled: true
  failureThreshold: 6
  httpGet:
    httpHeaders: []
    path: /wp-login.php
    port: '{{ .Values.wordpressScheme }}'
    scheme: '{{ .Values.wordpressScheme | upper }}'
  initialDelaySeconds: 30
  periodSeconds: 10
  successThreshold: 1
  timeoutSeconds: 5
replicaCount: 1
resources:
  limits: {}
  requests:
    cpu: 300m
    memory: 512Mi
schedulerName: ''
service:
  annotations: {}
  clusterIP: ''
  externalTrafficPolicy: Cluster
  extraPorts: []
  httpsTargetPort: https
  loadBalancerIP: ''
  loadBalancerSourceRanges: []
  nodePorts:
    http: ''
    https: ''
  ports:
    http: 80
    https: 443
  sessionAffinity: None
  sessionAffinityConfig: {}
  type: LoadBalancer
serviceAccount:
  annotations: {}
  automountServiceAccountToken: false
  create: true
  name: ''
sidecars: []
smtpExistingSecret: ''
smtpHost: ''
smtpPassword: ''
smtpPort: ''
smtpProtocol: ''
smtpUser: ''
startupProbe:
  enabled: false
  failureThreshold: 6
  httpGet:
    httpHeaders: []
    path: /wp-login.php
    port: '{{ .Values.wordpressScheme }}'
    scheme: '{{ .Values.wordpressScheme | upper }}'
  initialDelaySeconds: 30
  periodSeconds: 10
  successThreshold: 1
  timeoutSeconds: 5
terminationGracePeriodSeconds: ''
tolerations: []
topologySpreadConstraints: []
updateStrategy:
  type: RollingUpdate
volumePermissions:
  containerSecurityContext:
    runAsUser: 0
    seLinuxOptions: {}
  enabled: false
  image:
    digest: ''
    pullPolicy: IfNotPresent
    pullSecrets: []
    registry: docker.io
    repository: bitnami/os-shell
    tag: 11-debian-11-r95
  resources:
    limits: {}
    requests: {}
wordpressBlogName: Merox's Blog!
wordpressConfiguration: ''
wordpressConfigureCache: false
wordpressEmail: melcher95@gmail.com
wordpressExtraConfigContent: ''
wordpressFirstName: Robert
wordpressLastName: Melcher
wordpressPassword: 'defaultOne2'
wordpressPlugins: none
wordpressScheme: http
wordpressSkipInstall: false
wordpressTablePrefix: wp_
wordpressUsername: user
```