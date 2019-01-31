import { CarRepository } from '@eco/domain/src/traveling/repository/CarRepository';
import { Car, Engine } from '@eco/domain/src/traveling/entity/Car';
import { v4 } from 'uuid';
import { Travel, TravelType } from '@eco/domain/src/traveling/entity/Travel';
import { TravelRepository } from '@eco/domain/src/traveling/repository/TravelRepository';

export class AddTravel {
  public readonly travel: Travel;

  constructor(readonly type: TravelType, readonly typeId: string, readonly km: number, readonly description: string) {
    if (!type) {
      throw new Error('type is required');
    }
    if (typeId.trim().length === 0) {
      throw new Error('typeId is required');
    }
    if (!km) {
      throw new Error('km is required');
    }

    this.travel = new Travel(v4(), type, typeId, km, description, new Date());
  }
}

export class AddTravelHandler {
  constructor(private store: TravelRepository) {

  }

  async handle(request: AddTravel) {
    await this.store.add(request.travel);
    return request.travel;
  }
}
