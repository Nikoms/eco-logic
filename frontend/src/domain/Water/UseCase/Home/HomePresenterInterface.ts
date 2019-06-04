import { HomeViewModel } from '@/domain/Water/UseCase/Home/HomeViewModel';

export interface HomePresenterInterface {
  getHomeViewModel(): HomeViewModel;
}
