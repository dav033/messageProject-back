import { Module } from '@nestjs/common'
import { MessageSchema } from 'src/models/message.schema'
import { MessagesService } from './messages.service'
import { MongooseModule } from '@nestjs/mongoose'
import { MessagesController } from './messages.controller'
import { userSchema } from 'src/models/users.schema'
import { roomSchema } from 'src/models/room.schema'
import { privateChatSchema } from 'src/models/privateChat.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Messages', schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: 'Users', schema: userSchema }]),
    MongooseModule.forFeature([{ name: 'Room', schema: roomSchema }]),
    MongooseModule.forFeature([
      { name: 'PrivateChats', schema: privateChatSchema }
    ])
  ],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
