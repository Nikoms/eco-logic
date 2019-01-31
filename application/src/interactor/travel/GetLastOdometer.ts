import { OdometerRepository } from '@eco/domain/src/traveling/repository/OdometerRepository';

export class GetLastOdometer {

  constructor(public readonly carId: string) {
    if (carId.trim().length === 0) {
      throw new Error('carId is required');
    }
  }
}

export class GetLastOdometerHandler {
  constructor(private store: OdometerRepository) {
  }

  async handle(request: GetLastOdometer) {
    return this.store.getLast(request.carId);
  }
}
