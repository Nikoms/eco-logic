import { initCo2Listeners } from '@eco/domain';
import { addCarbon, eventDispatcher } from './di';

export const initListeners = () => {
  initCo2Listeners(eventDispatcher, addCarbon);
};
