import {
  Controller,
  Get,
  HttpStatus,
  Res,
  Param,
  Post,
  Body
} from '@nestjs/common'
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
  constructor (private messageService: MessagesService) {}

  @Get(':id')
  async getMessagesByRoom (@Param('id') id: string, @Res() res) {
    const messages = await this.messageService.getMessagesByRoom(id)
    return res.status(HttpStatus.OK).json(messages)
  }

  @Get('chat/:id')
  async getMessagesByChat (@Param('id') id: string, @Res() res) {
    const messages = await this.messageService.getMessagesByChat(id)
    return res.status(HttpStatus.OK).json(messages)
  }

  @Post()
  async sendMessage (@Body('messageObject') messageObject, @Res() res) {
    const message = await this.messageService.sendMessage(messageObject)

    return res.status(HttpStatus.OK).json(message)
  }
}
