import { ElectricityEvents } from './ElectricityEvents';
import { ElectricMeter } from '../Entity/ElectricMeter';
import { EcoEvent } from '@eco/shared-kernel';


export class PowerUpdated implements EcoEvent {
  name = ElectricityEvents.powerUpdated;

  constructor(
    public readonly electricMeter: ElectricMeter,
    public readonly kWhConsumed: number,
    public readonly fromDate: Date,
    public readonly toDate: Date,
  ) {

  }
}
