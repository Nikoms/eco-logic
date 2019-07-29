import { ElectricityFactory } from './Electricity/ElectricityFactory';
import { HouseHeatingFactory } from './HouseHeating/HouseHeatingFactory';
import { TravelingFactory } from './Traveling/TravelingFactory';
import { WaterFactory } from './Water/WaterFactory';
import { EventTargetEventDispatcher } from '@eco/infrastructure';
import { EventTarget } from 'event-target-shim';
import {
  CarFakeApiRepository,
  ConsumptionFakeApiRepository,
  ElectricityApi,
  ElectricityMeterFakeApiRepository,
  FlightFakeApiRepository,
  HouseHeatingApi,
  OrderFuelOilFakeApiRepository,
  TravelingApi,
  WaterApi,
  WaterMeterFakeApiRepository,
} from '@eco/frontend-infrastructure';
import { TravelingController } from './Traveling/TravelingController';
import { TravelingUI } from './Traveling/TravelingUI';
import { WaterUI } from './Water/WaterUI';
import { ViewModel as WaterViewModel, WaterConsumptionViewModel } from './Water/ViewModel';
import { WaterController } from './Water/WaterController';
import { ViewModel as TravelingViewModel } from './Traveling/ViewModel';

export const eventDispatcher = new EventTargetEventDispatcher(new EventTarget());
export const electricityRepository = new ElectricityMeterFakeApiRepository(new ElectricityApi());
export const houseHeatingRepository = new OrderFuelOilFakeApiRepository(new HouseHeatingApi());
export const travelingApi = new TravelingApi();
export const carRepository = new CarFakeApiRepository(travelingApi);
export const flightRepository = new FlightFakeApiRepository(travelingApi);
export const waterApi = new WaterApi();
export const waterRepository = new WaterMeterFakeApiRepository(waterApi);
export const consumptionRepository = new ConsumptionFakeApiRepository(waterApi);
export const travelFactory = new TravelingFactory(eventDispatcher, carRepository, flightRepository);
export const waterFactory = new WaterFactory(waterRepository, consumptionRepository);
export const houseHeatingFactory = new HouseHeatingFactory(eventDispatcher, houseHeatingRepository);
export const electricityFactory = new ElectricityFactory(eventDispatcher, electricityRepository);
export {
  ElectricityFactory,
  HouseHeatingFactory,
  TravelingFactory,
  WaterFactory,
  TravelingController,
  TravelingUI,
  WaterUI,
  WaterViewModel,
  WaterController,
  WaterConsumptionViewModel,
  TravelingViewModel,
};
