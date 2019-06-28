import { addCarbon, eventDispatcher } from '@eco/infrastructure/src/di';
import { initCo2Listeners } from '@eco/domain/src/Co2/co2Listeners';

export const initListeners = () => {
  initCo2Listeners(eventDispatcher, addCarbon);
};
