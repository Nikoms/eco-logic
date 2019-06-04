import { TravelingFactory } from '@/domain/Traveling/TravelingFactory';
import { WaterFactory } from '@/domain/Water/WaterFactory';
import { HouseHeatingFactory } from '@/domain/HouseHeating/HouseHeatingFactory';

const DomainFactoryPlugin = {
  install: (Vue: any, options: any) => {
    Vue.prototype.$travel = new TravelingFactory();
    Vue.prototype.$water = new WaterFactory();
    Vue.prototype.$houseHeating = new HouseHeatingFactory();

  },
};

declare module 'vue/types/vue' {
  interface Vue {
    $travel: TravelingFactory;
    $water: WaterFactory;
    $houseHeating: HouseHeatingFactory;
  }
}

export default DomainFactoryPlugin;
