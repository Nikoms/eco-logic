import { api } from '../../../../api/frontend/src/Api';
import { HomePresenterInterface } from '@/domain/Traveling/UseCase/Home/HomePresenterInterface';

export class RefreshCars {
  constructor(private presenter: HomePresenterInterface) {

  }

  async execute() {
    const cars = await api.getCars();
    this.presenter.setCars(cars);
  }
}
