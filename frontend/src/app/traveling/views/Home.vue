<template>
    <div>
        <ShowOdometers ref="odometers"></ShowOdometers>
        <ListPlaneTravels ref="travels"></ListPlaneTravels>
        <v-dialog v-model="addCarDialog" max-width="600px">
            <AddCar ref="addCarForm" @added="carSaved" @cancel="carCancelled"/>
        </v-dialog>
        <v-dialog v-model="addAirTravelDialog" max-width="600px">
            <AddTravelByPlane ref="addTravelByPlaneForm" @added="airTravelAdded"/>
        </v-dialog>

        <v-speed-dial
                style="bottom: 70px"
                v-model="fab"
                fab
                fixed
                bottom
                right
                direction="top"
                transition="slide-y-reverse-transition"
        >
            <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
                <v-icon>mdi-plus</v-icon>
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn fab dark small color="green" @click="showAddCarDialog">
                <v-icon>mdi-car</v-icon>
            </v-btn>
            <v-btn fab dark small color="indigo" @click="showAddAirTravelDialog">
                <v-icon>mdi-airplane</v-icon>
            </v-btn>
        </v-speed-dial>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AddCar from '@/app/traveling/components/add-car.vue';
  import AddTravelByPlane from '@/app/traveling/components/add-travel-by-plane.vue';
  import ListPlaneTravels from '@/app/traveling/components/list-plane-travels.vue';
  import SaveOdometer from '@/app/traveling/components/save-odometer.vue';
  import ShowOdometers from '@/app/traveling/components/list-cars.vue';

  @Component({
    components: { ShowOdometers, AddCar, SaveOdometer, AddTravelByPlane, ListPlaneTravels },
  })

  export default class TravelingConsumption extends Vue {
    addCarDialog = false;
    addAirTravelDialog = false;
    fab = null;

    carSaved() {
      this.addCarDialog = false;
      (this.$refs.odometers as ShowOdometers).refresh(); // En attendant redux/rematch
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
