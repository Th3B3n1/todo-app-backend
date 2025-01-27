import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class RegisterService {
  constructor(private readonly prisma: PrismaClient) {}
  async create(registerDto: RegisterDto) {
    return await this.prisma.users.create({
      select: {
        name: true,
      },
      data: {
        name: registerDto.username,
        password: registerDto.password,
      },
    });
  }
}
