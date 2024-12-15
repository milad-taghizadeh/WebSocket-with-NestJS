import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

interface User {
    id: number;
    username: string;
    socketId: string
}

interface JoinPayload {
    roomName: string;
    user: User
}

interface Message {
    
}
@WebSocketGateway({
    cors: {origin: "*"}
})
export class IndexGateway{
    @WebSocketServer() server: Server;

    @SubscribeMessage("join_room")
    async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() data:any){
        
    }
}