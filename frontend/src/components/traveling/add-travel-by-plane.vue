import {TravelType} from '@eco/domain/src/traveling/entity/Travel';
import {TravelType} from '@eco/domain/src/traveling/entity/Travel';
<template>
    <div>
        <v-form>
            <v-card>
                <v-card-title>
                    <v-icon large left>mdi-wallet-travel</v-icon>
                    <span class="title font-weight-light">Add a travel</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="km" type="number" label="Distance" ref="distance" suffix="km"></v-text-field>
                    <v-select v-model="planeId"
                              :items="planes"
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
  import { handle } from '@/handlers';
  import { AddTravel } from '@eco/application/src/interactor/travel/AddTravel';
  import { TravelType } from '@eco/domain/src/traveling/entity/Travel';

  @Component
  export default class AddTravelByPlane extends Vue {
    planes = ['Economy class', 'Business class', 'First class'];
    planeId = this.planes[0];
    km = '';
    description = '';

    async addTravel() {

      await handle(new AddTravel(TravelType.plane, this.planeId, parseFloat(this.km), this.description));
      this.clearForm();
      this.$emit('added');
    }

    startEditing() {
      (<any> this.$refs.distance).focus();
    }

    clearForm() {
      this.km = '';
      this.description = '';
      this.planeId = this.planes[0];
    }
  }
</script>
