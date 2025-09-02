import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { IncomingMessage } from 'http';

@WebSocketGateway()
export class MarketDataGateway implements OnGatewayConnection, OnGatewayInit {
  constructor(
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}
  afterInit() {
    console.log('web socket started...');
  }

  async handleConnection(client: WebSocket, req: IncomingMessage) {
    try {
      const token: string | undefined | string[] = req.headers['token'];
      if (!token) {
        throw new UnauthorizedException('Please login again...');
      }
      const verification: object = await this.jwt.verifyAsync(token as string, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      console.log(verification);
      if (!verification) {
        client.close();
      }
    } catch {
      client.close();
      console.warn('Web socket connection closed...');
    }
  }
}
