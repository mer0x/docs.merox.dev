# Media Stack

The media stack with Jellyfin, Radarr, Sonarr, qBittorrent, and Jackett creates an efficient personal media center. Jellyfin streams media, Radarr and Sonarr automate media organization, qBittorrent manages torrents, and Jackett enhances search across torrent providers. This setup streamlines media management and streaming.

``` yaml linenums="1"
version: '3'
services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    restart: unless-stopped
    volumes:
      - /media-config/jellyfin:/config
      - /media:/media
      - /media/movies:/movies
      - /media/shows:/TVs
    ports:
      - 8096:8096
    environment:
      - PUID=1057
      - PGID=1056
      - TZ=Europe/Bucharest

  radarr:
    container_name: radarr
    restart: unless-stopped
    ports:
      - 7878:7878
    volumes:
      - /media-config/radarr:/config
      - /media/qbittorrent:/downloads
      - /media/movies:/movies
    environment:
      - PUID=1057
      - PGID=1056
      - TZ=Europe/Bucharest
    image: linuxserver/radarr

  sonarr:
    container_name: sonarr
    restart: unless-stopped
    ports:
      - 8989:8989
    volumes:
      - /media-config/sonarr:/config
      - /media/qbittorrent:/downloads
      - /media/shows:/tv
    environment:
      - PUID=1057
      - PGID=1056
      - TZ=Europe/Bucharest
    image: linuxserver/sonarr

  jackett:
    container_name: jackett
    restart: unless-stopped
    ports:
      - 9117:9117
    volumes:
      - /media-config/jackett:/config
    environment:
      - PUID=1057
      - PGID=1056
      - TZ=Europe/Bucharest
    image: linuxserver/jackett

  qbittorrent:
    image: linuxserver/qbittorrent
    container_name: qbittorrent
    environment:
      - PUID=1057
      - PGID=1056
      - TZ=Europe/Bucharest
      - WEBUI_PORT=8091
    volumes:
      - /media-config/qbittorrent:/config
      - /media/qbittorrent:/downloads
    ports:
      - 6881:6881
      - 6881:6881/udp
      - 8091:8091
    restart: unless-stopped
```