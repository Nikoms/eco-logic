import { TravelingFactory } from '@/domain/Traveling/TravelingFactory';

const TravelingFactoryPlugin = {
  install: (Vue: any, options: any) => {
    Vue.prototype.$travel = new TravelingFactory();
  },
};

declare module 'vue/types/vue' {
  interface Vue {
    $travel: TravelingFactory;
  }
}

export default TravelingFactoryPlugin;
