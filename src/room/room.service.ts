import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Room } from 'src/interfaces/rooms.interface'
import { CreateRoomDto } from './Room.dto'
import { Users } from '../interfaces/users.interface'
import { Message } from 'src/interfaces/messages.interface'

interface Hola {
  room: Room
  lastMessage: Message | null
  lenghtMessages: number
  noReadedMessages: Message[] | null
}

@Injectable()
export class RoomsService {
  constructor (
    @InjectModel('Room') private RoomModel: Model<Room>,
    @InjectModel('Users') private UsersModel: Model<Users>,
    @InjectModel('Messages') private MessagesModel: Model<Message>
  ) {}

  getRoom = async (id: string) => {
    const room = await this.RoomModel.findById(id)
    return room
  }

  getRooms = async () => {
    const rooms = await this.RoomModel.find()
    return rooms
  }

  createRoom = async (room: CreateRoomDto): Promise<string> => {
    console.log(room.creator)
    const newRoom = new this.RoomModel(room)
    let aux: string = ''
    await newRoom.save().then((room) => {
      aux = room._id
    })

    await this.UsersModel.findByIdAndUpdate(room.creator, {
      $push: { rooms: aux }
    })

    return aux
  }

  getRoomsByIdGroup = async (idGroup: string[], userId: string) => {
    const roomAux: Hola[] = []

    for (let i = 0; i < idGroup.length; i++) {
      const room = await this.RoomModel.findById(idGroup[i])

      const auxMessages = await this.MessagesModel.find({ room: room._id })

      const messages = room.messages

      const getMessageInformation = async (message) => {
        const messageInfo = await this.MessagesModel.findById(message)

        return messageInfo
      }

      for (let i = 0; i < messages.length; i++) {
        getMessageInformation(messages[i]).then(function (response) {
          auxMessages.push(response)
        })

        // console.log(owo)
      }

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

      console.log(noReadedMessages.length)
      const lenghtMessages: number = messages.length
      let lastMessage = null
      if (lenghtMessages === 0) {
        roomAux.push({
          room,
          lastMessage,
          lenghtMessages,
          noReadedMessages
        })
      } else {
        lastMessage = messages[lenghtMessages - 1]
        const lastMessageData = await this.MessagesModel.findById(lastMessage)

        roomAux.push({
          room,
          lastMessage: lastMessageData,
          lenghtMessages,
          noReadedMessages
        })
      }
    }
    return roomAux
  }

  getRoomsLessTheUsersRooms = async (id: string) => {
    const roomAux: Room[] = []

    const user = await this.UsersModel.findById(id)
    const rooms = await this.RoomModel.find()

    for (let i = 0; i < rooms.length; i++) {
      if (user.rooms.indexOf(rooms[i]._id) === -1) {
        roomAux.push(rooms[i])
      }
    }
    return roomAux
  }

  setMessagesReaded = async (roomId: string, userId: string) => {
    // const room = await this.UsersModel.findById(roomId)

    try {
      const messagesRoom = await this.MessagesModel.find({ room: roomId })

      messagesRoom.forEach(async (message) => {
        const isTheUserRead = message.usersReads.includes(userId)

        if (!isTheUserRead) {
          await this.MessagesModel.findByIdAndUpdate(message._id, {
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
