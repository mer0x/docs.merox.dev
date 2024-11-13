## InfluxDB Cheatsheet

### Connect to InfluxDB using the commandline:
``` mysql linenums="1"
    $ influx
```
### Create a database foo:
``` mysql linenums="1"
    CREATE DATABASE foo
```
###  List the databases:
``` mysql linenums="1"
    SHOW DATABASES
```
### Select the new created database:
``` mysql linenums="1"
    USE foo
```
### List measurements
``` mysql linenums="1"
    SHOW MEASUREMENTS
```
### Show measurements for name: mars
``` mysql linenums="1"
    SELECT * FROM mars
```
### Drop mars measurements
``` mysql linenums="1"
    DROP MEASUREMENT mars
```
### Show field keys
``` mysql linenums="1"
    SHOW FIELD KEYS FROM "mars-A6"
```
### Get power records from measurement with tag and time range
``` mysql linenums="1"
    SELECT "power" FROM "drilling" WHERE ("module_id"='rover') AND time >= now() - 9h
```
### Show series
``` mysql linenums="1"    
    SHOW SERIES
```    
### Drop all series for tag
``` mysql linenums="1"
    DROP SERIES FROM "drilling" WHERE ("module_id" = 'oppy')
```