import { Address } from '../entity/Address';

export interface AddressRepository {
    add(address: Address): Promise<void>;
    edit(address: Address): Promise<void>;

    getAll(): Promise<Address[]>;
    getHomeAddress(): Promise<Address[]>;
    getWorkAddress(): Promise<Address[]>;
}
