#### Linux automatically upgrade

```yaml linenums="1"
---

- hosts: all
  tasks:
  - name: install all updates
    apt:
      upgrade: dist
      update_cache: yes
      autoremove: yes
      autoclean: yes
    register: result
  - name: List installed and updated packages
    shell: grep -E "^$(date +%Y-%m-%d).+ (install|upgrade) " /var/log/dpkg.log |cut -d " " -f 3-5
    register: result
  - name: Show Output
    debug: msg="{{ result.stdout_lines }}"
- hosts: centos
  tasks:
  - name: install all updates
    yum:
      name: '*'
      update_cache: yes
      state: latest
  - name: List updated packages
    shell: rpm -qa --last | grep "$(date +%a\ %d\ %b\ %Y)" |cut -f 1 -d " "
    register: result
    args:
      warn: no
  - name: Updates packages
    debug: msg="{{ result.stdout_lines }}"


```