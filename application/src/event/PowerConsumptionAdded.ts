import { Event } from './Event';
import { Events } from './Events';
import { PowerConsumption } from '@eco/domain/src/electricity/entity/PowerConsumption';

export class PowerConsumptionAdded implements Event {
  public readonly name: string = Events.powerConsumptionAdded;

  constructor(public readonly power: PowerConsumption) {
  }

}
