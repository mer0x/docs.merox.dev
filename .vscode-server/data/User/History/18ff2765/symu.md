#### wikijs-config.yaml
``` yaml linenums="1"
---
apiVersion: v1
kind: Service
metadata:
  name: mariadb
  namespace: wikijs
spec:
  selector:
    app: mariadb
  ports:
  - name: mariadb
    protocol: TCP
    port: 3306
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mariadb
  namespace: wikijs
  labels:
    app: mariadb
spec:
  selector:
    matchLabels:
      app: mariadb
  template:
    metadata:
      labels:
        app: mariadb
    spec:
      containers:
      - name: mariadb
        image: mariadb:latest
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mariadb-secret
              key: ROOT_PASSWORD
        - name: MYSQL_DATABASE
          valueFrom:
            secretKeyRef:
              name: mariadb-secret
              key: DATABASE
        - name: MYSQL_USER
          valueFrom:
            secretKeyRef:
              name: mariadb-secret
              key: USER
        - name: MYSQL_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mariadb-secret
              key: PASSWORD
        - name: MARIADB_ROOT_HOST
          value: "%"
        ports:
        - containerPort: 3306
          name: mysql
        volumeMounts:
        - name: wikijs-db
          mountPath: /var/lib/mysql
      volumes:
      - name: wikijs-db
        persistentVolumeClaim:
          claimName: wikijs-pv-claim
```
#### wikijs-deployment.yaml
```bash linenums="1"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wikijs
  namespace: wikijs
  labels:
    app: wikijs
spec:
  selector:
    matchLabels:
      app: wikijs
  template:
    metadata:
      labels:
        app: wikijs
    spec:
      containers:
      - name: wikijs
        image: requarks/wiki:latest
        imagePullPolicy: Always
        env:
        - name: DB_TYPE
          value: "mariadb"
        - name: DB_HOST
          value: "mariadb"
        - name: DB_PORT
          value: "3306"
        - name: DB_NAME
          valueFrom:
            secretKeyRef:
              name: mariadb-secret
              key: DATABASE
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: mariadb-secret
              key: USER
        - name: DB_PASS
          valueFrom:
            secretKeyRef:
              name: mariadb-secret
              key: PASSWORD
        ports:
        - containerPort: 3000
          name: http
```