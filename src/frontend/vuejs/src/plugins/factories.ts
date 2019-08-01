import {
  electricityFactory,
  ElectricityFactory,
  HouseHeatingFactory,
  houseHeatingFactory,
  travelFactory,
  TravelingFactory,
  waterFactory,
  WaterFactory,
} from '../../../interface-adapter';

const factories = {
  install: (Vue: any) => {
    Vue.prototype.$travel = travelFactory;
    Vue.prototype.$water = waterFactory;
    Vue.prototype.$houseHeating = houseHeatingFactory;
    Vue.prototype.$electricity = electricityFactory;
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
