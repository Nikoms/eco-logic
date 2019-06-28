import { Carbon } from '@eco/domain/src/Co2/Entity/Carbon';

export class AddCarbonResponse {
  carbon?: Carbon;
  isInvalidKg = false;
}
