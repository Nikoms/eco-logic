import { TravelingFactory } from '@eco/domain/src/Traveling/TravelingFactory';
import { WaterFactory } from '@eco/domain/src/Water/WaterFactory';
import { HouseHeatingFactory } from '@eco/domain/src/HouseHeating/HouseHeatingFactory';
import { ElectricityFactory } from '@eco/domain/src/Electricity/ElectricityFactory';

const factories = {
  install: (Vue: any, options: any) => {
    Vue.prototype.$travel = new TravelingFactory();
    Vue.prototype.$water = new WaterFactory();
    Vue.prototype.$houseHeating = new HouseHeatingFactory();
    Vue.prototype.$electricity = new ElectricityFactory();
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
