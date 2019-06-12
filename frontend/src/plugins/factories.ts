import { WaterFactory } from '@/infrastructure/Water/WaterFactory';
import { ElectricityFactory } from '@/infrastructure/Electricity/ElectricityFactory';
import { HouseHeatingFactory } from '@/infrastructure/HouseHeating/HouseHeatingFactory';
import { TravelingFactory } from '@/infrastructure/Traveling/TravelingFactory';

const factories = {
  install: (Vue: any) => {
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
