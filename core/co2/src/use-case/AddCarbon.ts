import v4 from 'uuid';
import { Carbon } from '../entity/Carbon';
import { CarbonRepository } from '../repository/CarbonRepository';

export class AddCarbonRequest {
  public readonly carbon: Carbon;

  constructor(kg: number, description: string) {
    this.carbon = new Carbon(v4(), kg, description, new Date());
  }
}

export class AddCarbon {
  constructor(private store: CarbonRepository) {
  }

  async execute(request: AddCarbonRequest) {
    await this.store.add(request.carbon);

    return request.carbon;
  }
}
