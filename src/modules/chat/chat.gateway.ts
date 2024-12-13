import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { log } from 'console';
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

  @SubscribeMessage('ping')
  pingHandler(client: any, data: any) {
    console.log('Message recived from client with id : ' + client.id);
    console.log('Data : ' + data.message);
    client.emit('pong', { message: 'Hello Client!' });
  }
}
