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
import { Room } from 'src/interfaces/rooms.interface';
import { CreateRoomDto } from './Room.dto';
import { Users } from '../interfaces/users.interface';
import { Message } from 'src/interfaces/messages.interface';
interface Hola {
    room: Room;
    lastMessage: Message | null;
    lenghtMessages: number;
    noReadedMessages: Message[] | null;
}
export declare class RoomsService {
    private RoomModel;
    private UsersModel;
    private MessagesModel;
    constructor(RoomModel: Model<Room>, UsersModel: Model<Users>, MessagesModel: Model<Message>);
    getRoom: (id: string) => Promise<Room & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getRooms: () => Promise<(Room & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    createRoom: (room: CreateRoomDto) => Promise<string>;
    getRoomsByIdGroup: (idGroup: string[], userId: string) => Promise<Hola[]>;
    getRoomsLessTheUsersRooms: (id: string) => Promise<Room[]>;
    setMessagesReaded: (roomId: string, userId: string) => Promise<{
        succes: boolean;
    }>;
}
export {};
