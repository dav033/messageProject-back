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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MessagesService = class MessagesService {
    constructor(MessageModel, RoomModel, PrivChatModel, UsersModel) {
        this.MessageModel = MessageModel;
        this.RoomModel = RoomModel;
        this.PrivChatModel = PrivChatModel;
        this.UsersModel = UsersModel;
        this.getMessagesByRoom = async (id) => {
            const messages = await this.MessageModel.find({ room: id });
            return messages;
        };
        this.getMessagesByChat = async (id) => {
            const messages = await this.MessageModel.find({ room: id });
            return messages;
        };
        this.sendMessage = async (messageObject) => {
            const newMessage = new this.MessageModel(messageObject);
            const { context, room, transmitter, receiver, type, content, createdAt } = messageObject;
            console.log(messageObject);
            const saveMessage = async () => {
                let aux = '';
                await newMessage.save().then((message) => {
                    aux = message;
                });
                return aux;
            };
            if (context === 'room') {
                const aux = await saveMessage();
                await this.RoomModel.findByIdAndUpdate(room, {
                    $push: { messages: aux._id }
                });
                return aux;
            }
            else if (context === 'privateChat') {
                const aux = await saveMessage();
                await this.PrivChatModel.findByIdAndUpdate(room, {
                    $push: { messages: aux._id }
                });
                return aux;
            }
            else if (context === 'provitionalChat') {
                const newChat = new this.PrivChatModel({
                    user1: transmitter,
                    user2: receiver,
                    messages: []
                });
                let aux2 = '';
                await newChat.save().then((chat) => {
                    console.log(chat);
                    aux2 = chat._id;
                });
                let aux = '';
                const NewProvisionalChatMessage = new this.MessageModel({
                    type,
                    content,
                    createdAt,
                    transmitter,
                    receiver,
                    context,
                    room: aux2
                });
                await NewProvisionalChatMessage.save().then((message) => {
                    aux = message;
                });
                await this.PrivChatModel.findByIdAndUpdate(aux2, {
                    $push: { messages: aux._id }
                });
                await this.UsersModel.findByIdAndUpdate(transmitter, {
                    $push: { privateChats: aux2 }
                });
                await this.UsersModel.findByIdAndUpdate(receiver, {
                    $push: { privateChats: aux2 }
                });
                return aux;
            }
        };
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Messages')),
    __param(1, (0, mongoose_1.InjectModel)('Room')),
    __param(2, (0, mongoose_1.InjectModel)('PrivateChats')),
    __param(3, (0, mongoose_1.InjectModel)('Users')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map