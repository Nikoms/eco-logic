<template>
    <div>
        <ListTravels ref="travels"></ListTravels>
        <v-dialog v-model="addCarDialog" max-width="600px">
            <AddCar ref="addCarForm" @added="carAdded"/>
        </v-dialog>
        <v-dialog v-model="addCarTravelDialog" max-width="600px">
            <AddTravelByCar ref="addTravelByCarFrom" @added="carTravelAdded"/>
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
            <v-btn fab dark small color="green" @click="showAddCarTravelDialog">
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
  import AddTravelByCar from '@/components/traveling/add-travel-by-car.vue';
  import AddTravelByPlane from '@/components/traveling/add-travel-by-plane.vue';
  import ListTravels from '@/components/traveling/list-travels.vue';

  @Component({
    components: { AddCar, AddTravelByCar, AddTravelByPlane, ListTravels },
  })
  export default class TravelingConsumption extends Vue {
    addCarDialog = false;
    addCarTravelDialog = false;
    addAirTravelDialog = false;
    fab = null;

    carAdded() {
      this.addCarDialog = false;
      (<any> this.$refs.travels).refresh(); // En attendant redux/rematch
    }

    carTravelAdded() {
      this.addCarTravelDialog = false;
      (<any> this.$refs.travels).refresh(); // En attendant redux/rematch
    }

    airTravelAdded() {
      this.addAirTravelDialog = false;
      (<any> this.$refs.travels).refresh(); // En attendant redux/rematch
    }

    showAddCarDialog() {
      this.addCarDialog = true;
      setImmediate(() => {
        (<any> this.$refs.addCarForm).startEditing();
      });
    }

    showAddCarTravelDialog() {
      this.addCarTravelDialog = true;
      setImmediate(() => {
        (<any> this.$refs.addTravelByCarFrom).startEditing();
      });
    }

    showAddAirTravelDialog() {
      this.addAirTravelDialog = true;
      setImmediate(() => {
        (<any> this.$refs.addTravelByPlaneForm).startEditing();
      });
    }
  }
</script>
