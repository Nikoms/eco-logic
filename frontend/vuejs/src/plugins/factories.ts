import { WaterFactory } from '@eco/frontend-interface-adapter/src/Water/WaterFactory';
import { ElectricityFactory } from '@eco/frontend-interface-adapter/src/Electricity/ElectricityFactory';
import { HouseHeatingFactory } from '@eco/frontend-interface-adapter/src/HouseHeating/HouseHeatingFactory';
import { TravelingFactory } from '@eco/frontend-interface-adapter/src/Traveling/TravelingFactory';
import { EventTargetEventDispatcher } from '@eco/infrastructure/src/event/EventDispatcher';
import { ElectricityMeterFakeApiRepository } from '@eco/frontend-infrastructure/src/Electricity/ElectricityMeterFakeApiRepository';
import { ElectricityApi } from '@eco/frontend-infrastructure/src/Electricity/ElectricityApi';
import { HouseHeatingApi } from '@eco/frontend-infrastructure/src/HouseHeating/HouseHeatingApi';
import { OrderFuelOilFakeApiRepository } from '@eco/frontend-infrastructure/src/HouseHeating/OrderFuelOilFakeApiRepository';

export const eventDispatcher = new EventTargetEventDispatcher();
const electricityRepository = new ElectricityMeterFakeApiRepository(new ElectricityApi());
const houseHeatingRepository = new OrderFuelOilFakeApiRepository(new HouseHeatingApi());

const factories = {
  install: (Vue: any) => {
    Vue.prototype.$travel = new TravelingFactory(eventDispatcher);
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
