import { Event } from '@eco/core-shared-kernel/src/event/Event';
import { ElectricityEvents } from './ElectricityEvents';
import { ElectricMeter } from '../entity/ElectricMeter';

export class PowerUpdated implements Event {
  name = ElectricityEvents.powerUpdated;

  constructor(
    public readonly powerConsumptionId: string,
    public readonly kWhConsumed: number,
    public readonly totalKWh: number,
    public readonly electricMeter: ElectricMeter,
  ) {

  }
}
