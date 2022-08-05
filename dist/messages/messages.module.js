"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesModule = void 0;
const common_1 = require("@nestjs/common");
const message_schema_1 = require("../models/message.schema");
const messages_service_1 = require("./messages.service");
const mongoose_1 = require("@nestjs/mongoose");
const messages_controller_1 = require("./messages.controller");
const users_schema_1 = require("../models/users.schema");
const room_schema_1 = require("../models/room.schema");
const privateChat_schema_1 = require("../models/privateChat.schema");
let MessagesModule = class MessagesModule {
};
MessagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Messages', schema: message_schema_1.MessageSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Users', schema: users_schema_1.userSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Room', schema: room_schema_1.roomSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: 'PrivateChats', schema: privateChat_schema_1.privateChatSchema }
            ])
        ],
        controllers: [messages_controller_1.MessagesController],
        providers: [messages_service_1.MessagesService]
    })
], MessagesModule);
exports.MessagesModule = MessagesModule;
//# sourceMappingURL=messages.module.js.map