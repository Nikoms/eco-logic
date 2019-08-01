import { HouseHeatingController } from './HouseHeatingController';
import { HouseHeatingUIPresenter } from './HouseHeatingUIPresenter';
import { EventDispatcher } from '@eco/shared-kernel';
import {
  AddFuelOilOrder,
  FuelOilOrderRepositoryInterface,
  GetLastFuelOilOrders,
  GetTotalFuelOilOrder,
} from '@eco/domain';
import { ElectricUI } from './ElectricUI';

export class HouseHeatingFactory {
  private instances: any = {};

  constructor(private eventDispatcher: EventDispatcher,
              private orderFuelOilRepository: FuelOilOrderRepositoryInterface) {
  }


  get controller() {
    return this.reuseOrInstantiate(
      'HouseHeatingController',
      () => new HouseHeatingController(
        this.fullPresenter,
        this.fullPresenter,
        this.fullPresenter,
        new AddFuelOilOrder(this.orderFuelOilRepository, this.eventDispatcher),
        new GetLastFuelOilOrders(this.orderFuelOilRepository),
        new GetTotalFuelOilOrder(this.orderFuelOilRepository),
      ),
    );
  }

  get ui(): ElectricUI {
    return this.fullPresenter;
  }

  get viewModel() {
    return this.fullPresenter.viewModel;
  }

  private get fullPresenter() {
    return this.reuseOrInstantiate('HouseHeatingPresenter', () => new HouseHeatingUIPresenter());
  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
