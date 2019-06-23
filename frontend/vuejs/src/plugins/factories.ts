import { WaterFactory } from '@eco/frontend-interface-adapter/src/Water/WaterFactory';
import { ElectricityFactory } from '@eco/frontend-interface-adapter/src/Electricity/ElectricityFactory';
import { HouseHeatingFactory } from '@eco/frontend-interface-adapter/src/HouseHeating/HouseHeatingFactory';
import { TravelingFactory } from '@eco/frontend-interface-adapter/src/Traveling/TravelingFactory';
import { EventTargetEventDispatcher } from '@eco/infrastructure/src/event/EventDispatcher';
import { ElectricityMeterFakeApiRepository } from '@eco/frontend-infrastructure/src/Electricity/ElectricityMeterFakeApiRepository';
import { ElectricityApi } from '@eco/frontend-infrastructure/src/Electricity/ElectricityApi';
import { HouseHeatingApi } from '@eco/frontend-infrastructure/src/HouseHeating/HouseHeatingApi';
import { OrderFuelOilFakeApiRepository } from '@eco/frontend-infrastructure/src/HouseHeating/OrderFuelOilFakeApiRepository';
import { CarFakeApiRepository } from '@eco/frontend-infrastructure/src/Traveling/CarFakeApiRepository';
import { TravelingApi } from '@eco/frontend-infrastructure/src/Traveling/TravelingApi';
import { CarLocalStorageRepository2 } from '@eco/infrastructure/src/local-storage/CarLocalStorageRepository2';
import { FlightFakeApiRepository } from '@eco/frontend-infrastructure/src/Traveling/FlightFakeApiRepository';

export const eventDispatcher = new EventTargetEventDispatcher();
const electricityRepository = new ElectricityMeterFakeApiRepository(new ElectricityApi());
const houseHeatingRepository = new OrderFuelOilFakeApiRepository(new HouseHeatingApi());

const travelingApi = new TravelingApi();
const enAttendant = new CarLocalStorageRepository2(window.localStorage);
const carRepository = new CarFakeApiRepository(travelingApi, enAttendant);
const flightRepository = new FlightFakeApiRepository(travelingApi);


const factories = {
  install: (Vue: any) => {
    Vue.prototype.$travel = new TravelingFactory(eventDispatcher, carRepository, flightRepository);
    Vue.prototype.$water = new WaterFactory();
    Vue.prototype.$houseHeating = new HouseHeatingFactory(eventDispatcher, houseHeatingRepository);
    Vue.prototype.$electricity = new ElectricityFactory(eventDispatcher, electricityRepository);
  },
};

declare module 'vue/types/vue' {
  interface Vue {
    $travel: TravelingFactory;
    $water: WaterFactory;
    $houseHeating: HouseHeatingFactory;
    $electricity: ElectricityFactory;
  }
}

export default factories;
