<template>
    <div>
        <v-form>
            <v-card>
                <v-card-title>
                    <v-icon large left>mdi-airplane</v-icon>
                    <span class="title font-weight-light">Add a travel</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="km" type="number" label="Distance" ref="distance" suffix="km"></v-text-field>
                    <v-select v-model="seatId"
                              :items="seats"
                              label="Select your seat class"
                    ></v-select>
                    <v-text-field v-model="description" label="Description"></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="addTravel">Add a travel</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Seat } from '@eco/core-travel/src/entity/PlaneTravel';
  import { AddPlaneTravelRequest } from '@eco/core-travel/src/use-case/AddPlaneTravel';
  import { addPlaneTravel } from '@eco/infrastructure/src/di';

  @Component
  export default class AddTravelByPlane extends Vue {
    seats = [Seat.economyClass, Seat.businessClass, Seat.firstClass];
    seatId = this.seats[0];
    km = '';
    description = '';

    async addTravel() {

      await addPlaneTravel.execute(new AddPlaneTravelRequest(this.seatId, parseFloat(this.km), this.description));
      this.clearForm();
      this.$emit('added');
    }

    startEditing() {
      (this.$refs.distance as any).focus();
    }

    clearForm() {
      this.km = '';
      this.description = '';
      this.seatId = this.seats[0];
    }
  }
</script>
