# Docker Compose

Docker Compose is a tool for defining and running multi-container applications. It is the key to unlocking a streamlined and efficient development and deployment experience.

Compose simplifies the control of your entire application stack, making it easy to manage services, networks, and volumes in a single, comprehensible YAML configuration file. Then, with a single command, you create and start all the services from your configuration file.



### Docker Compose Options

### Loging

Reduce container size of logs (support compose & swarm)
```yaml #

   logging:
     driver: "json-file"
     options:
       max-size: "500m"
       max-file: "10"
       compress: "true"

```
### DNS
```yaml #

   dns:
     - "10.0.0.2"
     - "8.8.8.8"

```

### PORTS
```yaml #

   ports:
     - "8080:8080
```

### Extra Hosts
```yaml #

   extra_hosts:
     - "sub.somedomain.com:10.0.10.30"
```

### Labels
```yaml #

    labels: [app=reporting]

```

### Container name

```yaml #

    container_name: somename
```


### Limit resources
```yaml

      resources:
        reservations:
          memory: 2048M
          cpus: '0.0001'
        limits:
          memory: 4096M
          cpus: '0.5'
```