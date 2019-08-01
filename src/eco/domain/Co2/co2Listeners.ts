import { AddCarbon } from './UseCase/AddCarbon/AddCarbon';
import { CarbonCalculator } from './CarbonCalculator';
import { AddCarbonPresenter } from './UseCase/AddCarbon/AddCarbonPresenter';
import { AddCarbonResponse } from './UseCase/AddCarbon/AddCarbonResponse';
import { TravelEvents } from '../Traveling/Event/TravelEvents';
import { ElectricityEvents } from '../Electricity/Event/ElectricityEvents';
import { FuelOilEvents } from '../HouseHeating/Event/FuelOilEvents';
import { EventDispatcher } from '@eco/shared-kernel';

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
