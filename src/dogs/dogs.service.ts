import { Injectable } from '@nestjs/common';
import { Dogs } from './interfaces/dogs.interface';
import { DogDto } from './dto/dogs.dto';
import { Dog } from './schemas/dog.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DogsService {
  constructor(@InjectModel(Dog.name) private dogModel: Model<Dog>) {}
  //   private dogsArray: Dogs[] = [
  //     {
  //       id: 1,
  //       name: 'Doggy',
  //       age: 12,
  //       breed: 'Husky',
  //     },
  //     {
  //       id: 2,
  //       name: 'Tommy',
  //       age: 20,
  //       breed: 'Husky',
  //     },
  //     {
  //       id: 3,
  //       name: 'Snow',
  //       age: 12,
  //       breed: 'Libra',
  //     },
  //   ];

  async deleteDog(id) {
    const deletedItem = await this.dogModel.findByIdAndDelete(id);
    if (deletedItem) {
      return {
        data: deletedItem,
        message: `The dog with id: ${id} has been deleted`,
      };
    } else {
      return {
        data: deletedItem,
        message: `The dog with id: ${id} not found`,
      };
    }
    // const indexOfDog = this.dogsArray.findIndex((item) => item?.id == id);
    // if (indexOfDog !== -1) {
    //   this.dogsArray.splice(indexOfDog, 1);
    //   return {
    //     data: this.dogsArray,
    //     message: `The dog with id: ${id} has been deleted`,
    //   };
    // } else {
    //   return {
    //     data: this.dogsArray,
    //     message: `The dog with id: ${id} not found`,
    //   };
    // }
  }

  async updateDog(updateDogDto, id) {
    // const indexOfDog = this.dogsArray.findIndex(item => item?.id == id);
    // if(indexOfDog !== -1){
    //     this.dogsArray[indexOfDog] = updateDogDto;
    //     return {data:this.dogsArray,id}
    // }else {
    //     return {data:`Data with id: ${id} is not available`, id}
    // }
    const exisitingDog = await this.dogModel.findByIdAndUpdate(
      id,
      updateDogDto,
      { new: true },
    );
    if (exisitingDog) {
      return { data: exisitingDog, id };
    } else {
      return { data: `Data with id: ${id} is not available`, id };
    }
  }

  async createDog(createDogDto: DogDto): Promise<Dog> {
    const newDog = new this.dogModel(createDogDto);
    // this.dogsArray.push(createDogDto)
    return newDog.save();
  }

  async findAll(): Promise<Dog[]> {
    return await this.dogModel.find().exec();
    // return {data: this.dogsArray};
  }

  async findOne(id) {
    // const filteredArray = this.dogsArray.filter(items => items?.id === id);
    const filteredArray = await this.dogModel.findById(id);
    return { data: filteredArray };
  }
}
