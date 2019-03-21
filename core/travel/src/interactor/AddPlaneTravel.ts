import { v4 } from 'uuid';
import { PlaneTravel, Seat } from '../entity/PlaneTravel';
import { TravelRepository } from '../repository/TravelRepository';
import { EventDispatcher } from '@eco/core-shared-kernel/src/event/EventDispatcher';
import { PlaneTravelAdded } from '../event/PlaneTravelAdded';

export class AddPlaneTravel {
  public readonly planeTravel: PlaneTravel;

  constructor(readonly seat: Seat, readonly km: number, readonly description: string) {
    if (!seat) {
      throw new Error('typeId is required');
    }
    if (!km) {
      throw new Error('km is required');
    }

    this.planeTravel = new PlaneTravel(v4(), seat, km, description, new Date());
  }
}

export class AddPlaneTravelHandler {
  constructor(private store: TravelRepository, private eventDispatcher: EventDispatcher) {

  }

  async handle(request: AddPlaneTravel) {
    await this.store.add(request.planeTravel);
    this.eventDispatcher.emit(new PlaneTravelAdded(request.planeTravel));
    return request.planeTravel;
  }
}
