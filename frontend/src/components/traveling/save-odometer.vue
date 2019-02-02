<template>
    <div>
        <v-form v-if="haveAtLeastOneCar" @submit.prevent="saveOdometer">
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
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" flat color="primary" @click="saveOdometer">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        <v-alert v-else value="true" color="error" icon="warning" outline>{{errorMessage}}</v-alert>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { handle } from '@/handlers';
  import { GetCars } from '@eco/application/src/interactor/travel/GetCars';
  import { Car } from '@eco/domain/src/traveling/entity/Car';
  import { SaveCurrentOdometer } from '@eco/application/src/interactor/travel/SaveCurrentOdometer';
  import { GetLastOdometer } from '@eco/application/src/interactor/travel/GetLastOdometer';
  import { Odometer } from '@eco/domain/src/traveling/entity/Odometer';

  @Component
  export default class SaveOdometer extends Vue {
    odometers: { car: Car, km: string, last: string }[] = [];
    car: Car | null = null;
    cars: Car[] = [];
    private haveAtLeastOneCar: boolean = false;
    private errorMessage: string = '';

    async saveOdometer() {

      for (const odometer of this.odometers) {
        if (odometer.km.trim().length > 0) {
          await handle(new SaveCurrentOdometer(parseFloat(odometer.km), odometer.car));
        }
      }
      this.clearForm();
      this.$emit('added');
    }

    async mounted() {
      await this.init();
    }

    private async init() {
      this.cars = await handle(new GetCars());
      await this.clearForm();
      this.haveAtLeastOneCar = this.cars.length > 0;
      if (this.haveAtLeastOneCar) {
        this.car = this.cars[0];
      } else {
        this.errorMessage = 'Please add a car before adding a travel';
      }
    }

    async startEditing() {
      await this.init();
      if (this.haveAtLeastOneCar) {
        (this.$refs['odometer'] as any)[0].focus();
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
