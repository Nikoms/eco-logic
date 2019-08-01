import { Car } from '../../Entity/Car';

export class UpdateCarRequest {
  constructor(public readonly car: Car) {

  }
}
