<template>
    <div>
        <v-form v-if="canAdd">
            <v-card>
                <v-card-title>
                    <v-icon large left>mdi-car</v-icon>
                    <span class="title font-weight-light">Save your current odometer</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="km" type="number" label="What's on your counter?" ref="km" suffix="km"></v-text-field>
                    <v-select v-model="car"
                              :items="cars"
                              label="Select your car"
                              item-text="name"
                              item-value="id"
                              return-object
                    ></v-select>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="saveOdometer">Save</v-btn>
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

  @Component
  export default class SaveOdometer extends Vue {
    car: Car | null = null;
    km = '';
    cars = [];
    private canAdd: boolean = false;
    private errorMessage: string = '';

    async saveOdometer() {
      if (this.car === null) {
        throw new Error('no car selected');
      }
      await handle(new SaveCurrentOdometer(parseFloat(this.km), this.car));
      this.clearForm();
      this.$emit('added');
    }

    async mounted() {
      await this.init();
    }

    private async init() {
      this.cars = await handle(new GetCars());
      this.canAdd = this.cars.length > 0;
      if (this.canAdd) {
        this.car = this.cars[0];
      } else {
        this.errorMessage = 'Please add a car before adding a travel';
      }
    }

    startEditing() {
      this.init();
      (<any> this.$refs.km).focus();
    }

    clearForm() {
      this.km = '';
      this.car = null;
    }
  }
</script>
