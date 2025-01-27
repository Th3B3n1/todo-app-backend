import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaClient) {}

  private async checkUser(token: string): Promise<{
    user: {
      id: number;
    };
  }> {
    return await this.prisma.tokens.findUniqueOrThrow({
      select: {
        user: {
          select: {
            id: true,
          },
        },
      },
      where: {
        token: token,
      },
    });
  }

  async create(token: string, createTodoDto: CreateTodoDto) {
    let user = await this.checkUser(token);
    return await this.prisma.todos.create({
      select: {
        id: true,
        title: true,
        content: true,
        done: true,
      },
      data: {
        title: createTodoDto.title,
        content: createTodoDto.content,
        done: false,
        user: {
          connect: {
            id: user.user.id,
          },
        },
      },
    });
  }

  async findAll(token: string) {
    let user = await this.checkUser(token);
    return await this.prisma.todos.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        done: true,
      },
      where: {
        user: {
          id: user.user.id,
        },
      },
    });
  }

  async findOne(token: string, id: number) {
    let user = await this.checkUser(token);
    return await this.prisma.todos.findUniqueOrThrow({
      select: {
        id: true,
        title: true,
        content: true,
        done: true,
      },
      where: {
        id: id,
        user: {
          id: user.user.id,
        },
      },
    });
  }

  async update(token: string, id: number, updateTodoDto: UpdateTodoDto) {
    let user = await this.checkUser(token);
    return await this.prisma.todos.update({
      select: {
        id: true,
        title: true,
        content: true,
        done: true,
      },
      data: {
        title: updateTodoDto.title,
        content: updateTodoDto.content,
        done: updateTodoDto.done
      },
      where: {
        id: id,
        user: {
          id: user.user.id,
        },
      },
    });
  }

  async remove(token: string, id: number) {
    let user = await this.checkUser(token);
    return await this.prisma.todos.delete({
      select: {
        id: true,
        title: true,
        content: true,
        done: true,
      },
      where: {
        id: id,
        user: {
          id: user.user.id,
        },
      },
    });
  }
}
