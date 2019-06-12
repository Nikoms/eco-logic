import { v4 } from 'uuid';
import { PlaneTravel, Seat } from '../entity/PlaneTravel';
import { TravelRepository } from '../repository/TravelRepository';
import { EventDispatcher } from '@eco/core-shared-kernel/src/event/EventDispatcher';
import { PlaneTravelAdded } from '../event/PlaneTravelAdded';

export class AddPlaneTravelRequest {
  public readonly planeTravel: PlaneTravel;

  constructor(readonly id: string, readonly seat: string, readonly km: number, readonly description: string, readonly date: Date) {
    if (!seat) {
      throw new Error('seat is required');
    }
    if (!km) {
      throw new Error('km is required');
    }

    this.planeTravel = new PlaneTravel(id || v4(), seat as Seat, km, description, date);
  }
}

export class AddPlaneTravel {
  constructor(private store: TravelRepository, private eventDispatcher: EventDispatcher) {

  }

  async execute(request: AddPlaneTravelRequest) {
    await this.store.add(request.planeTravel);
    this.eventDispatcher.emit(new PlaneTravelAdded(request.planeTravel));
    return request.planeTravel;
  }
}
