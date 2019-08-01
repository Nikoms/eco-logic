import {
  addCar,
  addCarbon,
  addFlight,
  addFuelOilOrder,
  addWaterConsumption,
  addWaterMeter,
  getAllWaterConsumptions,
  getCar,
  getCarbons,
  getCars,
  getElectricMeter,
  getElectricMeters,
  getFlights,
  getLastFuelOilOrder,
  getTotalFuelOilOrder,
  getWaterMeters,
  saveElectricMeter,
  updateCar,
  updatePowerConsumption,
} from './di';
import { EventTargetEventDispatcher } from './event/EventDispatcher';
import { initListeners } from './initListeners';

export {
  addCarbon, getCarbons,
  addFuelOilOrder, getLastFuelOilOrder, getTotalFuelOilOrder,
  addCar, addFlight, getCar, getCars, getFlights, updateCar,
  addWaterConsumption,
  addWaterMeter,
  getAllWaterConsumptions,
  getWaterMeters,
  getElectricMeter,
  getElectricMeters,
  saveElectricMeter,
  updatePowerConsumption,
  EventTargetEventDispatcher,
  initListeners,
};
