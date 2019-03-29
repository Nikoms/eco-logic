<template>
    <div>
        <v-form v-if="car" @submit.prevent="saveOdometer">
            <v-card>
                <v-card-title>
                    <v-icon large left>mdi-car</v-icon>
                    <span class="title font-weight-light">Save your current odometer</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="km"
                                  type="number"
                                  :label="carName"
                                  suffix="km"
                                  ref="carField"
                                  :placeholder="lastKm"
                    ></v-text-field>

                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="cancel">Cancel</v-btn>
                    <v-btn type="submit" flat color="primary">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import AddCar from '@/app/traveling/components/add-car.vue';
  import { Car } from '@eco/core-travel/src/entity/Car';
  import { api } from '../../../../../api/frontend/src/Api';

  @Component({
    components: { AddCar },
  })
  export default class SaveOdometer extends Vue {

    @Prop()
    car?: Car;

    km = '';
    lastKm = '';
    carName = '';

    async saveOdometer() {
      if (this.car && this.km.trim().length > 0) {
        await api.updateOdometer(this.car.id, parseFloat(this.km));
        this.$emit('added');
      }
    }

    cancel() {
      this.$emit('cancel');
    }

    @Watch('car')
    onPropertyChanged(car: Car) {
      this.initForm(car);
    }

    private initForm(car: Car) {
      this.km = '';
      this.carName = `${car.name}`;
      this.lastKm = `${car.km}`;
    }


    async mounted() {

      // This is necessary for DEV ONLY. The "hot refresh", "this.electricMeter" is set, but the form has been empty.
      // Vue.js does NOT trigger the watcher => form is empty
      if (this.car) {
        this.initForm(this.car);
      }
    }

    async startEditing() {
      (this.$refs.carField as any).focus();
    }
  }
</script>
