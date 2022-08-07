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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let RoomsService = class RoomsService {
    constructor(RoomModel, UsersModel, MessagesModel) {
        this.RoomModel = RoomModel;
        this.UsersModel = UsersModel;
        this.MessagesModel = MessagesModel;
        this.getRoom = async (id) => {
            const room = await this.RoomModel.findById(id);
            return room;
        };
        this.getRooms = async () => {
            const rooms = await this.RoomModel.find();
            return rooms;
        };
        this.createRoom = async (room) => {
            console.log(room.creator);
            const newRoom = new this.RoomModel(room);
            let aux = '';
            await newRoom.save().then((room) => {
                aux = room._id;
            });
            await this.UsersModel.findByIdAndUpdate(room.creator, {
                $push: { rooms: aux }
            });
            return aux;
        };
        this.getRoomsByIdGroup = async (idGroup, userId) => {
            const roomAux = [];
            for (let i = 0; i < idGroup.length; i++) {
                const room = await this.RoomModel.findById(idGroup[i]);
                const auxMessages = await this.MessagesModel.find({ room: room._id });
                const messages = room.messages;
                const getMessageInformation = async (message) => {
                    const messageInfo = await this.MessagesModel.findById(message);
                    return messageInfo;
                };
                for (let i = 0; i < messages.length; i++) {
                    getMessageInformation(messages[i]).then(function (response) {
                        auxMessages.push(response);
                    });
                }
                const noReadedMessages = [];
                auxMessages.forEach((message) => {
                    const userRead = message.usersReads;
                    let aux = false;
                    userRead.forEach((user) => {
                        if (user.toString() === userId) {
                            aux = true;
                        }
                    });
                    if (!aux) {
                        noReadedMessages.push(message);
                    }
                });
                console.log(noReadedMessages.length);
                const lenghtMessages = messages.length;
                let lastMessage = null;
                if (lenghtMessages === 0) {
                    roomAux.push({
                        room,
                        lastMessage,
                        lenghtMessages,
                        noReadedMessages
                    });
                }
                else {
                    lastMessage = messages[lenghtMessages - 1];
                    const lastMessageData = await this.MessagesModel.findById(lastMessage);
                    roomAux.push({
                        room,
                        lastMessage: lastMessageData,
                        lenghtMessages,
                        noReadedMessages
                    });
                }
            }
            return roomAux;
        };
        this.getRoomsLessTheUsersRooms = async (id) => {
            const roomAux = [];
            const user = await this.UsersModel.findById(id);
            const rooms = await this.RoomModel.find();
            for (let i = 0; i < rooms.length; i++) {
                if (user.rooms.indexOf(rooms[i]._id) === -1) {
                    roomAux.push(rooms[i]);
                }
            }
            return roomAux;
        };
        this.setMessagesReaded = async (roomId, userId) => {
            try {
                const messagesRoom = await this.MessagesModel.find({ room: roomId });
                messagesRoom.forEach(async (message) => {
                    const isTheUserRead = message.usersReads.includes(userId);
                    if (!isTheUserRead) {
                        await this.MessagesModel.findByIdAndUpdate(message._id, {
                            $push: { usersReads: userId }
                        });
                    }
                });
                return { succes: true };
            }
            catch (err) {
                return { succes: false };
            }
        };
    }
};
RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Room')),
    __param(1, (0, mongoose_1.InjectModel)('Users')),
    __param(2, (0, mongoose_1.InjectModel)('Messages')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=room.service.js.map