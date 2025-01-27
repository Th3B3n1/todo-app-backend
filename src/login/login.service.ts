import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LoginService {
  constructor(private readonly prisma: PrismaClient) {}
  async findOneByToken(token: string) {
    return await this.prisma.tokens.findUniqueOrThrow({
      select: {
        user: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      where: {
        token: token
      }
    })
  }

  async findOneByUserNamePassword(username: string, password: string): Promise<{
    token: string,
    expiresAt: Date
  }> {
    let user = await this.prisma.users.findUniqueOrThrow({
      select: {
        id: true,
        tokens: {
          select: {
            token: true,
            expiresAt: true
          },
          where: {
            expiresAt: {
              gt: new Date()
            }
          }
        }
      },
      where: {
        name: username,
        password: password
      }
    });
    if (user.tokens.length > 0) {
      return user.tokens[0];
    }
    return await this.prisma.tokens.create({
      select: {
        token: true,
        expiresAt: true
      },
      data: {
        token: crypto.randomUUID(),
        expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });
  }
}
