# Cloudflare Tunnel

Protect your web servers from direct attack

From the moment an application is deployed, developers and IT spend time locking it down — configuring ACLs, rotating IP addresses, and using clunky solutions like GRE tunnels.

```yaml linenums="1"
version: "3.9"
services:
  wordpress:
    container_name: wordpress
    image: wordpress:latest
    restart: unless-stopped
    volumes:
      - ./wordpress:/app/data

  tunnel:
    container_name: cloudflared-tunnel
    image: cloudflare/cloudflared
    restart: unless-stopped
    command: tunnel run
    environment:
      - TUNNEL_TOKEN=mytoken

networks:
  default:
    external:
      name: wordpress
```
