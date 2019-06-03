import { HomePresenterInterface } from '@/domain/Traveling/UseCase/Home/HomePresenterInterface';
import { api } from '../../../../../api/frontend/src/Api';

export class RefreshCars {
  constructor(private presenter: HomePresenterInterface) {

  }

  async execute() {
    const cars = await api.getCars();
    this.presenter.setCars(cars);
  }
}
