import { Car } from '@eco/domain/src/Traveling/Entity/Car';

export class UpdateCarRequest {
  constructor(public readonly car: Car) {

  }
}
