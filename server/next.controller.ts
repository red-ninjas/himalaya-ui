import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { NextService } from 'next.service';

@Controller('/')
export class NextController {
  constructor(private appService: NextService) {}

  @Get('*')
  public async getPage(@Req() req: Request, @Res() res: Response) {
    await this.appService.handler(req, res);
  }
}
