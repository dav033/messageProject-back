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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let usersList = [];
let EventsGateway = class EventsGateway {
    afterInit(server) {
        console.log('Esto se ejecuta cuando inicia');
    }
    handleConnection(client, id) {
        console.log('Hola alguien se conecto al socket 👌👌👌');
    }
    handleDisconnect(client) {
        console.log('ALguien se fue! chao chao');
        usersList = usersList.filter((user) => user.socket_id !== client.id);
        this.server.emit('usersList', usersList);
    }
    handleJoinRoom(client, room) {
        client.join(room);
        console.log('usuario conectado a la sala ', room);
    }
    handleUserConnection(client, id) {
        console.log(client.id, id);
        this.server.to(client.id).emit('identifier', client.id);
        usersList.push({ user_id: id, socket_id: client.id });
        console.log(usersList);
        this.server.emit('usersList', usersList);
    }
    handleRefresh(client, receiverS) {
        console.log('ppwPWPWPWPP', receiverS);
        this.server.to(receiverS).emit('refresh');
    }
    handleSendMessage(client, data) {
        const { content, transmitter, context, room, createdAt } = data;
        this.server.to(room).emit('message', {
            content,
            transmitter,
            context,
            room,
            createdAt
        });
    }
    handleSendMessageToPrivateCahat(data) {
        const { content, transmitter, context, room, createdAt } = data;
        this.server.to(room).emit('privateMessage', {
            content,
            transmitter,
            context,
            room,
            createdAt
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('conectado'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleUserConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('refreshReceiver'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleRefresh", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessageToRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessageToprivateChat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleSendMessageToPrivateCahat", null);
EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(80, {
        cors: {
            origin: '*'
        }
    })
], EventsGateway);
exports.EventsGateway = EventsGateway;
//# sourceMappingURL=events.gateway.js.map