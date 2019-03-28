import { AddCarbon, AddCarbonRequest } from './use-case/AddCarbon';
import { TravelEvents } from '@eco/core-travel/src/event/TravelEvents';
import { ElectricityEvents } from '@eco/core-electricity/src/event/ElectricityEvents';
import { EventDispatcher } from '@eco/core-shared-kernel/src/event/EventDispatcher';

export const initCo2Listeners = (eventDispatcher: EventDispatcher, addCarbon: AddCarbon) => {
  eventDispatcher.addListener(
    TravelEvents.odometerUpdated, (e) => addCarbon.execute(AddCarbonRequest.fromOdometerEvent(e)));

  eventDispatcher.addListener(
    TravelEvents.planeTravelAdded, (e) => addCarbon.execute(AddCarbonRequest.fromNewPlaneTravelEvent(e)));

  eventDispatcher.addListener(
    ElectricityEvents.powerUpdated, (e) => addCarbon.execute(AddCarbonRequest.fromPowerEvent(e)));
};
