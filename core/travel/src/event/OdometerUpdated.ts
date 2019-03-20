import { Event } from '@eco/core-shared-kernel/src/event/Event';
import { TravelEvents } from './TravelEvents';
import { Car } from '../entity/Car';

export class OdometerUpdated implements Event {
  name = TravelEvents.odometerUpdated;

  constructor(
    public readonly odometerId: string,
    public readonly kmTraveled: number,
    public readonly car: Car,
    public readonly date: Date) {

  }
}
