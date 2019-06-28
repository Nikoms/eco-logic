import { AddCarbon } from './UseCase/AddCarbon/AddCarbon';
import { TravelEvents } from '@eco/domain/src/Traveling/Event/TravelEvents';
import { ElectricityEvents } from '@eco/domain/src/Electricity/Event/ElectricityEvents';
import { EventDispatcher } from '@eco/shared-kernel/src/event/EventDispatcher';
import { CarbonCalculator } from './CarbonCalculator';
import { FuelOilEvents } from '@eco/domain/src/HouseHeating/Event/FuelOilEvents';
import { AddCarbonPresenter } from '@eco/domain/src/Co2/UseCase/AddCarbon/AddCarbonPresenter';
import { AddCarbonResponse } from '@eco/domain/src/Co2/UseCase/AddCarbon/AddCarbonResponse';

export const initCo2Listeners = (eventDispatcher: EventDispatcher, addCarbonCommand: AddCarbon) => {
  const on = eventDispatcher.addListener.bind(eventDispatcher);
  const addCarbon = addCarbonCommand.execute.bind(addCarbonCommand);
  const carbonCalculator = new CarbonCalculator();

  const noPresenter = new (class NoPresenter implements AddCarbonPresenter {
    presentAddCarbon(_response: AddCarbonResponse): void {
    }
  })();

  on(TravelEvents.odometerUpdated, (e) => addCarbon(carbonCalculator.fromOdometerEvent(e), noPresenter));
  on(TravelEvents.planeTravelAdded, (e) => addCarbon(carbonCalculator.fromNewPlaneTravelEvent(e), noPresenter));
  on(ElectricityEvents.powerUpdated, (e) => addCarbon(carbonCalculator.fromPowerEvent(e), noPresenter));
  on(FuelOilEvents.fuelOilOrdered, (e) => addCarbon(carbonCalculator.fromFuelOil(e), noPresenter));

};
