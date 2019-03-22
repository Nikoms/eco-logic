<template>
    <div>
        <v-dialog v-model="odometerDialog" max-width="600px">
            <SaveOdometer ref="odoMeterForm" @added="odometerAdded" @cancel="hideOdometerDialog" :car="selectedCar"/>
        </v-dialog>
        <v-card class="mx-auto mb-3 mt-3" color="#ff8000" dark max-width="400">
            <v-card-title>
                <v-icon large left>mdi-car</v-icon>
                <span class="title">Cars</span>
                <v-spacer></v-spacer>
                <v-btn flat icon @click="showAddCarDialog"><v-icon>mdi-plus</v-icon></v-btn>
            </v-card-title>
        </v-card>
        <ListCars ref="cars" @selected="carSelected"></ListCars>

        <v-card class="mx-auto mb-3 mt-3" color="#ff8000" dark max-width="400">
            <v-card-title>
                <v-icon large left>mdi-airplane mdi-rotate-45</v-icon>
                <span class="title">Plane travels</span>
                <v-spacer></v-spacer>
                <v-btn flat icon @click="showAddAirTravelDialog"><v-icon>mdi-plus</v-icon></v-btn>
            </v-card-title>
        </v-card>
        <ListPlaneTravels ref="travels"></ListPlaneTravels>
        <v-dialog v-model="addAirTravelDialog" max-width="600px">
            <AddTravelByPlane ref="addTravelByPlaneForm" @added="airTravelAdded"/>
        </v-dialog>

        <v-dialog v-model="addCarDialog" max-width="600px">
            <AddCar ref="addCarForm" @added="carSaved" @cancel="carCancelled"/>
        </v-dialog>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AddCar from '@/app/traveling/components/add-car.vue';
  import AddTravelByPlane from '@/app/traveling/components/add-travel-by-plane.vue';
  import ListPlaneTravels from '@/app/traveling/components/list-plane-travels.vue';
  import SaveOdometer from '@/app/traveling/components/save-odometer.vue';
  import ListCars from '@/app/traveling/components/list-cars.vue';
  import { Car } from '@eco/core-travel/src/entity/Car';

  @Component({
    components: { ListCars, AddCar, SaveOdometer, AddTravelByPlane, ListPlaneTravels },
  })

  export default class TravelingConsumption extends Vue {
    addCarDialog = false;
    addAirTravelDialog = false;
    odometerDialog = false;
    selectedCar: Car | null = null;

    odometerAdded() {
      this.odometerDialog = false;
      (this.$refs.cars as ListCars).refresh(); // En attendant redux/rematch
    }

    carSelected(car: Car) {
      this.selectedCar = car;
      setImmediate(() => {
        (this.$refs.odoMeterForm as SaveOdometer).startEditing();
      });
      this.odometerDialog = true;
    }

    hideOdometerDialog() {
      this.odometerDialog = false;
    }

    carSaved() {
      this.addCarDialog = false;
      (this.$refs.cars as ListCars).refresh(); // En attendant redux/rematch
    }

    carCancelled() {
      this.addCarDialog = false;
    }

    airTravelAdded() {
      this.addAirTravelDialog = false;
      (this.$refs.travels as ListPlaneTravels).refresh(); // En attendant redux/rematch
    }

    showAddCarDialog() {
      this.addCarDialog = true;
      setImmediate(() => {
        (this.$refs.addCarForm as AddCar).startEditing();
      });
    }

    showAddAirTravelDialog() {
      this.addAirTravelDialog = true;
      setImmediate(() => {
        (this.$refs.addTravelByPlaneForm as AddTravelByPlane).startEditing();
      });
    }
  }
</script>
