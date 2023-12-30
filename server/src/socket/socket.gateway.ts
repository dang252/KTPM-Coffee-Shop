import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  WebSocketServer,
  MessageBody,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';
import { NotificationRequest, userConnectRequest } from './dto/create-socket.dto';
// import {
//   userConnectDto,
//   joinClassDto,
//   acceptJoinClass,
//   CreateChatDto,
// } from './dto/create-socket.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly socketService: SocketService) { }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    return this.socketService.getUserDisconnect(this.server, client.id);
  }

  @SubscribeMessage('get_connect')
  startListeners(
    @ConnectedSocket() client: Socket,
    @MessageBody() req: userConnectRequest,
  ) {
    return this.socketService.startListeners(
      this.server,
      client,
      req.username,
      req.userId
    );
  }

  sendNotification(req: NotificationRequest) {
    if (this.server) {
      return this.socketService.sendNotification(this.server, req)
    }
    return false
  }
}
