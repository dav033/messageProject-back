import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Message } from 'src/interfaces/messages.interface'
import { PrivateChat } from 'src/interfaces/privateChats.interface'
import { Room } from 'src/interfaces/rooms.interface'
import { Users } from 'src/interfaces/users.interface'

@Injectable()
export class MessagesService {
  constructor (
    @InjectModel('Messages') private MessageModel: Model<Message>,
    @InjectModel('Room') private RoomModel: Model<Room>,
    @InjectModel('PrivateChats') private PrivChatModel: Model<PrivateChat>,
    @InjectModel('Users') private UsersModel: Model<Users>
  ) {}

  getMessagesByRoom = async (id: string) => {
    const messages = await this.MessageModel.find({ room: id })
    return messages
  }

  getMessagesByChat = async (id: string) => {
    const messages = await this.MessageModel.find({ room: id })
    return messages
  }

  sendMessage = async (messageObject) => {
    const newMessage = new this.MessageModel(messageObject)
    const { context, room, transmitter, receiver, type, content, createdAt } =
      messageObject

    console.log(messageObject)

    const saveMessage = async () => {
      let aux: any = ''

      await newMessage.save().then((message) => {
        aux = message
      })

      return aux
    }

    if (context === 'room') {
      const aux = await saveMessage()
      await this.RoomModel.findByIdAndUpdate(room, {
        $push: { messages: aux._id }
      })
      return aux
    } else if (context === 'privateChat') {
      const aux = await saveMessage()
      await this.PrivChatModel.findByIdAndUpdate(room, {
        $push: { messages: aux._id }
      })
      return aux
    } else if (context === 'provitionalChat') {
      const newChat = new this.PrivChatModel({
        user1: transmitter,
        user2: receiver,
        messages: []
      })
      let aux2 = ''
      await newChat.save().then((chat) => {
        console.log(chat)
        aux2 = chat._id
      })

      let aux: any = ''

      const NewProvisionalChatMessage = new this.MessageModel({
        type,
        content,
        createdAt,
        transmitter,
        receiver,
        context,
        room: aux2
      })

      await NewProvisionalChatMessage.save().then((message) => {
        aux = message
      })

      await this.PrivChatModel.findByIdAndUpdate(aux2, {
        $push: { messages: aux._id }
      })

      await this.UsersModel.findByIdAndUpdate(transmitter, {
        $push: { privateChats: aux2 }
      })

      await this.UsersModel.findByIdAndUpdate(receiver, {
        $push: { privateChats: aux2 }
      })

      return aux
    }
  }
}
