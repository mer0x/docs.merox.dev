# Kubernetes

Kubernetes, also known as K8s, is an open-source system for automating deployment, scaling, and management of containerized applications.

## Overview


!!! info
    My cluster is designed with a focus on reliability and performance:<br>
    **3 master nodes** ensure high availability and cluster management, tagged with:<br> node-role.kubernetes.i.o/master=true:NoSchedule.<br>
    **3 worker nodes**, tagged with:<br> longhorn=true worker=true, handle the workload and storage, optimizing the environment for distributed applications.


``` bash linenums="1"
merox@k3s-admin:~$ kubectl get nodes -o wide
NAME            STATUS   ROLES                       AGE   VERSION          OS-IMAGE             KERNEL-VERSION    CONTAINER-RUNTIME
k3s-01          Ready    <none>                      14d   v1.29.1+k3s2     Ubuntu 22.04.3 LTS   5.15.0-1049-kvm   containerd://1.7.11-k3s2
k3s-02          Ready    <none>                      14d   v1.29.1+k3s2     Ubuntu 22.04.3 LTS   5.15.0-1049-kvm   containerd://1.7.11-k3s2
k3s-03          Ready    <none>                      14d   v1.29.1+k3s2     Ubuntu 22.04.3 LTS   5.15.0-1049-kvm   containerd://1.7.11-k3s2
k3s-master-01   Ready    control-plane,etcd,master   14d   v1.29.1+k3s2     Ubuntu 22.04.3 LTS   6.5.11-7-pve      containerd://1.7.11-k3s2
k3s-master-02   Ready    control-plane,etcd,master   14d   v1.29.1+k3s2     Ubuntu 22.04.3 LTS   6.5.11-7-pve      containerd://1.7.11-k3s2
k3s-master-03   Ready    control-plane,etcd,master   14d   v1.29.1+k3s2     Ubuntu 22.04.3 LTS   6.5.11-7-pve      containerd://1.7.11-k3s2
```
??? example "Rancher NODES screenshot"
    ![Rancher nodes](/images/content/rancher_k3s_cluster.png "Rancher Nodes")


### Advanced Tooling for an Optimized Experience

Leveraging cutting-edge tools enhances my cluster's capabilities:

-    **MetalLB** and **KubeVIP** offer reliable load balancing.

-    **Longhorn** provides resilient and scalable storage.
??? example "Rancher NODES screenshot"
    ![Longhorn](/images/content/longhorn.png "Longhorn")
-    **Rancher** simplifies cluster management with its intuitive UI.
??? example "Rancher NODES screenshot"
    ![Rancher](/images/content/rancher.png "Rancher")
-    **Traefik** serves as the ingress controller, directing traffic efficiently.
??? example "Rancher NODES screenshot"
    ![Traefik](/images/content/trefik.png "Traefik")
-    **Kube-Prometheus** and **Loki** deliver comprehensive monitoring and logging.
-    **ArgoCD**, integrated with GitHub, automates deployment, keeping my cluster in sync with the latest configurations and applications.
??? example "Rancher NODES screenshot"
    ![ArgoCD](/images/content/argo.png "ArgoCD")



!!! success
    How to deploy your own K3S cluster in no time:






