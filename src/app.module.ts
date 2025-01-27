import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [TodosModule, RegisterModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
