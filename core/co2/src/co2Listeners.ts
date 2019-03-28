import { AddCarbon, AddCarbonRequest } from './use-case/AddCarbon';
import { TravelEvents } from '@eco/core-travel/src/event/TravelEvents';
import { ElectricityEvents } from '@eco/core-electricity/src/event/ElectricityEvents';
import { EventDispatcher } from '@eco/core-shared-kernel/src/event/EventDispatcher';

export const initCo2Listeners = (eventDispatcher: EventDispatcher, addCarbonCommand: AddCarbon) => {
  const on = eventDispatcher.addListener.bind(eventDispatcher);
  const addCarbon = addCarbonCommand.execute.bind(addCarbonCommand);

  on(TravelEvents.odometerUpdated, (e) => addCarbon(AddCarbonRequest.fromOdometerEvent(e)));
  on(TravelEvents.planeTravelAdded, (e) => addCarbon(AddCarbonRequest.fromNewPlaneTravelEvent(e)));
  on(ElectricityEvents.powerUpdated, (e) => addCarbon(AddCarbonRequest.fromPowerEvent(e)));
};
