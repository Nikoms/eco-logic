import { Event } from '@eco/core-shared-kernel/src/event/Event';
import { Events } from './Events';
import { Car } from '../entity/Car';

export class OdometerUpdated implements Event {
  name = Events.odometerUpdated;

  constructor(
    public readonly odometerId: string,
    public readonly kmTraveled: number,
    public readonly car: Car,
    public readonly date: Date) {

  }
}
