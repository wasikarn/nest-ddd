import { BadRequestException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

export class Camper extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly name: string,
    private readonly age: number,
    private allergies: string[],
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  getAllergies(): string[] {
    return [...this.allergies];
  }

  updateAllergies(allergies: string[]): void {
    const allergiesLowerCase: string[] = allergies.map(
      (allergy: string): string => allergy.toLowerCase(),
    );

    if (allergiesLowerCase.includes('chocolate')) {
      throw new BadRequestException('Allergy may not be chocolate.');
    }

    this.allergies = allergies;
  }
}
