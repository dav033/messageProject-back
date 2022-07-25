import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PrivateChat } from 'src/interfaces/privateChats.interface'
import { Message } from 'src/interfaces/messages.interface'
import { createPrivateChatDto } from './private-chat.dto'

@Injectable()
export class PrivateChatService {
  constructor (
    @InjectModel('PrivateChats') private PrivChat: Model<PrivateChat>,
    @InjectModel('Messages') private modelMessage: Model<Message>
  ) {}

  getPrivateChat = async (id: string) => {
    const privateChat = await this.PrivChat.findById(id)
    return privateChat
  }

  getPrivatesChatByIdGroup = async (idGroup: string[]) => {
    const chatsAux = []

    for (let i = 0; i < idGroup.length; i++) {
      const chat = await this.PrivChat.findById(idGroup[i])
      const messages = chat.messages
      const lenghtMessages = messages.length
      let lastMessage = null
      if (lenghtMessages === 0) {
        chatsAux.push({
          room: chat,
          lastMessage: null,
          lenghtMessages
        })
      } else {
        lastMessage = messages[lenghtMessages - 1]
        const lastMessageData = await this.modelMessage.findById(lastMessage)

        chatsAux.push({
          room: chat,
          lastMessage: lastMessageData,
          lenghtMessages
        })
      }
    }
    return chatsAux
  }

  createPrivateChat = async (data: createPrivateChatDto) => {
    const newPrivateChat = new this.PrivChat(data)
    let aux: any = ''
    await newPrivateChat.save().then((chat) => {
      aux = chat
    })
    return aux
  }

  addMessage = async (id, message) => {
    await this.PrivChat.findByIdAndUpdate(id, {
      $push: { messages: message }
    })

    return { message: 'Mensaje agregado' }
  }

  getOtherUserByChatId = async (id, chatId) => {
    const chat = await this.PrivChat.findById(chatId)
    const { user1, user2 } = chat

    let aux = ''
    if ((id = user1)) {
      aux = user2
    } else {
      aux = user1
    }

    return aux
  }
}
