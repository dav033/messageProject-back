/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { PrivateChat } from 'src/interfaces/privateChats.interface';
import { Message } from 'src/interfaces/messages.interface';
import { createPrivateChatDto } from './private-chat.dto';
export declare class PrivateChatService {
    private PrivChat;
    private modelMessage;
    constructor(PrivChat: Model<PrivateChat>, modelMessage: Model<Message>);
    getPrivateChat: (id: string) => Promise<PrivateChat & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPrivatesChatByIdGroup: (idGroup: string[], userId: string) => Promise<any[]>;
    createPrivateChat: (data: createPrivateChatDto) => Promise<any>;
    addMessage: (id: any, message: any) => Promise<{
        message: string;
    }>;
    getOtherUserByChatId: (id: any, chatId: any) => Promise<string>;
    setMessagesReaded: (roomId: string, userId: string) => Promise<{
        succes: boolean;
    }>;
}
