import { TravelingFactory } from '@/domain/Traveling/TravelingFactory';
import { WaterFactory } from '@/domain/Water/WaterFactory';
import { HouseHeatingFactory } from '@/domain/HouseHeating/HouseHeatingFactory';
import { ElectricityFactory } from '@/domain/Electricity/ElectricityFactory';

const DomainFactoryPlugin = {
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

export default DomainFactoryPlugin;
