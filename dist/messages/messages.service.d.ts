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
import { Message } from 'src/interfaces/messages.interface';
import { PrivateChat } from 'src/interfaces/privateChats.interface';
import { Room } from 'src/interfaces/rooms.interface';
import { Users } from 'src/interfaces/users.interface';
export declare class MessagesService {
    private MessageModel;
    private RoomModel;
    private PrivChatModel;
    private UsersModel;
    constructor(MessageModel: Model<Message>, RoomModel: Model<Room>, PrivChatModel: Model<PrivateChat>, UsersModel: Model<Users>);
    getMessagesByRoom: (id: string) => Promise<(Message & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getMessagesByChat: (id: string) => Promise<(Message & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    sendMessage: (messageObject: any) => Promise<any>;
}
