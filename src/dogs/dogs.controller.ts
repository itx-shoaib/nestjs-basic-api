import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Body,
  Put,
  Delete,
  Res,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogDto } from './dto/dogs.dto';
import { Response } from 'express';
import { Dog } from './schemas/dog.schema';
import { ParseObjectIdPipe } from 'src/validation/ParseObjectIdPipe.pipe';
import { ObjectId } from 'mongodb';

@Controller('dogs')
export class DogsController {
  constructor(private dogsservice: DogsService) {}

  @Delete(':id')
  async deleteDog(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
  ): Promise<{ data: any; message: string }> {
    return await this.dogsservice.deleteDog(id);
  }

  @Put(':id')
  async updateDog(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() updateDogDto: DogDto,
  ): Promise<{ data: any; id: any }> {
    return await this.dogsservice.updateDog(updateDogDto, id);
  }

  @Post('create')
  @HttpCode(201)
  createDog(@Body() createDogDto: DogDto) {
    return this.dogsservice.createDog(createDogDto);
  }

  @Get('findAll')
  async findAll(@Res() res: Response): Promise<any> {
    const result = await this.dogsservice.findAll();
    res.status(200).json(result);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
  ): Promise<{ data: any }> {
    return await this.dogsservice.findOne(id);
  }
}
