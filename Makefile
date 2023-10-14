
# ==============================================================================
# --------------------------------- VARIABLES ----------------------------------
# ==============================================================================

# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
# DOCKER
# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

# prod | dev
PROD           = 0
NEXT_URL       = http://localhost:9999
ENV_DEST       = ./app/.env
NEXT_PORT      = 9999:9999

ifeq (${PROD}, 1)
	NODE_ENV        = production
	NEXT_COMMAND    = yarn && yarn build && yarn start
else
	NODE_ENV        = development
	NEXT_COMMAND    = yarn && yarn dev
endif

DCOMP             = docker-compose -f ./app/docker-compose.yml

# ==============================================================================
# ----------------------------------- RULES ------------------------------------
# ==============================================================================

all:
	@echo "NODE_ENV=${NODE_ENV}"               >  ${ENV_DEST}
	@echo "NEXT_URL=${NEXT_URL}"               >> ${ENV_DEST}
	@echo "NEXT_COMMAND=${NEXT_COMMAND}"       >> ${ENV_DEST}
	@echo "NEXT_PORT=${NEXT_PORT}"             >> ${ENV_DEST}
	@${DCOMP} up -d
	@${DCOMP} logs -f

logs :
	@${DCOMP} logs -f

down:
	@${DCOMP} down

clean:
	@${DCOMP} down --rmi all --volumes --remove-orphans

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
