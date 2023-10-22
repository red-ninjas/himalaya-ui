import { Injectable, OnModuleInit } from '@nestjs/common';
import { Request, Response } from 'express';
import createServer from 'next';
import { NextServer } from 'next/dist/server/next';

@Injectable()
export class NextService implements OnModuleInit {
  private server: NextServer;

  constructor() { }

  async onModuleInit(): Promise<void> {
    try {
      this.server = createServer({
        dev: process.env.NODE_ENV !== 'production',
        dir: process.env.NODE_ENV === 'production' ? __dirname + '/src' : './src',
      });
      await this.server.prepare();
    } catch (error) {
      console.error(error);
    }
  }

  handler(req: Request, res: Response) {
    return this.server.getRequestHandler()(req, res);
  }
}