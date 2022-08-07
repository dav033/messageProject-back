import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class EventsGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
    server: Server;
    afterInit(server: any): void;
    handleConnection(client: any, id: any): void;
    handleDisconnect(client: any): void;
    handleJoinRoom(client: Socket, room: string): void;
    handleUserConnection(client: Socket, id: string): void;
    handleRefresh(client: Socket, receiverS: string): void;
    handleSendMessage(client: Socket, data: {
        type: string;
        content: string;
        transmitter: string;
        context: string;
        room: string;
        createdAt: string;
    }): void;
    handleSendMessageToPrivateCahat(data: {
        type: string;
        content: string;
        transmitter: string;
        context: string;
        room: string;
        createdAt: string;
    }): void;
}
