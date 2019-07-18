import { EventTargetEventDispatcher } from '@eco/infrastructure/src/event/EventDispatcher';
import { ElectricityMeterFakeApiRepository } from '@eco/frontend-infrastructure/src/Electricity/ElectricityMeterFakeApiRepository';
import { ElectricityApi } from '@eco/frontend-infrastructure/src/Electricity/ElectricityApi';
import { OrderFuelOilFakeApiRepository } from '@eco/frontend-infrastructure/src/HouseHeating/OrderFuelOilFakeApiRepository';
import { HouseHeatingApi } from '@eco/frontend-infrastructure/src/HouseHeating/HouseHeatingApi';
import { TravelingApi } from '@eco/frontend-infrastructure/src/Traveling/TravelingApi';
import { CarFakeApiRepository } from '@eco/frontend-infrastructure/src/Traveling/CarFakeApiRepository';
import { FlightFakeApiRepository } from '@eco/frontend-infrastructure/src/Traveling/FlightFakeApiRepository';
import { WaterApi } from '@eco/frontend-infrastructure/src/Water/WaterApi';
import { WaterMeterFakeApiRepository } from '@eco/frontend-infrastructure/src/Water/WaterMeterFakeApiRepository';
import { ConsumptionFakeApiRepository } from '@eco/frontend-infrastructure/src/Water/ConsumptionFakeApiRepository';
import { TravelingFactory } from '@eco/frontend-interface-adapter/src/Traveling/TravelingFactory';
import { WaterFactory } from '@eco/frontend-interface-adapter/src/Water/WaterFactory';
import { HouseHeatingFactory } from '@eco/frontend-interface-adapter/src/HouseHeating/HouseHeatingFactory';
import { ElectricityFactory } from '@eco/frontend-interface-adapter/src/Electricity/ElectricityFactory';

export const eventDispatcher = new EventTargetEventDispatcher(new EventTarget());
const electricityRepository = new ElectricityMeterFakeApiRepository(new ElectricityApi());
const houseHeatingRepository = new OrderFuelOilFakeApiRepository(new HouseHeatingApi());

const travelingApi = new TravelingApi();
const carRepository = new CarFakeApiRepository(travelingApi);
const flightRepository = new FlightFakeApiRepository(travelingApi);
const waterApi = new WaterApi();
const waterRepository = new WaterMeterFakeApiRepository(waterApi);
const consumptionRepository = new ConsumptionFakeApiRepository(waterApi);
const travel = new TravelingFactory(eventDispatcher, carRepository, flightRepository);
const water = new WaterFactory(waterRepository, consumptionRepository);
const houseHeating = new HouseHeatingFactory(eventDispatcher, houseHeatingRepository);
const electricity = new ElectricityFactory(eventDispatcher, electricityRepository);

console.log(travel, water, houseHeating, electricity);


export {
  travel, water, houseHeating, electricity,
};
