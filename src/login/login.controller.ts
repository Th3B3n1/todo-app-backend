import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  create(@Body() loginDto: LoginDto) {
    return (loginDto.username && loginDto.password) ? this.loginService.findOneByUserNamePassword(loginDto.username, loginDto.password) : this.loginService.findOneByToken(loginDto.token);
  }
}
