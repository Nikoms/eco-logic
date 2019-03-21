<template>
    <div>
        <v-data-iterator :items="odometers" hide-actions>
            <template v-slot:item="props">
                <v-card class="mx-auto mb-3 mt-3" color="#26c6da" dark max-width="400"
                        @click="showDialogForCar(props.item)">
                    <v-card-title>
                        <v-icon large left>mdi-car</v-icon>
                        <span class="title font-weight-light">{{ props.item.name }}</span>
                    </v-card-title>
                    <v-card-text class="headline font-weight-bold text-xs-right">{{ props.item.km }} Km</v-card-text>
                </v-card>
            </template>
        </v-data-iterator>

        <v-dialog v-model="showDialog" max-width="600px">
            <SaveOdometer ref="form" @added="odometerSaved" @cancel="hideDialog()" :car="selectedCar"/>
        </v-dialog>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { handle } from '@eco/infrastructure/src/handlers';
  import { Car } from '@eco/core-travel/src/entity/Car';
  import { GetCars } from '@eco/core-travel/src/interactor/GetCars';
  import SaveOdometer from '@/app/traveling/components/save-odometer.vue';

  @Component({
    components: { SaveOdometer },
  })
  export default class ListCars extends Vue {
    odometers: Car[] = [];
    selectedCar: Car | null = null;
    showDialog = false;

    async mounted() {
      await this.refresh();
    }

    async refresh() {
      this.odometers = await handle<Car[]>(new GetCars());
    }

    odometerSaved() {
      this.showDialog = false;
      this.refresh(); // En attendant redux/rematch
    }

    showDialogForCar(car: Car) {
      this.selectedCar = car;
      setImmediate(() => {
        (this.$refs.form as SaveOdometer).startEditing();
      });
      this.showDialog = true;
    }

    hideDialog() {
      this.showDialog = false;
    }
  }
</script>
