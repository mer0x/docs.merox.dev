
# Web Server Cheatsheet

## Nginx

```bash
# Install Nginx on Ubuntu/Debian
sudo apt-get install nginx

# Check Nginx status
sudo systemctl status nginx

# Start Nginx
sudo systemctl start nginx

# Stop Nginx
sudo systemctl stop nginx

# Reload Nginx
sudo systemctl reload nginx

# Check Nginx configuration
sudo nginx -t

# Generate an SSL certificate with Let's Encrypt (certbot)
sudo certbot --nginx

# Allow traffic on ports 80 and 443 through firewall (UFW)
sudo ufw allow 'Nginx Full'

# Enable Nginx to start on boot
sudo systemctl enable nginx

# Configure Nginx for a domain
server {
    listen 80;
    server_name example.com;
    location / {
        root /var/www/html;
        index index.html;
    }
}
```

## Apache

```bash
# Install Apache on Ubuntu/Debian
sudo apt-get install apache2

# Check Apache status
sudo systemctl status apache2

# Start Apache
sudo systemctl start apache2

# Stop Apache
sudo systemctl stop apache2

# Reload Apache
sudo systemctl reload apache2

# Check Apache configuration
sudo apache2ctl configtest

# Enable Apache to start on boot
sudo systemctl enable apache2

# Allow traffic on ports 80 and 443 through firewall
sudo ufw allow 'Apache Full'

# Configure Apache VirtualHost for a domain
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html
    ServerName example.com
</VirtualHost>
```