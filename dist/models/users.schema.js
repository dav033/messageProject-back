"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const { Schema } = require('mongoose');
exports.userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rooms: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Room'
        }
    ],
    privateChats: [
        {
            type: Schema.Types.ObjectId,
            ref: 'PrivateChat'
        }
    ],
    profileImage: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});
//# sourceMappingURL=users.schema.js.map