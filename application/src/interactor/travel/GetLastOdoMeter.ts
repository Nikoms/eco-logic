import { OdometerRepository } from '@eco/domain/src/traveling/repository/OdometerRepository';

export class GetLastOdoMeter {

  constructor(public readonly carId: string) {
    if (carId.trim().length === 0) {
      throw new Error('carId is required');
    }
  }
}

export class GetLastOdoMeterHandler {
  constructor(private store: OdometerRepository) {
  }

  async handle(request: GetLastOdoMeter) {
    return this.store.getLast(request.carId);
  }
}
