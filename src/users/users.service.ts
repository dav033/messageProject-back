import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { Users } from '../interfaces/users.interface'
import { InjectModel } from '@nestjs/mongoose'
import {
  AuthenticateUserDto,
  RegisterUserDto,
  ReplyUserSubscription,
  SubscribeToRoomDto,
  UserToken
} from './Users.dto'
import { Room } from 'src/interfaces/rooms.interface'
import { PrivateChat } from 'src/interfaces/privateChats.interface'
const jwt = require('jsonwebtoken')
const s3Client = require('../digitalOcean.config')
const { PutObjectCommand } = require('@aws-sdk/client-s3')

// const jwt = require('jsonwebtoken')
@Injectable()
export class UsersService {
  // UsersModel: Model<Users>

  constructor (
    @InjectModel('Users') private UsersModel: Model<Users>,
    @InjectModel('Rooms') private RoomModel: Model<Room>,
    @InjectModel('PrivateChats') private PrivModel: Model<PrivateChat>
  ) {
    console.log('dmmdskm')
  }

  getUsers = async () => {
    const users = await this.UsersModel.find()

    return users
  }

  registerUser = async (
    registerUserDto: RegisterUserDto
  ): Promise<string | UserToken> => {
    const { userName, password, confirmPassword, email } = registerUserDto

    const users = await this.UsersModel.find()
    const user = users.find((user) => user.userName === userName)

    if (password !== confirmPassword) {
      return 'password'
    } else if (user) {
      return 'user'
    } else if (
      userName === '' ||
      password === '' ||
      confirmPassword === '' ||
      email === ''
    ) {
      return 'entries'
    } else {
      const NewUser = new this.UsersModel(registerUserDto)

      const returnUser = await NewUser.save()

      const userForToken = {
        id: returnUser.id,
        userName: returnUser.userName,
        email: returnUser.email,
        rooms: returnUser.rooms,
        profileImage: returnUser.profileImage,
        privateChats: returnUser.privateChats
      }

      const token = jwt.sign(userForToken, process.env.SECRET_WORD, {
        expiresIn: '5h'
      })

      return {
        message: 'Usuario registrado',
        user: {
          id: returnUser.id,
          user: returnUser.userName,
          token,
          rooms: returnUser.rooms,
          profileImage: returnUser.profileImage,
          privateChats: returnUser.privateChats
        }
      }
    }
  }

  getUser = async (id: string) => {
    const user = await this.UsersModel.findById(id)
    return user
  }

  authenticateUser = async (
    authenticateUserDto: AuthenticateUserDto
  ): Promise<string | UserToken> => {
    const { userName, password } = authenticateUserDto

    const userDB = await this.UsersModel.findOne({ userName })

    if (!userDB) {
      return 'user'
    } else if (password === userDB.password) {
      const userForToken = {
        id: userDB.id,
        user: userDB.userName,
        email: userDB.email,
        rooms: userDB.rooms,
        profileImage: userDB.profileImage,
        privateChats: userDB.privateChats
      }

      const token = jwt.sign(userForToken, process.env.SECRET_WORD, {
        expiresIn: '5h'
      })

      console.log('Login', userForToken)

      return {
        message: 'Usuario autenticado',
        user: {
          id: userDB.id,
          user: userDB.userName,
          token,
          rooms: userDB.rooms,
          profileImage: userDB.profileImage,
          privateChats: userDB.privateChats
        }
      }
    } else {
      return 'password'
    }
  }

  verifyToken = async (token: string): Promise<UserToken | string> => {
    try {
      const userJwt = jwt.verify(token, process.env.SECRET_WORD)
      return {
        message: 'token Valido',
        user: {
          id: userJwt.id,
          user: userJwt.userName,
          token,
          rooms: userJwt.rooms,
          profileImage: userJwt.profileImage,
          privateChats: userJwt.privateChats
        }
      }
    } catch (error) {
      return 'error'
    }
  }

  subscribeToRoom = async (
    id: string,
    subscribeToRoomDto: SubscribeToRoomDto
  ): Promise<ReplyUserSubscription> => {
    // console.log(hola)

    const user = await this.UsersModel.findById(id)
    const room = user.rooms.find((room) => room === subscribeToRoomDto.roomId)

    if (room) {
      return {
        message: 'Ya estas subscrito a esta sala',
        succes: false
      }
    } else {
      try {
        await this.UsersModel.findByIdAndUpdate(id, {
          $push: {
            rooms: subscribeToRoomDto.roomId
          }
        })

        await this.RoomModel.findByIdAndUpdate(subscribeToRoomDto.roomId, {
          $push: {
            users: id
          }
        })

        return {
          message: 'Te has subscito correctamente a esta sala',
          succes: true
        }
      } catch (error) {
        return {
          message: 'Hubo un error',
          succes: false
        }
      }
    }
  }

  getAllUsersLessOne = async (id: string) => {
    const users = await this.UsersModel.find({ _id: { $ne: id } })

    return users
  }

  uploadProfileImage = async (id, file) => {
    try {
      console.log(file)
      const bucketParams = {
        Bucket: 'men',
        Body: file.buffer,
        Key: id + file.originalname,
        ACL: 'public-read'
      }

      await s3Client.send(new PutObjectCommand(bucketParams))
      const url = `${process.env.URL}${id + file.originalname}`
      console.log(url)

      await this.UsersModel.findByIdAndUpdate(id, {
        profileImage: url
      })
    } catch (error) {
      console.log(error)
    }
  }

  revalidateUserData = async (id: string) => {
    const user = await this.UsersModel.findById(id)

    return {
      userName: user.userName,
      id: user._id,
      rooms: user.rooms,
      profileImage: user.profileImage
    }
  }
}
