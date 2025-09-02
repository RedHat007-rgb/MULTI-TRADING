import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { IncomingMessage } from 'http';

@WebSocketGateway()
export class MarketDataGateway implements OnGatewayConnection, OnGatewayInit {
  constructor(private jwt: JwtService) {}
  afterInit() {
    console.log('web socket started...');
  }

  async handleConnection(client: WebSocket, req: IncomingMessage) {
    try {
      const headerObject = req.headers;
      console.log(headerObject);
      const token: string | undefined | string[] = req.headers?.token;
      console.log(token);
      if (!token) {
        throw new UnauthorizedException('Please login again...');
      }
      const verification: { any } = await this.jwt.verifyAsync(
        token as string,
        {
          secret: 'cakeandbake',
        },
      );
      console.log(verification);
      if (!verification) {
        client.close();
      }
    } catch (error) {
      client.close();
      console.log(error);
    }
  }
}
