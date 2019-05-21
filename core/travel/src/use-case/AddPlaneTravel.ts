import { v4 } from 'uuid';
import { PlaneTravel, Seat } from '../entity/PlaneTravel';
import { TravelRepository } from '../repository/TravelRepository';
import { EventDispatcher } from '@eco/core-shared-kernel/src/event/EventDispatcher';
import { PlaneTravelAdded } from '../event/PlaneTravelAdded';

export class AddPlaneTravelRequest {
  public readonly planeTravel: PlaneTravel;

  constructor(readonly seat: string, readonly km: number, readonly description: string) {
    if (!seat) {
      throw new Error('typeId is required');
    }
    if (!km) {
      throw new Error('km is required');
    }

    this.planeTravel = new PlaneTravel(v4(), seat as Seat, km, description, new Date());
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
