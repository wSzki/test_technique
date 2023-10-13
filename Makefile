
# ==============================================================================
# --------------------------------- VARIABLES ----------------------------------
# ==============================================================================

# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
# DOCKER
# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

# prod | dev
PROD           = 0
PAYLOAD_URL    = http://localhost:3000
NEXT_URL       = http://localhost:3001
UMAMI_URL      = https://analytics.wszki.studio/share/ikHNgSmuLe7R13w3/Wszki
ENV_DEST       = ./app/.env
PAYLOAD_SECRET = HmFYE0DRxtkVOf15s2qYEuKwbEcFgdxJE1bfYRLvGjirw20dpY00mQliThAi
PAYLOAD_PORT   = 3000:3000
NEXT_PORT      = 9999:9999

ifeq (${PROD}, 1)
	NODE_ENV        = production
	PAYLOAD_COMMAND = yarn && yarn global add copyfiles && yarn build && yarn serve
	NEXT_COMMAND    = yarn && yarn build && yarn start
else
	NODE_ENV        = development
	PAYLOAD_COMMAND = yarn && yarn generate:types && yarn dev
	NEXT_COMMAND    = yarn && yarn dev
endif

# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
# VPS
# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

VPS_HOSTNAME      = host
VPS_TIMEZONE      = Europe/Paris
VPS_IP            = 45.13.225.125
VPS_GATEWAY       = 45.13.225.1
VPS_NET_INTERFACE = ens18
VPS_DISK          = /dev/sda
VPS_PASSWORD      = "***********"

DCOMP             = docker-compose -f ./app/docker-compose.yml

# ==============================================================================
# ----------------------------------- RULES ------------------------------------
# ==============================================================================

all:
	@echo "NODE_ENV=${NODE_ENV}"               >  ${ENV_DEST}
	@echo "PAYLOAD_URL=${PAYLOAD_URL}"         >> ${ENV_DEST}
	@echo "NEXT_URL=${NEXT_URL}"               >> ${ENV_DEST}
	@echo "UMAMI_URL=${UMAMI_URL}"             >> ${ENV_DEST}
	@echo "PAYLOAD_COMMAND=${PAYLOAD_COMMAND}" >> ${ENV_DEST}
	@echo "PAYLOAD_SECRET=${PAYLOAD_SECRET}"   >> ${ENV_DEST}
	@echo "NEXT_COMMAND=${NEXT_COMMAND}"       >> ${ENV_DEST}
	@echo "NEXT_PORT=${NEXT_PORT}"             >> ${ENV_DEST}
	@echo "PAYLOAD_PORT=${PAYLOAD_PORT}"       >> ${ENV_DEST}
	@${DCOMP} up -d
	@${DCOMP} logs -f

logs :
	@${DCOMP} logs -f

down:
	@${DCOMP} down

clean:
	@${DCOMP} down --rmi all --volumes --remove-orphans

payload_dump:
	docker exec -it your_mongodb_container_name mongodump --db your_database_name --out /backup

re: down all

generate_secret:
	@echo $$(openssl rand -base64 48 | tr -dc 'a-zA-Z0-9' | head -c 60)

keygen : 
	@ssh-keygen -t rsa -b 4096 -C "id"
	@cat ~/.ssh/id_rsa.pub
	@echo "Add this key to your github repository, in the deploy key section"

stop_all_docker:
	@docker stop $$(docker ps -aq)

rm_all_docker: docker_stop_all
	@docker rm $$(docker ps -aq)

init_vps :
	@export NIX_IP=${VPS_IP}                         && \
		export NIX_GATEWAY=${VPS_GATEWAY}            && \
		export NIX_INTERFACE=${VPS_NET_INTERFACE}    && \
		export NIX_DISK=${VPS_DISK}                  && \
		export NIX_PASSWORD=${VPS_PASSWORD}          && \
		export NIX_HOSTNAME=${VPS_HOSTNAME}          && \
		export NIX_TIMEZONE=${VPS_TIMEZONE}          && \
		export NIX_WHITELIST=$$(curl -s ifconfig.me) && \
		./nixos/write

