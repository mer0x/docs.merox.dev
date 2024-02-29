# Uptime KUMA

Uptime Kuma is an easy-to-use self-hosted monitoring tool.<br>
https://github.com/louislam/uptime-kuma

```yaml linenums="1"
version: '3.3'

services:
  uptime-kuma:
    image: louislam/uptime-kuma:1
    container_name: uptime-kuma
    volumes:
      - ./uptime-kuma-data:/app/data
    ports:
      - 3001:3001  
    restart: always
```