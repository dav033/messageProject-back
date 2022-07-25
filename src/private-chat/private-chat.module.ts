import { Module } from '@nestjs/common'
import { privateChatSchema } from 'src/models/privateChat.schema'
import { PrivateChatService } from './private-chat.service'
import { MongooseModule } from '@nestjs/mongoose'
import { PrivateChatController } from './private-chat.controller'
import { MessageSchema } from 'src/models/message.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PrivateChats', schema: privateChatSchema }
    ]),
    MongooseModule.forFeature([{ name: 'Messages', schema: MessageSchema }])
  ],
  controllers: [PrivateChatController],
  providers: [PrivateChatService]
})
export class PrivateChatModule {}
