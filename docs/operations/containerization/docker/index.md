#  Docker

Docker offers advantages over virtual machines by being more resource-efficient and faster due to container technology, which shares the host's kernel. It ensures consistent environments across different stages, simplifying deployment and reducing compatibility issues. Docker's efficient resource use and deployment agility make it a cost-effective solution for application management compared to VMs.

## Install
+++ Docker install


Before you install Docker Engine for the first time on a new host machine, you need to set up the Docker repository. Afterward, you can install and update Docker from the repository.

1. Set up Docker's apt repository.

  ```bash #
  # Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
  ```
2. Install the Docker packages.
```bash #
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
!!!warning DISTRO
 If you use an Ubuntu derivative distro, such as Linux Mint, you may need to use UBUNTU_CODENAME instead of VERSION_CODENAME.
!!!

3. Verify that the Docker Engine installation is successful by running the hello-world image.
```bash #
sudo docker run hello-world
```
[!button icon="<svg width=&quot;24&quot; height=&quot;24&quot;><path fill-rule=&quot;evenodd&quot; d=&quot;M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm0 1.5a6 6 0 100-12 6 6 0 000 12z&quot;></path></svg>" text="View source"](https://docs.docker.com/engine/install/ubuntu/)


+++ Portainer install

1. First, create the volume that Portainer Server will use to store its database:
```bash #
docker volume create portainer_data
```
2. Then, download and install the Portainer Server container:
```bash #
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
```
!!!info
 By default, Portainer generates and uses a self-signed SSL certificate to secure port 9443 
 !!!

[!button icon="<svg width=&quot;24&quot; height=&quot;24&quot;><path fill-rule=&quot;evenodd&quot; d=&quot;M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm0 1.5a6 6 0 100-12 6 6 0 000 12z&quot;></path></svg>" text="View source"](https://docs.portainer.io/start/install-ce/server/docker/linux)

+++