import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  afterInit(server: any) {
    console.log('Socket Initialized');
  }
  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.server.sockets;
    console.log('clientID : ' + client.id + ' connected');
    console.log('Online Users : ' + sockets.size);
  }
  handleDisconnect(client: any) {
    const { sockets } = this.server.sockets;
    console.log('clientID : ' + client.id + ' disconnected');
    console.log('Online Users : ' + sockets.size);
  }
}
