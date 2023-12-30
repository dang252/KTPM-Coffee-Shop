import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { v4 } from 'uuid';
import { NotificationRequest } from './dto/create-socket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from 'src/promotion/entities/promotion.entity';


@Injectable()
export class SocketService {
  users: { uid: string; clientId: string; username: string, userId: number }[] = [];
  clientToUser = {};
  userJoinedList = [];

  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) { }


  async findPendignMessageOfUserId(userId: number) {
    return this.messageRepository.findBy({
      userId: userId,
      status: "PENDING"
    })
  }

  async updateMessageStatusById(messageId: number, status: string) {
    const message = await this.messageRepository.findOneBy({ messageId: messageId })
    message.status = status;
    this.messageRepository.save(message)
  }

  getUidFromUsername = (username: string) => {
    const existUser = this.users.filter((user) => {
      return user.username === username;
    });

    if (existUser.length !== 0) return true;
    else return false;
  };

  getConnectUserAmount(server: Server) {
    server.emit('connect_users_amount', this.users.length);

    return this.users.length;
  }

  checkExistJoined(clientId: string, name: string, room: string) {
    // console.log('OK1:', clientId, name, room);

    // eslint-disable-next-line no-var
    for (var i = 0; i < this.userJoinedList.length; ++i) {
      if (
        this.userJoinedList[i].name === name &&
        this.userJoinedList[i].clientId === clientId &&
        this.userJoinedList[i].room === room
      ) {
        return true;
      }

      if (
        this.userJoinedList[i].name === name &&
        this.userJoinedList[i].clientId !== clientId &&
        this.userJoinedList[i].room === room
      ) {
        this.userJoinedList[i].clientId = clientId;
        return true;
      }
    }

    return false;
  }

  startListeners(server: Server, client: Socket, username: string, userId: number) {
    console.log('Message received from ' + client.id + " " + userId + " " + username);

    const checkUser = this.getUidFromUsername(username);

    if (checkUser) {
      // Send event to client
      server.to(client.id).emit('user_exist', 'Username is exist');

      this.getConnectUserAmount(server);

      // console.log(this.users);

      return false;
    } else {
      const uid = v4();

      this.users.push({
        uid: uid,
        clientId: client.id,
        username: username,
        userId: userId,
      });

      // Send event to client
      server
        .to(client.id)
        .emit('user_connected', { clientId: client.id, uid: uid });

      // console.log(this.users);

      this.getConnectUserAmount(server);
      this.sendPendingNotification(server, userId)
      return true;
    }
  }

  getUserDisconnect(server: Server, clientId: string) {
    const findUser = this.users.filter((user) => {
      return user.clientId === clientId;
    });

    this.users = this.users.filter((user) => {
      return user.clientId !== clientId;
    });

    this.userJoinedList = this.userJoinedList.filter((user) => {
      return user.clientId !== clientId;
    });

    // console.log('Check joined: ', this.userJoinedList);

    // Send event to client
    server.emit('user_disconnect', findUser[0]);

    console.log('Client disconnected:', clientId);

    server.emit('connect_users_amount', this.users.length);

    // console.log(this.users);
  }

  getClientIdFromUserId(userId: number) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].userId == userId) {
        return this.users[i].clientId
      }
    }
    return ""
  }
  sendNotification(server: Server, req: NotificationRequest): boolean {
    //find client
    const clientId = this.getClientIdFromUserId(req.userId);
    if (clientId != "") {
      server.to(clientId).emit('promotion_notification', {
        message: req.message,
        date: req.createdAt
      })
      return true
    } else {
      return false
    }

  }
  async sendPendingNotification(server: Server, userId: number) {
    const pendingMSGs = await this.findPendignMessageOfUserId(userId);
    pendingMSGs.map((msg) => {
      const canSendNoti = this.sendNotification(server, {
        userId: msg.userId,
        message: msg.messageInfo,
        type: 'promotion',
        createdAt: msg.createdAt,
      })
      if (canSendNoti) {
        this.updateMessageStatusById(msg.messageId, "SENDED")
      }
    })
  }
}
