import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
const usersList = []

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
    server

  @SubscribeMessage('message')
  handleMessage (@MessageBody() message: string): void {
    this.server.emit('message', message)
  }
}
