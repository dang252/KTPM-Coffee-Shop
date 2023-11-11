package main

import (
	"context"
	"log"
	"net"
	"os"

	pb "KTPM-Coffee-Shop/server/api"

	"google.golang.org/grpc"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type OrdersService struct{
	pb.UnimplementedOrdersServiceServer
}

func init() {
	DatabaseConnection()
}

var DB *gorm.DB
var err error

func DatabaseConnection() {
	DB, err = gorm.Open(postgres.Open(os.Getenv("DATABASE_URL")), &gorm.Config{})
	if err != nil {
		log.Fatal("db connection error: ", err)
	}
	log.Println("db connection successful")
}

func (c *OrdersService) GreetingFromOrderService(ctx context.Context, in *pb.EmptyRequest2) (*pb.SimpleOrdersResponse, error){
	res := &pb.SimpleOrdersResponse{
		Message: "Hello from Orders Service",
	}
	return res,nil
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Connection failed: %v", err)
	}
	log.Printf("listening at: %v", lis.Addr())

	s := grpc.NewServer()

	pb.RegisterOrdersServiceServer(s, &OrdersService{})
	// pb.RegisterUserManagementServer(s, &UserManagement{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("grpc server failed: %v", err)
	}
}
