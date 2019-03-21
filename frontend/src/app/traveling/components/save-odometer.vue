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
                    <v-btn type="submit" flat color="secondary" @click="cancel">Cancel</v-btn>
                    <v-btn type="submit" flat color="primary" @click="saveOdometer">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { handle } from '@eco/infrastructure/src/handlers';
  import AddCar from '@/app/traveling/components/add-car.vue';
  import { Car } from '@eco/core-travel/src/entity/Car';
  import { UpdateOdometer } from '@eco/core-travel/src/interactor/UpdateOdometer';

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
        await handle(new UpdateOdometer(parseFloat(this.km), this.car));
        this.$emit('added');
      }
    }

    cancel() {
      this.$emit('cancel');
    }

    async mounted() {
      await this.init();
    }


    private async init() {
      if (this.car) {
        this.km = '';
        this.carName = `${this.car.name}`;
        this.lastKm = `${this.car.km}`;
      }
    }

    async startEditing() {
      await this.init();
      (this.$refs.carField as any).focus();
    }
  }
</script>
