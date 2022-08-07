import { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { CreateRoomDto } from './Room.dto';
import { RoomsService } from './room.service';
export declare class RoomController {
    private roomsService;
    constructor(roomsService: RoomsService);
    getRoomById(id: string, res: any): Promise<any>;
    getRooms(res: any): Promise<any>;
    createRoom(res: any, room: CreateRoomDto): Promise<void>;
    getRoomsByIdGroup({ idGroup, userId }: {
        idGroup: any;
        userId: any;
    }, res: any, req: RawBodyRequest<Request>): Promise<void>;
    getRoomsLessTheUsersRooms({ idUser }: {
        idUser: any;
    }, res: any): Promise<void>;
    setMessagesReaded({ roomId, userId }: {
        roomId: any;
        userId: any;
    }, res: any): Promise<void>;
}
