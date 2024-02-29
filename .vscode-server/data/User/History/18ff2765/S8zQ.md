### wikijs-deployment.yaml
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