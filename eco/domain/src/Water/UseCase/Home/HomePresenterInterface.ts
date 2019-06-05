import { HomeViewModel } from '@eco/domain/src/Water/UseCase/Home/HomeViewModel';

export interface HomePresenterInterface {
  getHomeViewModel(): HomeViewModel;
}
