import { Carbon } from '@eco/domain/src/co2/entity/Carbon';
import v4 from 'uuid';
import { CarbonRepository } from '@eco/domain/src/co2/repository/CarbonRepository';

export class AddCarbon {
  public readonly carbon: Carbon;

  static fromPower(kWhConsumed: number) {
    // Example...
    return new AddCarbon(kWhConsumed * 100, 'From power...');
  }

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
