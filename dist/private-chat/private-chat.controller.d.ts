import { PrivateChatService } from './private-chat.service';
export declare class PrivateChatController {
    private chatService;
    constructor(chatService: PrivateChatService);
    hola(res: any): Promise<void>;
    getPrivateChat(id: string, res: any): Promise<void>;
    getPrivatesChatByIdGroup({ idGroup, userId }: {
        idGroup: any;
        userId: any;
    }, res: any): Promise<void>;
    createPrivateChat(data: any, res: any): Promise<void>;
    getOtherUserByChatId({ chatId }: {
        chatId: any;
    }, id: string, res: any): Promise<void>;
    setMessagesReaded({ roomId, userId }: {
        roomId: any;
        userId: any;
    }, res: any): Promise<void>;
}
