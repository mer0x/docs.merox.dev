## MySQL Cheatsheet
### Create Database;


``` mysql linenums="1"
create database dbname;
```
or

``` mysql linenums="1"
create database `dbname` CHARACTER SET utf8 COLLATE utf8_general_ci;
```

or


``` mysql linenums="1"
create schema some_db default character set utf8mb4;
```

### Create User

``` mysql linenums="1"
create user 'user'@'%' identified by 'some_pwd';
```

### Grant Privileges to User

``` mysql linenums="1"
grant all privileges on dbname.* to 'user'@'%';
flush privileges;
```

### Update users password

``` mysql linenums="1"
ALTER USER 'userName'@'%' IDENTIFIED BY 'Newpass';
flush privileges;
```

### Show Users

``` mysql linenums="1"
select user,host from mysql.user;
```

### Show Grants

``` mysql linenums="1"
show grants for 'some_user'@'%';
```

### Give Admin Rights


``` mysql linenums="1"
GRANT ALL PRIVILEGES ON *.* TO 'some_user'@'%';
```

``` mysql linenums="1"
GRANT ALL PRIVILEGES ON *.* TO 'some_user'@'localhost';
```
### Drop database

``` mysql linenums="1"
drop databse some_db;
```
### Show Process list

``` mysql linenums="1"
show processlist;
```
### max connections

``` mysql linenums="1"
show variables like "max_connections";
```
### Increase max connections:

``` mysql linenums="1"
set global max_connections = 200;
```
### max allowed packets

See max allowed packets value:

``` mysql linenums="1"
SHOW VARIABLES LIKE 'max_allowed_packet';
```
### Change max allowed packets value:

``` mysql linenums="1"
SET GLOBAL max_allowed_packet=16777216;
```