"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const Room_dto_1 = require("./Room.dto");
const room_service_1 = require("./room.service");
let RoomController = class RoomController {
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    async getRoomById(id, res) {
        const room = await this.roomsService.getRoom(id);
        return res.status(common_1.HttpStatus.OK).json(room);
    }
    async getRooms(res) {
        const rooms = await this.roomsService.getRooms();
        return res.status(common_1.HttpStatus.OK).json(rooms);
    }
    async createRoom(res, room) {
        console.log(room);
        const owo = await this.roomsService.createRoom(room);
        res.status(common_1.HttpStatus.OK).json(owo);
    }
    async getRoomsByIdGroup({ idGroup, userId }, res, req) {
        const rooms = await this.roomsService.getRoomsByIdGroup(idGroup, userId);
        res.status(common_1.HttpStatus.OK).json(rooms);
    }
    async getRoomsLessTheUsersRooms({ idUser }, res) {
        const rooms = await this.roomsService.getRoomsLessTheUsersRooms(idUser);
        res.status(common_1.HttpStatus.OK).json(rooms);
    }
    async setMessagesReaded({ roomId, userId }, res) {
        console.log(roomId, userId);
        const response = await this.roomsService.setMessagesReaded(roomId, userId);
        console.log('response:', response);
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoomById", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRooms", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)('room')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Post)('/groupId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoomsByIdGroup", null);
__decorate([
    (0, common_1.Post)('/user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoomsLessTheUsersRooms", null);
__decorate([
    (0, common_1.Post)('/updateUsersRead'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "setMessagesReaded", null);
RoomController = __decorate([
    (0, common_1.Controller)('room'),
    __metadata("design:paramtypes", [room_service_1.RoomsService])
], RoomController);
exports.RoomController = RoomController;
//# sourceMappingURL=room.controller.js.map