import { v4 } from 'uuid';
import {Address} from "@eco/domain/src/address/entity/Address";
import {AddressRepository} from "@eco/domain/src/address/repository/AddressRepository";

export class InitAddresses {
  constructor() {
  }
}


export class InitAddressesHandler {
  constructor(private store: AddressRepository) {
  }

  async handle() {
      await this.store.add(new Address(v4(), '', 'home'));
      await this.store.add(new Address(v4(), '', 'work'));
  }
}
