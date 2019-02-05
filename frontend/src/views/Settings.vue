<template>
    <div>
        <v-form>
            <v-text-field v-if="homeAddress[0]" v-model="homeAddress[0].address" label="Home Address"></v-text-field>
            <v-text-field v-if="workAddress[0]" v-model="workAddress[0].address" label="Work Address"></v-text-field>
            <v-btn flat color="primary" @click="save">Save</v-btn>
        </v-form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { handle } from '@/handlers';
    import { GetHomeAddress, GetWorkAddress } from '@eco/application/src/interactor/address/GetAddresses';
    import { InitAddresses } from "@eco/application/src/interactor/address/InitAddresses";
    import {EditAddress} from "@eco/application/src/interactor/address/EditAddress";

    @Component
    export default class Settings extends Vue {

        homeAddress = [];
        workAddress = [];

        async save() {
            await handle(new EditAddress(this.homeAddress[0]));
            await handle(new EditAddress(this.workAddress[0]));
        }

        async mounted() {
            if (window.localStorage.getItem('addresses-are-set') === null) {
                this.initAddresses();
            }
            await this.refresh();
        }

        async refresh() {
            this.homeAddress = await handle(new GetHomeAddress());
            this.workAddress = await handle(new GetWorkAddress());
        }

        private async initAddresses() {
            window.localStorage.setItem('addresses-are-set', true.toString());
            await handle(new InitAddresses());
        }
    }
</script>
