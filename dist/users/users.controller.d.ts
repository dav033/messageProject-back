/// <reference types="multer" />
import { AuthenticateUserDto, RegisterUserDto } from './Users.dto';
import { UsersService } from './users.service';
import { Users } from 'src/interfaces/users.interface';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUsers(res: any): Promise<Users[]>;
    registerUser(res: any, registerUserDto: RegisterUserDto): Promise<any>;
    getUser(id: string, res: any): Promise<any>;
    authenticateUser(res: any, authenticateUserDto: AuthenticateUserDto): Promise<any>;
    subscribeToRoom(id: string, SubscribeToRoomDto: any, res: any): Promise<any>;
    verifyToken(Authorization: any, res: any): Promise<import("./Users.dto").UserToken>;
    getAllUsersLessOne(id: string, res: any): Promise<any>;
    uploadProfileImage(file: Express.Multer.File, id: string): Promise<void>;
    revalidateUserData(id: string, res: any): Promise<void>;
}
