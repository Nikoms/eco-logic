import { AddCarbon } from './interactor/AddCarbon';
import { TravelEvents } from '@eco/core-travel/src/event/TravelEvents';
import { ElectricityEvents } from '@eco/core-electricity/src/event/ElectricityEvents';

const co2Listeners: { [action: string]: ((event: any) => any)[] } = {
  [`${TravelEvents.odometerUpdated}`]: [AddCarbon.fromOdometerEvent],
  [`${TravelEvents.planeTravelAdded}`]: [AddCarbon.fromNewPlaneTravelEvent],
  [`${ElectricityEvents.powerUpdated}`]: [AddCarbon.fromPowerEvent],
};

export { co2Listeners };
