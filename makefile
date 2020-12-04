# Prerequisites:
# - node
# - node module make
# - docker

# To get started:
#
# make mysql_up_bi
# make db_create_bi
# make migrate_up

SERVER_NAME = test-bi
BI_ROOT_PASSWORD = password

USER = root
HOST = 127.0.0.1
# HOST = docker.for.mac.localhost
DATABASE = simplewiki
PASSWORD = password
PORT = 6000
MYSQL_PORT = 3306

# SERVER = $(HOST):$(PORT)
# SERVER = docker.for.mac.localhost:
main:
	DB_HOST=$(HOST) \
	DB_USER=$(USER) \
	DB_PASSWORD=$(PASSWORD) \
	DB_DATABASE=$(DATABASE) \
	DB_PORT=$(PORT) \
	npm run start

dev:
	DB_HOST=$(HOST) \
	DB_USER=$(USER) \
	DB_PASSWORD=$(PASSWORD) \
	DB_DATABASE=$(DATABASE) \
	DB_PORT=$(PORT) \
	npm run start:dev

tests:
	DB_HOST=$(HOST) \
	DB_USER=$(USER) \
	DB_PASSWORD=$(PASSWORD) \
	DB_DATABASE=$(DATABASE) \
	DB_PORT=$(PORT) \
	npm run test:watch

# coverage:
# 	DB_HOST=$(HOST) \
# 	DB_USER=$(USER) \
# 	DB_PASSWORD=$(PASSWORD) \
# 	DB_DATABASE=$(DATABASE) \
# 	DB_PORT=$(PORT) \
# 	npm run test:cov -B

# mysql_up_bi:
# 	docker run \
# 		-p $(PORT):3306 \
# 		--name=$(SERVER_NAME) \
# 		-e MYSQL_ROOT_PASSWORD=$(BI_ROOT_PASSWORD) \
# 		-d mysql:8.0.19


# mysql_down_bi:
# 	 docker stop $(SERVER_NAME)
# 	 docker rm $(SERVER_NAME)


# db_create_bi:
# 	 docker exec -it test-bi mysql \
#                         -u $(USER) \
#                         -h $(HOST) \
#                         --port $(MYSQL_PORT) \
#                         -p$(PASSWORD) \
#                         -e "create databases $(DATABASE);"

# db_drop_bi:
# 	docker exec -it test-bi mysql \
# 		-u $(USER) \
# 		-h $(HOST) \
# 		--port $(MYSQL_PORT) \
# 		-p$(PASSWORD) \
# 		-e "drop database $(DATABASE)"


# migrate_up:
# 	docker exec -it test-bi mysql \
# 		-u $(USER) \
# 		-h $(HOST) \
# 		--port $(MYSQL_PORT) \
# 		-p$(PASSWORD) \
# 		-e $(create_monthly_reports) 

# create_monthly_reports="CREATE TABLE IF NOT EXISTS bi.monthly_reports (id int AUTO_INCREMENT PRIMARY KEY ,organization_name VARCHAR(35) DEFAULT NULL,application_name VARCHAR(160) DEFAULT NULL,api_name VARCHAR(255) DEFAULT NULL,interval_start_dts datetime DEFAULT NULL,interval_end_dts datetime DEFAULT NULL,usage_count int DEFAULT NULL,success_count int DEFAULT NULL,error_count int DEFAULT NULL,total_resp_time int DEFAULT NULL,min_resp_time int DEFAULT NULL,max_resp_time int DEFAULT NULL,total_success_resp_time int DEFAULT NULL,min_success_resp_time int DEFAULT NULL,max_success_resp_time int DEFAULT NULL,total_error_resp_time int DEFAULT NULL,min_error_resp_time int DEFAULT NULL,max_error_resp_time int DEFAULT NULL,total_req_msg_size int DEFAULT NULL,min_req_msg_size int DEFAULT NULL,max_req_msg_size int DEFAULT NULL,total_resp_msg_size int DEFAULT NULL,gateway_type VARCHAR(10) DEFAULT NULL,gateway_zone VARCHAR(10) DEFAULT NULL,operation_name VARCHAR(100) DEFAULT NULL);"
# drop_monthly_reports="DROP TABLE IF EXISTS bi.monthly_reports"


# migrate_down:
# 	docker exec -it test-bi mysql \
# 		-u $(USER) \
# 		-h $(HOST) \
# 		--port $(MYSQL_PORT) \
# 		-p$(PASSWORD) \
# 		-e $(drop_monthly_reports) 




