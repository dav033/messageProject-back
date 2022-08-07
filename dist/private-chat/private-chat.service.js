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
exports.PrivateChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PrivateChatService = class PrivateChatService {
    constructor(PrivChat, modelMessage) {
        this.PrivChat = PrivChat;
        this.modelMessage = modelMessage;
        this.getPrivateChat = async (id) => {
            const privateChat = await this.PrivChat.findById(id);
            return privateChat;
        };
        this.getPrivatesChatByIdGroup = async (idGroup, userId) => {
            const chatsAux = [];
            for (let i = 0; i < idGroup.length; i++) {
                const chat = await this.PrivChat.findById(idGroup[i]);
                const messages = chat.messages;
                const auxMessages = await this.modelMessage.find({ room: chat._id });
                const getMessageInformation = async (message) => {
                    const messageInfo = await this.modelMessage.findById(message);
                    return messageInfo;
                };
                for (let j = 0; j < messages.length; j++) {
                    getMessageInformation(messages[j]).then(function (response) {
                        auxMessages.push(response);
                    });
                }
                const lenghtMessages = messages.length;
                let lastMessage = null;
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
                console.log(noReadedMessages);
                if (lenghtMessages === 0) {
                    chatsAux.push({
                        room: chat,
                        lastMessage: null,
                        lenghtMessages,
                        noReadedMessages
                    });
                }
                else {
                    lastMessage = messages[lenghtMessages - 1];
                    const lastMessageData = await this.modelMessage.findById(lastMessage);
                    chatsAux.push({
                        room: chat,
                        lastMessage: lastMessageData,
                        lenghtMessages,
                        noReadedMessages
                    });
                }
            }
            return chatsAux;
        };
        this.createPrivateChat = async (data) => {
            const newPrivateChat = new this.PrivChat(data);
            let aux = '';
            await newPrivateChat.save().then((chat) => {
                aux = chat;
            });
            return aux;
        };
        this.addMessage = async (id, message) => {
            await this.PrivChat.findByIdAndUpdate(id, {
                $push: { messages: message }
            });
            return { message: 'Mensaje agregado' };
        };
        this.getOtherUserByChatId = async (id, chatId) => {
            const chat = await this.PrivChat.findById(chatId);
            const { user1, user2 } = chat;
            let aux = '';
            if ((id = user1)) {
                aux = user2;
            }
            else {
                aux = user1;
            }
            return aux;
        };
        this.setMessagesReaded = async (roomId, userId) => {
            try {
                const messagesChat = await this.modelMessage.findById({
                    room: roomId
                });
                messagesChat.forEach(async (message) => {
                    const isTheUserRead = message.usersReads.includes(userId);
                    if (!isTheUserRead) {
                        await this.modelMessage.findByIdAndUpdate(message._id, {
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
PrivateChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('PrivateChats')),
    __param(1, (0, mongoose_1.InjectModel)('Messages')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PrivateChatService);
exports.PrivateChatService = PrivateChatService;
//# sourceMappingURL=private-chat.service.js.map