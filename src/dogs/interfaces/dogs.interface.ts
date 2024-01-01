// Use interfaces when you need a simple representation of the data structure without additional behavior or validation logic.
// Interfaces can be concise and are suitable when the data transfer doesn't require complex validation.

export interface Dogs {
    id:number;
    name: string;
    age: number;
    breed: string;
}