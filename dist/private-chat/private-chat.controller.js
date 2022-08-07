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
exports.PrivateChatController = void 0;
const common_1 = require("@nestjs/common");
const private_chat_service_1 = require("./private-chat.service");
let PrivateChatController = class PrivateChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async hola(res) {
        res.status(common_1.HttpStatus.OK).json({ message: 'owo' });
    }
    async getPrivateChat(id, res) {
        const privateChat = await this.chatService.getPrivateChat(id);
        res.status(common_1.HttpStatus.OK).json({ privateChat });
    }
    async getPrivatesChatByIdGroup({ idGroup, userId }, res) {
        const privatesChat = await this.chatService.getPrivatesChatByIdGroup(idGroup, userId);
        res.status(common_1.HttpStatus.OK).json(privatesChat);
    }
    async createPrivateChat(data, res) {
        const response = await this.chatService.createPrivateChat(data);
        res.status(common_1.HttpStatus.OK).json(response);
    }
    async getOtherUserByChatId({ chatId }, id, res) {
        console.log('chatID', chatId, 'id', id);
        const response = await this.chatService.getOtherUserByChatId(id, chatId);
        res.status(common_1.HttpStatus.OK).json(response);
    }
    async setMessagesReaded({ roomId, userId }, res) {
        const response = await this.chatService.setMessagesReaded(roomId, userId);
        console.log('response:', response);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PrivateChatController.prototype, "hola", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PrivateChatController.prototype, "getPrivateChat", null);
__decorate([
    (0, common_1.Post)('/groupId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PrivateChatController.prototype, "getPrivatesChatByIdGroup", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PrivateChatController.prototype, "createPrivateChat", null);
__decorate([
    (0, common_1.Post)('otherUser/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PrivateChatController.prototype, "getOtherUserByChatId", null);
__decorate([
    (0, common_1.Post)('updateUsersRead'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PrivateChatController.prototype, "setMessagesReaded", null);
PrivateChatController = __decorate([
    (0, common_1.Controller)('private-chat'),
    __metadata("design:paramtypes", [private_chat_service_1.PrivateChatService])
], PrivateChatController);
exports.PrivateChatController = PrivateChatController;
//# sourceMappingURL=private-chat.controller.js.map