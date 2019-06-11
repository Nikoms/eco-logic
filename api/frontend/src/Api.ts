import { getCarbons } from '@eco/infrastructure/src/di';

export class Api {
  getCarbons() {
    return getCarbons.execute();
  }
}

export const api = new Api();


