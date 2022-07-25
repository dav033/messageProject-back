import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Req,
  RawBodyRequest,
  Param
} from '@nestjs/common'
import { Request } from 'express'

import { CreateRoomDto } from './Room.dto'
import { RoomsService } from './room.service'
@Controller('room')
export class RoomController {
  constructor (private roomsService: RoomsService) {}

  @Get(':id')
  async getRoomById (@Param('id') id: string, @Res() res) {
    const room = await this.roomsService.getRoom(id)
    return res.status(HttpStatus.OK).json(room)
  }

  @Get()
  async getRooms (@Res() res) {
    const rooms = await this.roomsService.getRooms()
    return res.status(HttpStatus.OK).json(rooms)
  }

  @Post()
  async createRoom (@Res() res, @Body('room') room: CreateRoomDto) {
    console.log(room)
    const owo = await this.roomsService.createRoom(room)
    res.status(HttpStatus.OK).json(owo)
  }

  @Post('/groupId')
  async getRoomsByIdGroup (
    @Body() { idGroup, userId },
    @Res() res,
    @Req() req: RawBodyRequest<Request>
  ) {
    const rooms = await this.roomsService.getRoomsByIdGroup(idGroup, userId)

    res.status(HttpStatus.OK).json(rooms)
  }

  @Post('/user')
  async getRoomsLessTheUsersRooms (@Body() { idUser }, @Res() res) {
    const rooms = await this.roomsService.getRoomsLessTheUsersRooms(idUser)

    res.status(HttpStatus.OK).json(rooms)
  }

  @Post('/updateUsersRead')
  async setMessagesReaded (@Body() { roomId, userId }, @Res() res) {
    console.log(roomId, userId)

    const response = await this.roomsService.setMessagesReaded(roomId, userId)

    console.log('response:', response)
  }
}
