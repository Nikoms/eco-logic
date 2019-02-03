<template>
    <div>
        <ShowOdometers ref="odometers"></ShowOdometers>
        <ListTravels ref="travels"></ListTravels>
        <v-dialog v-model="addCarDialog" max-width="600px">
            <AddCar ref="addCarForm" @added="carAdded"/>
        </v-dialog>
        <v-dialog v-model="saveOdometerDialog" max-width="600px">
            <SaveOdometer ref="saveOdometerForm" @added="odometerSaved"/>
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
            <v-btn fab dark small color="green" @click="showOdometerDialog">
                <v-icon>mdi-car</v-icon>
            </v-btn>
            <v-btn fab dark small color="indigo" @click="showAddAirTravelDialog">
                <v-icon>mdi-airplane</v-icon>
            </v-btn>
            <v-btn fab dark small color="red" @click="showAddCarDialog">
                <v-icon>mdi-settings</v-icon>
            </v-btn>
        </v-speed-dial>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AddCar from '@/components/traveling/add-car.vue';
  import AddTravelByPlane from '@/components/traveling/add-travel-by-plane.vue';
  import ListTravels from '@/components/traveling/list-travels.vue';
  import SaveOdometer from '@/components/traveling/save-odometer.vue';
  import ShowOdometers from '@/components/traveling/show-odometers.vue';

  @Component({
    components: { ShowOdometers, AddCar, SaveOdometer, AddTravelByPlane, ListTravels },
  })
  export default class TravelingConsumption extends Vue {
    addCarDialog = false;
    saveOdometerDialog = false;
    addAirTravelDialog = false;
    fab = null;

    carAdded() {
      this.addCarDialog = false;
      (this.$refs.travels as any).refresh(); // En attendant redux/rematch
    }

    odometerSaved() {
      this.saveOdometerDialog = false;
      (this.$refs.odometers as ShowOdometers).refresh(); // En attendant redux/rematch
    }

    airTravelAdded() {
      this.addAirTravelDialog = false;
      (this.$refs.travels as ListTravels).refresh(); // En attendant redux/rematch
    }

    showAddCarDialog() {
      this.addCarDialog = true;
      setImmediate(() => {
        (this.$refs.addCarForm as AddCar).startEditing();
      });
    }

    showOdometerDialog() {
      this.saveOdometerDialog = true;
      setImmediate(() => {
        (this.$refs.saveOdometerForm as SaveOdometer).startEditing();
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
