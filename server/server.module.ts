import { Module } from '@nestjs/common';
import { NextController } from 'next.controller';
import { NextService } from 'next.service';

@Module({
  imports: [],
  controllers: [NextController],
  providers: [NextService],
})
export class ServerModule {}
