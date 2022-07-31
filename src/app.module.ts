import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { MongooseModule } from '@nestjs/mongoose'
import { MessagesModule } from './messages/messages.module'
import { RoomModule } from './room/room.module'
import { PrivateChatModule } from './private-chat/private-chat.module'
import { EventsGateway } from './events.gateway'

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://david:clavesegura03@cluster0.61stp41.mongodb.net/?retryWrites=true&w=majority'
    ),
    MessagesModule,
    RoomModule,
    PrivateChatModule
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway]
})
export class AppModule {}
