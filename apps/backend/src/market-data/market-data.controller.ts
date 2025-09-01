import { Controller, Get } from '@nestjs/common';

@Controller()
export class MarketDataController {
  @Get()
  getHello(): string {
    return 'hello...';
  }
}
