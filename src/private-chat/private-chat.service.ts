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

  getPrivatesChatByIdGroup = async (idGroup: string[], userId: string) => {
    const chatsAux = []

    for (let i = 0; i < idGroup.length; i++) {
      const chat = await this.PrivChat.findById(idGroup[i])
      const messages = chat.messages

      const auxMessages = await this.modelMessage.find({ room: chat._id })

      const getMessageInformation = async (message) => {
        const messageInfo = await this.modelMessage.findById(message)

        return messageInfo
      }

      for (let j = 0; j < messages.length; j++) {
        getMessageInformation(messages[j]).then(function (response) {
          auxMessages.push(response)
        })

        // console.log(owo)
      }

      const lenghtMessages = messages.length
      let lastMessage = null

      const noReadedMessages = []

      auxMessages.forEach((message) => {
        // console.log(message.usersRead)
        const userRead = message.usersReads
        let aux = false
        userRead.forEach((user) => {
          if (user.toString() === userId) {
            aux = true
          }
        })

        if (!aux) {
          noReadedMessages.push(message)
        }
      })

      console.log(noReadedMessages)

      if (lenghtMessages === 0) {
        chatsAux.push({
          room: chat,
          lastMessage: null,
          lenghtMessages,
          noReadedMessages
        })
      } else {
        lastMessage = messages[lenghtMessages - 1]
        const lastMessageData = await this.modelMessage.findById(lastMessage)

        chatsAux.push({
          room: chat,
          lastMessage: lastMessageData,
          lenghtMessages,
          noReadedMessages
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

  setMessagesReaded = async (roomId: string, userId: string) => {
    try {
      const messagesChat: Message[] = await this.modelMessage.findById({
        room: roomId
      })

      messagesChat.forEach(async (message) => {
        const isTheUserRead = message.usersReads.includes(userId)

        if (!isTheUserRead) {
          await this.modelMessage.findByIdAndUpdate(message._id, {
            $push: { usersReads: userId }
          })
        }
      })
      return { succes: true }
    } catch (err) {
      return { succes: false }
    }
  }
}
