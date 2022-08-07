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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const jwt = require('jsonwebtoken');
const s3Client = require('../digitalOcean.config');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
let UsersService = class UsersService {
    constructor(UsersModel, RoomModel, PrivModel) {
        this.UsersModel = UsersModel;
        this.RoomModel = RoomModel;
        this.PrivModel = PrivModel;
        this.getUsers = async () => {
            const users = await this.UsersModel.find();
            return users;
        };
        this.registerUser = async (registerUserDto) => {
            const { userName, password, confirmPassword, email } = registerUserDto;
            const users = await this.UsersModel.find();
            const user = users.find((user) => user.userName === userName);
            if (password !== confirmPassword) {
                return 'password';
            }
            else if (user) {
                return 'user';
            }
            else if (userName === '' ||
                password === '' ||
                confirmPassword === '' ||
                email === '') {
                return 'entries';
            }
            else {
                const NewUser = new this.UsersModel(registerUserDto);
                const returnUser = await NewUser.save();
                const userForToken = {
                    id: returnUser.id,
                    userName: returnUser.userName,
                    email: returnUser.email,
                    rooms: returnUser.rooms,
                    profileImage: returnUser.profileImage,
                    privateChats: returnUser.privateChats
                };
                const token = jwt.sign(userForToken, process.env.SECRET_WORD, {
                    expiresIn: '5h'
                });
                return {
                    message: 'Usuario registrado',
                    user: {
                        id: returnUser.id,
                        user: returnUser.userName,
                        token,
                        rooms: returnUser.rooms,
                        profileImage: returnUser.profileImage,
                        privateChats: returnUser.privateChats
                    }
                };
            }
        };
        this.getUser = async (id) => {
            const user = await this.UsersModel.findById(id);
            return user;
        };
        this.authenticateUser = async (authenticateUserDto) => {
            const { userName, password } = authenticateUserDto;
            const userDB = await this.UsersModel.findOne({ userName });
            if (!userDB) {
                return 'user';
            }
            else if (password === userDB.password) {
                const userForToken = {
                    id: userDB.id,
                    user: userDB.userName,
                    email: userDB.email,
                    rooms: userDB.rooms,
                    profileImage: userDB.profileImage,
                    privateChats: userDB.privateChats
                };
                const token = jwt.sign(userForToken, process.env.SECRET_WORD, {
                    expiresIn: '5h'
                });
                console.log('Login', userForToken);
                return {
                    message: 'Usuario autenticado',
                    user: {
                        id: userDB.id,
                        user: userDB.userName,
                        token,
                        rooms: userDB.rooms,
                        profileImage: userDB.profileImage,
                        privateChats: userDB.privateChats
                    }
                };
            }
            else {
                return 'password';
            }
        };
        this.verifyToken = async (token) => {
            try {
                const userJwt = jwt.verify(token, process.env.SECRET_WORD);
                return {
                    message: 'token Valido',
                    user: {
                        id: userJwt.id,
                        user: userJwt.userName,
                        token,
                        rooms: userJwt.rooms,
                        profileImage: userJwt.profileImage,
                        privateChats: userJwt.privateChats
                    }
                };
            }
            catch (error) {
                return 'error';
            }
        };
        this.subscribeToRoom = async (id, subscribeToRoomDto) => {
            const user = await this.UsersModel.findById(id);
            const room = user.rooms.find((room) => room === subscribeToRoomDto.roomId);
            if (room) {
                return {
                    message: 'Ya estas subscrito a esta sala',
                    succes: false
                };
            }
            else {
                try {
                    await this.UsersModel.findByIdAndUpdate(id, {
                        $push: {
                            rooms: subscribeToRoomDto.roomId
                        }
                    });
                    await this.RoomModel.findByIdAndUpdate(subscribeToRoomDto.roomId, {
                        $push: {
                            users: id
                        }
                    });
                    return {
                        message: 'Te has subscito correctamente a esta sala',
                        succes: true
                    };
                }
                catch (error) {
                    return {
                        message: 'Hubo un error',
                        succes: false
                    };
                }
            }
        };
        this.getAllUsersLessOne = async (id) => {
            const users = await this.UsersModel.find({ _id: { $ne: id } });
            return users;
        };
        this.uploadProfileImage = async (id, file) => {
            try {
                console.log(file);
                const bucketParams = {
                    Bucket: 'men',
                    Body: file.buffer,
                    Key: id + file.originalname,
                    ACL: 'public-read'
                };
                await s3Client.send(new PutObjectCommand(bucketParams));
                const url = `${process.env.URL}${id + file.originalname}`;
                console.log(url);
                await this.UsersModel.findByIdAndUpdate(id, {
                    profileImage: url
                });
            }
            catch (error) {
                console.log(error);
            }
        };
        this.revalidateUserData = async (id) => {
            const user = await this.UsersModel.findById(id);
            return {
                userName: user.userName,
                id: user._id,
                rooms: user.rooms,
                profileImage: user.profileImage
            };
        };
        console.log('dmmdskm');
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Users')),
    __param(1, (0, mongoose_2.InjectModel)('Rooms')),
    __param(2, (0, mongoose_2.InjectModel)('PrivateChats')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map