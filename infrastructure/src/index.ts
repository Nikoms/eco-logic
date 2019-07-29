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
  getFlights,
  getLastFuelOilOrder,
  getTotalFuelOilOrder,
  getWaterMeters,
  updateCar,
  getElectricMeter,
  getElectricMeters,
  saveElectricMeter,
  updatePowerConsumption,
} from './di';
import { EventTargetEventDispatcher } from './event/EventDispatcher';

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
  EventTargetEventDispatcher
};
