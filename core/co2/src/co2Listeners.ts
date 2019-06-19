import { AddCarbon } from './use-case/AddCarbon';
import { TravelEvents } from '@eco/domain/src/Traveling/Event/TravelEvents';
import { ElectricityEvents } from '@eco/domain/src/Electricity/Event/ElectricityEvents';
import { EventDispatcher } from '@eco/shared-kernel/src/event/EventDispatcher';
import { CarbonCalculator } from './CarbonCalculator';
import { FuelOilEvents } from '@eco/domain/src/HouseHeating/Event/FuelOilEvents';

export const initCo2Listeners = (eventDispatcher: EventDispatcher, addCarbonCommand: AddCarbon) => {
  const on = eventDispatcher.addListener.bind(eventDispatcher);
  const addCarbon = addCarbonCommand.execute.bind(addCarbonCommand);
  const carbonCalculator = new CarbonCalculator();

  on(TravelEvents.odometerUpdated, (e) => addCarbon(carbonCalculator.fromOdometerEvent(e)));
  on(TravelEvents.planeTravelAdded, (e) => addCarbon(carbonCalculator.fromNewPlaneTravelEvent(e)));
  on(ElectricityEvents.powerUpdated, (e) => addCarbon(carbonCalculator.fromPowerEvent(e)));
  on(FuelOilEvents.fuelOilOrdered, (e) => addCarbon(carbonCalculator.fromFuelOil(e)));

};
