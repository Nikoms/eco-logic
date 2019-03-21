import { Event } from '@eco/core-shared-kernel/src/event/Event';
import { TravelEvents } from './TravelEvents';
import { PlaneTravel } from '../entity/PlaneTravel';

export class PlaneTravelAdded implements Event {
  name = TravelEvents.planeTravelAdded;

  constructor(public readonly travel: PlaneTravel) {
  }
}
