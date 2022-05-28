import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('/')
export class HomeController {
  @Get()
  home(@Res() res: Response) {
    const template = 'index';
    return res.render(template);
  }
}
