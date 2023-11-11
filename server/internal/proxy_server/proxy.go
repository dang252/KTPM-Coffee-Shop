package main

import (
	"context"
	"flag"
	"log"
	"net/http"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/grpclog"

	pb "KTPM-Coffee-Shop/server/api"
)

var (
	// command-line options:
	// gRPC server endpoint
	UsersServerEndpoint = flag.String("Users-server-endpoint", "localhost:50052", "Users server endpoint")
	OrdersServerEndpoint = flag.String("Orders-server-endpoint", "localhost:50051", "Orders server endpoint")
)

func run() error {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	// Register gRPC server endpoint
	// Note: Make sure the gRPC server is running properly and accessible
	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())}
	log.Println("proxy running")
	errUsersService := pb.RegisterUsersServiceHandlerFromEndpoint(ctx, mux, *UsersServerEndpoint, opts)
	if errUsersService != nil {
		return errUsersService
	}
	errOrdersService := pb.RegisterOrdersServiceHandlerFromEndpoint(ctx, mux, *OrdersServerEndpoint, opts)
	if errOrdersService != nil {
		return errOrdersService
	}
	// Start HTTP server (and proxy calls to gRPC server endpoint)
	return http.ListenAndServe(":8081", mux)
}

func main() {
	flag.Parse()

	if err := run(); err != nil {
		grpclog.Fatal(err)
	}
}
