export declare class RegisterUserDto {
    userName: string;
    password: string;
    confirmPassword: string;
    email: string;
}
export declare class AuthenticateUserDto {
    userName: string;
    password: string;
}
export declare class SubscribeToRoomDto {
    roomId: string;
}
export interface UserToken {
    message: string;
    user: {
        id: string;
        user: string;
        token: string;
        rooms: string[];
        profileImage: string;
        privateChats: string[];
    };
}
export interface ReplyUserSubscription {
    message: string;
    succes: boolean;
}
