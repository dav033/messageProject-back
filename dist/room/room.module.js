"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModule = void 0;
const common_1 = require("@nestjs/common");
const room_controller_1 = require("./room.controller");
const mongoose_1 = require("@nestjs/mongoose");
const room_schema_1 = require("../models/room.schema");
const room_service_1 = require("./room.service");
const users_schema_1 = require("../models/users.schema");
const message_schema_1 = require("../models/message.schema");
let RoomModule = class RoomModule {
};
RoomModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Room', schema: room_schema_1.roomSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Users', schema: users_schema_1.userSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Messages', schema: message_schema_1.MessageSchema }])
        ],
        controllers: [room_controller_1.RoomController],
        providers: [room_service_1.RoomsService]
    })
], RoomModule);
exports.RoomModule = RoomModule;
//# sourceMappingURL=room.module.js.map