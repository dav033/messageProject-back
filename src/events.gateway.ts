import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
require('dotenv').config()
let usersList = []

@WebSocketGateway({
  cors: { origin: '*', allowedHeaders: '*' },
  transports: ['websocket', 'polling']

  // extraHeaders: { AccessControlAllowOrigin: '*' }
})
export class EventsGateway
implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  afterInit (server: any) {
    console.log('Esto se ejecuta cuando inicia')
  }

  handleConnection (client: any, id) {
    console.log('Hola alguien se conecto al socket 👌👌👌')
  }

  handleDisconnect (client: any) {
    console.log('ALguien se fue! chao chao')
    usersList = usersList.filter((user) => user.socket_id !== client.id)
    this.server.emit('usersList', usersList)
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom (client: Socket, room: string) {
    client.join(room)
    console.log('usuario conectado a la sala ', room)
  }

  @SubscribeMessage('conectado')
  handleUserConnection (client: Socket, id: string) {
    console.log(client.id, id)
    this.server.to(client.id).emit('identifier', client.id)
    usersList.push({ user_id: id, socket_id: client.id })
    console.log(usersList)
    this.server.emit('usersList', usersList)
  }

  @SubscribeMessage('refreshReceiver')
  handleRefresh (client: Socket, receiverS: string) {
    console.log('ppwPWPWPWPP', receiverS)
    this.server.to(receiverS).emit('refresh')
  }

  @SubscribeMessage('sendMessageToRoom')
  handleSendMessage (
    client: Socket,
    data: {
      type: string
      content: string
      transmitter: string
      context: string
      room: string
      createdAt: string
    }
  ) {
    // console.log('ads', data)
    const { content, transmitter, context, room, createdAt } = data

    this.server.to(room).emit('message', {
      content,
      transmitter,
      context,
      room,
      createdAt
    })
  }

  @SubscribeMessage('sendMessageToprivateChat')
  handleSendMessageToPrivateCahat (data: {
    type: string
    content: string
    transmitter: string
    context: string
    room: string
    createdAt: string
  }) {
    const { content, transmitter, context, room, createdAt } = data

    this.server.to(room).emit('privateMessage', {
      content,
      transmitter,
      context,
      room,
      createdAt
    })
  }
}
