import { Event } from '@eco/shared-kernel/src/event/Event';
import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';
import { ElectricityEvents } from '@eco/domain/src/Electricity/Event/ElectricityEvents';

export class PowerUpdated implements Event {
  name = ElectricityEvents.powerUpdated;

  constructor(
    public readonly electricMeter: ElectricMeter,
    public readonly kWhConsumed: number,
    public readonly fromDate: Date,
    public readonly toDate: Date,
  ) {

  }
}
