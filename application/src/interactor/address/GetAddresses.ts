import { AddressRepository } from '@eco/domain/src/address/repository/AddressRepository';

export class GetHomeAddress {
    constructor() {
    }
}

export class GetWorkAddress {
    constructor() {
    }
}


export class GetHomeAddressHandler {
    constructor(private store: AddressRepository) {
    }

    handle() {
        return this.store.getHomeAddress();
    }
}

export class GetWorkAddressHandler {
    constructor(private store: AddressRepository) {
    }

    handle() {
        return this.store.getWorkAddress();
    }
}
