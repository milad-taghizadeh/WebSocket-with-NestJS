import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'channel' })
export class ChannelGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('list')
  getList(client: any, data: any) {
    console.log(data);
    client.emit('list', [
      { name: 'Channel 1' },
      { name: 'Channel 2' },
      { name: 'Channel 3' },
    ]);
  }
}
