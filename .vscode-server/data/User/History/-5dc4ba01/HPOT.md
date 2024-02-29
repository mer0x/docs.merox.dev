# WordPress

WordPress, launched in 2003, is a leading content management system (CMS) for creating websites, known for its ease of use, extensive plugins, and themes. It caters to both beginners and developers, enabling the development of everything from blogs to complex sites, making it highly popular across the web.

``` yaml linenums="1"
version: '2'

services:
   db:
     image: mysql:5.7
     volumes:
       - db_data:/var/lib/mysql
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: ${MYSQL_DATABASE_PASSWORD}
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress

   wordpress:
     image: wordpress:latest
     ports:
       - 80
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress

volumes:
    db_data:
```

```bash 
docker-compose -f /path/to/your/docker-compose-file.yml up -d
```