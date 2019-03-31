import { AddCarbon } from './use-case/AddCarbon';
import { TravelEvents } from '@eco/core-travel/src/event/TravelEvents';
import { ElectricityEvents } from '@eco/core-electricity/src/event/ElectricityEvents';
import { EventDispatcher } from '@eco/core-shared-kernel/src/event/EventDispatcher';
import { CarbonCalculator } from './CarbonCalculator';
import { FuelOilEvents } from '@eco/fuel-oil/src/event/FuelOilEvents';

export const initCo2Listeners = (eventDispatcher: EventDispatcher, addCarbonCommand: AddCarbon) => {
  const on = eventDispatcher.addListener.bind(eventDispatcher);
  const addCarbon = addCarbonCommand.execute.bind(addCarbonCommand);
  const carbonCalculator = new CarbonCalculator();

  on(TravelEvents.odometerUpdated, (e) => addCarbon(carbonCalculator.fromOdometerEvent(e)));
  on(TravelEvents.planeTravelAdded, (e) => addCarbon(carbonCalculator.fromNewPlaneTravelEvent(e)));
  on(ElectricityEvents.powerUpdated, (e) => addCarbon(carbonCalculator.fromPowerEvent(e)));
  on(FuelOilEvents.fuelOilWasCommand, (e) => addCarbon(carbonCalculator.fromFuelOil(e)));

};
