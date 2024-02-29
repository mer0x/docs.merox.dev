**Install and configure ArgoCD**


1. Create a new namespace argocd and deploy ArgoCD with the web UI included.
```bash linenums="1"
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```
2. Log in to the ArgoCD web interface

Log in to the ArgoCD web interface https://**[your-dns-record/]** by using the default username admin and the password, collected by the following command.

```bash linenums="1"
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```
