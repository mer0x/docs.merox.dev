# Kubernetes

In the interconnected ecosystem of PulsarDC, Kubernetes orchestrates the containerized applications, bringing scalability and automation to the forefront of my homelab. Utilizing K3s for its lightweight footprint, I've established a resilient and efficient Kubernetes cluster that seamlessly manages a diverse array of workloads. Dive into the architecture, setup, and the essential role Kubernetes plays in optimizing application deployments and enhancing system resilience in my setup. 

<br>Continue reading through this page to learn how to set up your own cluster, storage solutions, and automation with ArgoCD, Ingress controllers, and more, in no time.

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



??? info "Rancher NODES screenshot"
    ![Rancher nodes](/images/content/rancher_k3s_cluster.png "Rancher Nodes")


### Advanced Tooling for an Optimized Experience

Leveraging cutting-edge tools enhances my cluster's capabilities:

##### **MetalLB** and **KubeVIP** offer reliable load balancing.
    Check the footer [^1] to view config files.

-    **Longhorn** provides resilient and scalable storage.
??? example "Longhorn screenshot"
    ![Longhorn](/images/content/longhorn.png "Longhorn")
-    **Rancher** simplifies cluster management with its intuitive UI.
??? example "Rancher screenshot"
    ![Rancher](/images/content/rancher.png "Rancher")
-    **Traefik** serves as the ingress controller, directing traffic efficiently.
???+ example "Traefik screenshott"
    ![Traefik](/images/content/trefik.png "Traefik")
-    **Kube-Prometheus** and **Loki** deliver comprehensive monitoring and logging.
-    **ArgoCD**, integrated with GitHub, automates deployment, keeping my cluster in sync with the latest configurations and applications.
???+ example "ArgoCD screenshot"
    ![ArgoCD](/images/content/argo.png "ArgoCD")



## Installation/Configs
!!! success
    See how to deploy and configure your own K3S cluster in no time:
    <div class="grid cards" markdown>
     <a href="/operations/containerization/k3s/installation">:simple-kubernetes: __Check configs__ DEPLOY YOUR OWN K3S CLUSTER</a>
    </div>

[^1]: Deploy K3S in no time
