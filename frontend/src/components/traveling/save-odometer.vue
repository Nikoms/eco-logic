<template>
    <div>
        <v-form v-if="!showAddCar && cars.length > 0" @submit.prevent="saveOdometer">
            <v-card>
                <v-card-title>
                    <v-icon large left>mdi-car</v-icon>
                    <span class="title font-weight-light">Save your current odometer</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-for="(odometer, index) in odometers" :key="odometer.car.id"
                                  v-model="odometers[index].km"
                                  type="number"
                                  :label="odometer.car.name"
                                  suffix="km"
                                  ref="odometer"
                                  :placeholder="odometers[index].last"
                    ></v-text-field>
                    <a href="#" v-on:click.prevent="addNewCar()">Add another car...</a>

                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" flat color="secondary" @click="cancel">Cancel</v-btn>
                    <v-btn type="submit" flat color="primary" @click="saveOdometer">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        <div v-else>
            <AddCar @added="carAdded" @cancel="carCancel" :canCancel="cars.length > 0"/>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { handle } from '@/handlers';
  import AddCar from '@/components/traveling/add-car.vue';
  import { Car } from '@eco/core-travel/src/entity/Car';
  import { SaveCurrentOdometer } from '@eco/core-travel/src/interactor/SaveCurrentOdometer';
  import { GetCars } from '@eco/core-travel/src/interactor/GetCars';
  import { Odometer } from '@eco/core-travel/src/entity/Odometer';
  import { GetLastOdometer } from '@eco/core-travel/src/interactor/GetLastOdometer';

  @Component({
    components: { AddCar },
  })
  export default class SaveOdometer extends Vue {
    odometers: { car: Car, km: string, last: string }[] = [];
    cars: Car[] = [];
    private showAddCar: boolean = false;

    async saveOdometer() {
      for (const odometer of this.odometers) {
        if (odometer.km.trim().length > 0) {
          await handle(new SaveCurrentOdometer(parseFloat(odometer.km), odometer.car));
        }
      }
      this.clearForm();
      this.$emit('added');
    }

    cancel() {
      this.$emit('cancel');
    }

    carAdded() {
      this.init();
    }

    carCancel() {
      this.showAddCar = false;
    }

    async mounted() {
      await this.init();
    }

    addNewCar() {
      this.showAddCar = true;
    }

    private async init() {
      this.cars = await handle(new GetCars());
      await this.clearForm();
      this.showAddCar = this.cars.length === 0;
    }

    async startEditing() {
      await this.init();
      if (!this.showAddCar) {
        (this.$refs.odometer as any)[0].focus();
      }
    }

    async clearForm() {
      this.odometers = [];
      for (const car of this.cars) {
        const last = await handle<Odometer>(new GetLastOdometer(car.id));
        this.odometers.push({ car, km: '', last: last ? `${last.km}` : '' });
      }
    }
  }
</script>
