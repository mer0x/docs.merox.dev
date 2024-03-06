---
draft: false 
date: 2024-03-06 
categories:
  - kubernetes
  - installation
authors:
  - robertmelcher
comments: true
---

# Building a High-Availability Media Server on Kubernetes with Longhorn and Synology NAS

Leveraging Kubernetes for your home media server not only brings scalability and resilience but also introduces a level of sophistication and control unmatched by traditional setups. In this guide, we'll walk through setting up a media server ecosystem, highlighting the integration of Longhorn for application configurations and a Synology NAS with NFS for our media storage needs—films and TV series. Our stack includes Jellyfin for media streaming, Radarr for movie management, and Sonarr for TV series management.

Why Kubernetes with Longhorn and Synology NAS?
Kubernetes offers a robust foundation for deploying containerized applications with high availability and scalability. Longhorn, as a cloud-native distributed storage system, provides a resilient and scalable storage solution, perfectly suited for dynamic Kubernetes environments. It simplifies managing volumes, backups, and snapshots, offering a seamless experience for our media applications' configuration data.

Synology NAS with NFS (Network File System) shines in its role as a centralized media storage solution. It's reliable, easy to set up, and supports high-capacity storage solutions—ideal for an ever-growing media library.

Setting Up the Stage
Longhorn for Application Configurations
Our journey begins with deploying Longhorn in our Kubernetes cluster. Longhorn's primary role is to manage the persistent storage for our applications' configurations. This ensures that our media server's state is preserved across pod restarts and redeployments, maintaining settings, preferences, and stateful data intact.

Synology NAS with NFS: A Vault for Our Media
Synology NAS, renowned for its reliability and user-friendly interface, serves as our central repository for films and TV series. By configuring NFS shares on Synology, we create a network-accessible storage space, easily integrated into our Kubernetes setup. Each application—Jellyfin, Radarr, and Sonarr—mounts this NFS share to access and manage the media files seamlessly.

Integrating Jellyfin, Radarr, and Sonarr
Jellyfin: Streaming in Style
Jellyfin, our open-source media system, offers a polished interface to stream our content. Deployed within Kubernetes and using Longhorn for its configuration storage, Jellyfin accesses our media library stored on Synology NAS via NFS, providing a centralized streaming hub for all our devices.

Radarr & Sonarr: Automating Media Management
Radarr and Sonarr automate downloading and organizing movies and TV shows, respectively. Both applications leverage Longhorn for storing their configurations and Synology NAS for accessing the actual media files. This setup automates the tedious task of media management, ensuring our library is always up to date with the latest releases and neatly organized.

Conclusion
Embracing Kubernetes with Longhorn and Synology NAS transforms the media server experience, offering a scalable, resilient, and automated ecosystem. This guide outlines the foundation of a sophisticated home media server setup, promising an enjoyable streaming experience backed by the power of modern technologies.

Explore more, configure wisely, and enjoy your personal media empire with ease and elegance!



Further Reading and Resources

- Manifest files: [here](https://merox.dev/operations/containerization/k3s/manifests/media-stack/)