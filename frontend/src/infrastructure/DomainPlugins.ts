import { TravelingFactory } from '@/domain/Traveling/TravelingFactory';
import { WaterFactory } from '@/domain/Water/WaterFactory';

const DomainFactoryPlugin = {
  install: (Vue: any, options: any) => {
    Vue.prototype.$travel = new TravelingFactory();
    Vue.prototype.$water = new WaterFactory();
  },
};

declare module 'vue/types/vue' {
  interface Vue {
    $travel: TravelingFactory;
    $water: WaterFactory;
  }
}

export default DomainFactoryPlugin;
