import { addCarbon, eventDispatcher } from '@eco/infrastructure/src/di';
import { initCo2Listeners } from '@eco/core-co2/src/co2Listeners';

export const initListeners = () => {
  initCo2Listeners(eventDispatcher, addCarbon);
};
