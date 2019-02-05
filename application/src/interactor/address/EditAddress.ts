import { AddressRepository } from '@eco/domain/src/address/repository/AddressRepository';
import { Address } from "@eco/domain/src/address/entity/Address";

export class EditAddress {
    public readonly address: Address;

    constructor(address: Address) {
        this.address = address;
    }
}


export class EditAddressHandler {
    constructor(private addressStore: AddressRepository) {
    }

    async handle(request: EditAddress) {
        await this.addressStore.edit(request.address);
        return request.address;
    }
}
