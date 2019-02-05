import { Address } from '@eco/domain/src/address/entity/Address';
import { AddressRepository } from '@eco/domain/src/address/repository/AddressRepository';
import { JsonOf } from '@eco/application/src/type/JsonOf';

export class AddressLocalStorageRepository implements AddressRepository {
    private key = 'addresses';

    constructor(private localstorage: Storage) {
        if (!this.localstorage.getItem(this.key)) {
            this.saveList([]);
        }
    }

    async add(address: Address) {
        const list = this.getList();
        list.push(address);
        this.saveList(list);
    }

    async edit(address: Address) {
        const list = this.getList();

        for (let i = 0; i < list.length; i++) {
            if (list[i].id === address.id) {
                list[i].address = address.address;
            }
        }

        this.saveList(list);
    }

    private saveList(list: any[]) {
        const listAsJson = JSON.stringify(list);
        this.localstorage.setItem(this.key, listAsJson);
    }

    private getList(): Address[] {
        const rawList: JsonOf<Address>[] = JSON.parse(this.localstorage.getItem(this.key) || '[]');
        return rawList.map(raw => new Address(raw.id, raw.address, raw.type));
    }

    async getAll() {
        return this.getList();
    }

    async getHomeAddress() {
        return this.getList().filter((address) => {
            return address.type === 'home'
        });
    }

    async getWorkAddress() {
        return this.getList().filter((address) => {
            return address.type === 'work'
        });
    }
}
