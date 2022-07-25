import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Headers,
  Param,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { AuthenticateUserDto, RegisterUserDto } from './Users.dto'
import { Express } from 'express'
import { UsersService } from './users.service'
import { Users } from 'src/interfaces/users.interface'
import { FileInterceptor } from '@nestjs/platform-express'
require('dotenv').config()
@Controller('users')
export class UsersController {
  constructor (private usersService: UsersService) {}

  @Get()
  async getUsers (@Res() res): Promise<Users[]> {
    const users = await this.usersService.getUsers()

    return res.status(HttpStatus.OK).json({
      users
    })
  }

  @Post('/register')
  async registerUser (@Res() res, @Body() registerUserDto: RegisterUserDto) {
    const user = await this.usersService.registerUser(registerUserDto)

    if (user === 'password') {
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({
        message: 'Las contraseñas no coinciden'
      })
    } else if (user === 'user') {
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({
        message: 'Este usuario ya existe'
      })
    } else if (user === 'entries') {
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({
        message: 'Rellene todos los campos'
      })
    } else if (typeof user !== 'string') {
      return res.status(HttpStatus.OK).json(user)
    }
  }

  @Get(':id')
  async getUser (@Param('id') id: string, @Res() res) {
    const user = await this.usersService.getUser(id)

    return res.status(HttpStatus.OK).json({ user })
  }

  @Post('/login')
  async authenticateUser (
    @Res() res,
    @Body() authenticateUserDto: AuthenticateUserDto
  ) {
    const response = await this.usersService.authenticateUser(
      authenticateUserDto
    )

    if (response === 'user') {
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Usuario no encontrado' })
    } else if (typeof response !== 'string') {
      return res.status(HttpStatus.OK).json(response)
    } else {
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Contraseña incorrecta' })
    }
  }

  @Post(':id/subscribe')
  async subscribeToRoom (
    @Param('id') id: string,
    @Body() SubscribeToRoomDto,
    @Res() res
  ) {
    const response = await this.usersService.subscribeToRoom(
      id,
      SubscribeToRoomDto
    )

    if (response.succes === true) {
      return res.status(HttpStatus.OK).json(response.succes)
    } else {
      return res.status(HttpStatus.NOT_ACCEPTABLE).json(response)
    }
  }

  @Post('/token')
  async verifyToken (@Headers('Authorization') Authorization, @Res() res) {
    const token = Authorization.split(' ')[1]

    const response = await this.usersService.verifyToken(token)

    if (typeof response === 'string') {
      res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json(response)
    } else {
      return response
    }
  }

  @Get('/allUsers/:id')
  async getAllUsersLessOne (@Param('id') id: string, @Res() res) {
    try {
      const users = await this.usersService.getAllUsersLessOne(id)

      return res.status(HttpStatus.OK).json({ users })
    } catch (err) {
      console.log(err)
    }
  }

  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage (
    @UploadedFile('file') file: Express.Multer.File,
    @Param('id') id: string
  ) {
    console.log(file)
    await this.usersService.uploadProfileImage(id, file)
  }

  @Get('/revalidate/:id')
  async revalidateUserData (@Param('id') id: string, @Res() res) {
    const user = await this.usersService.revalidateUserData(id)
    res.status(HttpStatus.OK).json(user)
  }
}
