include .env 

proto:
	rm -f api/*go
	protoc --go_out=. --go_opt=paths=source_relative \
	--go-grpc_out=. --go-grpc_opt=paths=source_relative \
	--grpc-gateway_out=.\
    --grpc-gateway_opt=paths=source_relative \
	api/*.proto

gateway:
	
	protoc -I . --grpc-gateway_out . \
		--grpc-gateway_opt paths=source_relative \
		--grpc-gateway_opt grpc_api_configuration=path/to/config.yaml \
		--grpc-gateway_opt standalone=true \
		Bankingpb/Golang-gRPC-Banking.proto


order-server:
	go run Internal/Orders/main.go

user-server:
	go run Internal/Users/main.go

client:
	go run Banking_client/main.go

proxy:
	go run Internal/Proxy/proxy.go

migrate-up:
	migrate -path db/migrations -database ${DATABASE_PATH} up

migrate-down:
	migrate -path db/migrations -database ${DATABASE_PATH} down