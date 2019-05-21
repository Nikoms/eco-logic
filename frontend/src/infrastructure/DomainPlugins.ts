import { TravelingFactory } from '@/domain/Traveling/TravelingFactory';

const TravelingFactoryPlugin = {
  install: (Vue: any, options: any) => {
    Vue.prototype.$travelingFactory = new TravelingFactory();
  },
};

declare module 'vue/types/vue' {
  interface Vue {
    $travelingFactory: TravelingFactory;
  }
}

export default TravelingFactoryPlugin;
