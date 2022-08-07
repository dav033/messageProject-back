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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const Users_dto_1 = require("./Users.dto");
const users_service_1 = require("./users.service");
const platform_express_1 = require("@nestjs/platform-express");
require('dotenv').config();
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUsers(res) {
        const users = await this.usersService.getUsers();
        return res.status(common_1.HttpStatus.OK).json({
            users
        });
    }
    async registerUser(res, registerUserDto) {
        const user = await this.usersService.registerUser(registerUserDto);
        if (user === 'password') {
            return res.status(common_1.HttpStatus.NOT_ACCEPTABLE).json({
                message: 'Las contraseñas no coinciden'
            });
        }
        else if (user === 'user') {
            return res.status(common_1.HttpStatus.NOT_ACCEPTABLE).json({
                message: 'Este usuario ya existe'
            });
        }
        else if (user === 'entries') {
            return res.status(common_1.HttpStatus.NOT_ACCEPTABLE).json({
                message: 'Rellene todos los campos'
            });
        }
        else if (typeof user !== 'string') {
            return res.status(common_1.HttpStatus.OK).json(user);
        }
    }
    async getUser(id, res) {
        const user = await this.usersService.getUser(id);
        return res.status(common_1.HttpStatus.OK).json({ user });
    }
    async authenticateUser(res, authenticateUserDto) {
        const response = await this.usersService.authenticateUser(authenticateUserDto);
        if (response === 'user') {
            return res
                .status(common_1.HttpStatus.OK)
                .json({ message: 'Usuario no encontrado' });
        }
        else if (typeof response !== 'string') {
            return res.status(common_1.HttpStatus.OK).json(response);
        }
        else {
            return res
                .status(common_1.HttpStatus.OK)
                .json({ message: 'Contraseña incorrecta' });
        }
    }
    async subscribeToRoom(id, SubscribeToRoomDto, res) {
        const response = await this.usersService.subscribeToRoom(id, SubscribeToRoomDto);
        if (response.succes === true) {
            return res.status(common_1.HttpStatus.OK).json(response.succes);
        }
        else {
            return res.status(common_1.HttpStatus.NOT_ACCEPTABLE).json(response);
        }
    }
    async verifyToken(Authorization, res) {
        const token = Authorization.split(' ')[1];
        const response = await this.usersService.verifyToken(token);
        if (typeof response === 'string') {
            res.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json(response);
        }
        else {
            return response;
        }
    }
    async getAllUsersLessOne(id, res) {
        try {
            const users = await this.usersService.getAllUsersLessOne(id);
            return res.status(common_1.HttpStatus.OK).json({ users });
        }
        catch (err) {
            console.log(err);
        }
    }
    async uploadProfileImage(file, id) {
        console.log(file);
        await this.usersService.uploadProfileImage(id, file);
    }
    async revalidateUserData(id, res) {
        const user = await this.usersService.revalidateUserData(id);
        res.status(common_1.HttpStatus.OK).json(user);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Users_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Users_dto_1.AuthenticateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "authenticateUser", null);
__decorate([
    (0, common_1.Post)(':id/subscribe'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "subscribeToRoom", null);
__decorate([
    (0, common_1.Post)('/token'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyToken", null);
__decorate([
    (0, common_1.Get)('/allUsers/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsersLessOne", null);
__decorate([
    (0, common_1.Post)(':id/image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)('file')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadProfileImage", null);
__decorate([
    (0, common_1.Get)('/revalidate/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "revalidateUserData", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map