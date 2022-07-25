export class RegisterUserDto {
  userName: string
  password: string
  confirmPassword: string
  email: string
}

export class AuthenticateUserDto {
  userName: string
  password: string
}

export class SubscribeToRoomDto {
  roomId: string
}

export interface UserToken {
  message: string
  user: {
    id: string
    user: string
    token: string
    rooms: string[]
    profileImage: string
    privateChats: string[]
  }
}

export interface ReplyUserSubscription {
  message: string
  succes: boolean
}
