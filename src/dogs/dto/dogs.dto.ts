// Use DTOs when you need validation, decorators (like class-validator), and additional metadata associated with the data being transferred.
// DTOs provide a clear structure for incoming data and enable automatic validation.

export class DogDto {
  name: string;
  age: number;
  breed: string;
}
