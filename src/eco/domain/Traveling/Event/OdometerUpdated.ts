import { TravelEvents } from './TravelEvents';
import { Car } from '../Entity/Car';
import { EcoEvent } from '../../../shared-kernel';

export class OdometerUpdated implements EcoEvent {
  name = TravelEvents.odometerUpdated;

  constructor(
    public readonly kmTraveled: number,
    public readonly car: Car,
    public readonly date: Date) {

  }
}
