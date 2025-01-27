import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Query('token') token: string, @Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(token, createTodoDto);
  }

  @Get()
  findAll(@Query('token') token: string) {
    return this.todosService.findAll(token);
  }

  @Get(':id')
  findOne(@Query('token') token: string, @Param('id') id: string) {
    return this.todosService.findOne(token, +id);
  }

  @Patch(':id')
  update(@Query('token') token: string, @Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(token, +id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Query('token') token: string, @Param('id') id: string) {
    return this.todosService.remove(token, +id);
  }
}
