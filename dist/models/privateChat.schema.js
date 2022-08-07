"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateChatSchema = void 0;
const { Schema } = require('mongoose');
exports.privateChatSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user2: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message',
            required: true
        }
    ]
});
//# sourceMappingURL=privateChat.schema.js.map