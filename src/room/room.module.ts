import { Module } from '@nestjs/common'
import { RoomController } from './room.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { roomSchema } from 'src/models/room.schema'
import { RoomsService } from './room.service'
import { userSchema } from 'src/models/users.schema'
import { MessageSchema } from 'src/models/message.schema'
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Room', schema: roomSchema }]),
    MongooseModule.forFeature([{ name: 'Users', schema: userSchema }]),
    MongooseModule.forFeature([{ name: 'Messages', schema: MessageSchema }])
  ],
  controllers: [RoomController],
  providers: [RoomsService]
})
export class RoomModule {}
