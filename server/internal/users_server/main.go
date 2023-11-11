package main

import (
	"context"
	"log"
	"net"

	pb "KTPM-Coffee-Shop/server/api"

	"google.golang.org/grpc"
)

type UsersService struct{
	pb.UnimplementedUsersServiceServer
}

// func init() {
// 	DatabaseConnection()
// }

// var DB *gorm.DB
// var err error

// func DatabaseConnection() {
// 	DB, err = gorm.Open(postgres.Open(os.Getenv("DATABASE_URL")), &gorm.Config{})
// 	if err != nil {
// 		log.Fatal("db connection error: ", err)
// 	}
// 	log.Println("db connection successful")
// }

func (c *UsersService) Greeting(ctx context.Context, in *pb.EmptyRequest) (*pb.SimpleResponse, error){
	res := &pb.SimpleResponse{
		Message: "Hello from Users Service",
	}
	return res,nil
}

func main() {
	lis, err := net.Listen("tcp", ":50052")
	if err != nil {
		log.Fatalf("Connection failed: %v", err)
	}
	log.Printf("listening at: %v", lis.Addr())

	s := grpc.NewServer()

	pb.RegisterUsersServiceServer(s, &UsersService{})
	// pb.RegisterUserManagementServer(s, &UserManagement{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("grpc server failed: %v", err)
	}
}
