import { MessagesService } from './messages.service';
export declare class MessagesController {
    private messageService;
    constructor(messageService: MessagesService);
    getMessagesByRoom(id: string, res: any): Promise<any>;
    getMessagesByChat(id: string, res: any): Promise<any>;
    sendMessage(messageObject: any, res: any): Promise<any>;
}
