import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { DogsModule } from 'src/dogs/dogs.module';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports:[DogsModule]
})
export class CatsModule {}
