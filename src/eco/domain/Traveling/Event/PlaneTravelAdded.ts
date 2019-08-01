import { TravelEvents } from './TravelEvents';
import { PlaneTravel } from '../Entity/PlaneTravel';
import { EcoEvent } from '../../../shared-kernel';

export class PlaneTravelAdded implements EcoEvent {
  name = TravelEvents.planeTravelAdded;

  constructor(public readonly travel: PlaneTravel) {
  }
}
