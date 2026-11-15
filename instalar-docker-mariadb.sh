#!/bin/bash
# Instala o Docker e sobe um container MariaDB na VM (Ubuntu ou Debian)
# Uso: bash instalar-docker-mariadb.sh

set -e

# ---------------------------------------------------------------
# REMOVE VERSÕES ANTERIORES DO DOCKER
# (o "|| true" evita erro caso nenhum desses pacotes esteja instalado)
# ---------------------------------------------------------------
sudo apt-get remove -y \
    docker \
    docker-engine \
    docker.io \
    containerd \
    runc || true

sudo apt update

# ---------------------------------------------------------------
# INSTALA O DOCKER-CE
# ---------------------------------------------------------------
sudo apt install -y ca-certificates curl

# Chave GPG do repositório (jeito atual, sem apt-key)
sudo install -m 0755 -d /etc/apt/keyrings

# Detecta se o sistema é ubuntu ou debian (variável ID do os-release)
. /etc/os-release
sudo curl -fsSL "https://download.docker.com/linux/${ID}/gpg" -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Adiciona o repositório oficial do Docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/${ID} ${VERSION_CODENAME} stable" \
    | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Permite usar "docker" sem sudo (vale após sair e entrar de novo no SSH)
sudo usermod -aG docker "$USER"

# ---------------------------------------------------------------
# CRIANDO O CONTAINER DO MARIADB
# ---------------------------------------------------------------
# 127.0.0.1:3306 -> o banco aceita conexões só de dentro da VM.
# Para acessar de fora, use túnel SSH (veja a seção do Workbench abaixo).
# TROQUE "SUA_SENHA_FORTE / SHA256+NlyOdBELvHKx6Y " por uma senha de verdade.
sudo docker run --restart always -d --name bdmariadb1 \
    -p 127.0.0.1:3306:3306 \
    -e MYSQL_ROOT_PASSWORD=SHA256+NlyOdBELvHKx6Y \
    mariadb

# Confere se o container está rodando
sudo docker ps

# ---------------------------------------------------------------
# MYSQL WORKBENCH E INSOMNIA (instale no WINDOWS, não na VM)
# ---------------------------------------------------------------
# A VM só tem terminal, então NÃO rode apt install mysql-workbench
# nem snap install insomnia nela. Faça o download para Windows:
#   https://dev.mysql.com/downloads/workbench/
#   https://insomnia.rest/download/
#
# Conectando o Workbench ao MariaDB da VM (sem abrir a porta 3306):
#   Connection Method: Standard TCP/IP over SSH
#   SSH Hostname:      104.155.163.168
#   SSH Username:      jesse
#   SSH Key File:      C:\Users\jesse\.ssh\gcp_key
#   MySQL Hostname:    127.0.0.1
#   MySQL Port:        3306
#   Username:          root
#   Password:          SHA256+NlyOdBELvHKx6Y
#
# Se preferir abrir a 3306 no firewall do Google, limite a origem ao
# 45.161.69.231, nunca 0.0.0.0/0, e troque 127.0.0.1:3306:3306 por 3306:3306.

docker run --restart always -d --name bdmariadb1 -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=SHA256+NlyOdBELvHKx6Y mariadb
