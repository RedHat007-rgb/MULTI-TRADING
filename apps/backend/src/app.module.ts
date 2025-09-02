import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { MarketDataModule } from './market-data/market-data.module';

@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: '../../packages/trpc/src/server',
    }),

    MarketDataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
