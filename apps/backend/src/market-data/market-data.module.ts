import { Module } from '@nestjs/common';
import { MarketDataController } from './market-data.controller';
import { MarketDataService } from './market-data.service';

import { JwtModule } from '@nestjs/jwt';
import { MarketDataGateway } from './market-data.gateway';

@Module({
  imports: [JwtModule],
  controllers: [MarketDataController],
  providers: [MarketDataService, MarketDataGateway],
})
export class MarketDataModule {}
