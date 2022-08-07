"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateChatModule = void 0;
const common_1 = require("@nestjs/common");
const privateChat_schema_1 = require("../models/privateChat.schema");
const private_chat_service_1 = require("./private-chat.service");
const mongoose_1 = require("@nestjs/mongoose");
const private_chat_controller_1 = require("./private-chat.controller");
const message_schema_1 = require("../models/message.schema");
let PrivateChatModule = class PrivateChatModule {
};
PrivateChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'PrivateChats', schema: privateChat_schema_1.privateChatSchema }
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Messages', schema: message_schema_1.MessageSchema }])
        ],
        controllers: [private_chat_controller_1.PrivateChatController],
        providers: [private_chat_service_1.PrivateChatService]
    })
], PrivateChatModule);
exports.PrivateChatModule = PrivateChatModule;
//# sourceMappingURL=private-chat.module.js.map