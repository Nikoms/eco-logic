import { HomePresenterInterface } from '@eco/domain/src/Traveling/UseCase/Home/HomePresenterInterface';
import { api } from '@eco/domain/src/Temp/Api';

export class RefreshCars {
  constructor(private presenter: HomePresenterInterface) {

  }

  async execute() {
    const cars = await api.getCars();
    this.presenter.setCars(cars);
  }
}
