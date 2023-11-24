import { Module } from '@nestjs/common';
import { NextController } from 'next.controller';
import { NextService } from 'next.service';
import { GithubController } from './github/github.controller';
import { GithubService } from './github/github.service';

@Module({
  imports: [],
  controllers: [GithubController, NextController],
  providers: [GithubService, NextService],
})
export class ServerModule {}
