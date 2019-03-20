import v4 from 'uuid';
import { Carbon } from '../entity/Carbon';
import { CarbonRepository } from '../repository/CarbonRepository';

export class AddCarbon {
  public readonly carbon: Carbon;

  constructor(kg: number, description: string) {
    this.carbon = new Carbon(v4(), kg, description, new Date());
  }
}

export class AddCarbonHandler {
  constructor(private store: CarbonRepository) {
  }

  async handle(request: AddCarbon) {
    await this.store.add(request.carbon);

    return request.carbon;
  }
}
