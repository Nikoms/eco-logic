import { Event } from '@eco/shared-kernel/src/event/Event';
import { TravelEvents } from './TravelEvents';
import { PlaneTravel } from '@eco/domain/src/Traveling/Entity/PlaneTravel';

export class PlaneTravelAdded implements Event {
  name = TravelEvents.planeTravelAdded;

  constructor(public readonly travel: PlaneTravel) {
  }
}
