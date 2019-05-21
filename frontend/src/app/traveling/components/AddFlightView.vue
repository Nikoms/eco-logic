<template>
    <v-dialog v-model="viewModel.displayed" max-width="600px">
        <v-form @submit.prevent="addTravel">
            <v-card>
                <v-card-title>
                    <v-icon large left>mdi-airplane</v-icon>
                    <span class="title font-weight-light">{{viewModel.titleLabel}}</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="km" type="number" label="Distance" ref="distance" suffix="km"></v-text-field>
                    <v-select v-model="seat"
                              :items="viewModel.seats"
                              :label="viewModel.seatsLabel"
                    ></v-select>
                    <v-text-field v-model="description" :label="viewModel.descriptionLabel"></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="presenter.cancelAddFlight()">{{viewModel.cancelLabel}}</v-btn>
                    <v-btn flat color="primary" type="submit">{{viewModel.saveLabel}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { AddFlightController } from '@/domain/Traveling/UseCase/AddFlight/AddFlightController';
  import { AddFlight } from '@/domain/Traveling/UseCase/AddFlight/AddFlight';
  import { AddFlightRequest } from '@/domain/Traveling/UseCase/AddFlight/AddFlightRequest';
  import { AddFlightPresenterInterface } from '@/domain/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';

  @Component
  export default class AddFlightView extends Vue {
    presenter: AddFlightPresenterInterface = this.$travelingFactory.travelingHomePresenter;
    viewModel = this.presenter!.getAddFlightViewModel();
    controller = new AddFlightController(new AddFlight(this.presenter!));

    seat = this.viewModel.seats[0];
    km = '';
    description = '';

    async addTravel() {
      this.controller.addFlight(new AddFlightRequest(this.seat, this.km, this.description));
    }

    @Watch('viewModel.displayed') onDisplayedChanged(newValue: boolean) {
      if (newValue) {
        console.log('ici');
        this.clearForm();
        setImmediate(() => {
          (this.$refs.distance as any).focus();
        });
      }
    }

    private clearForm() {
      this.km = '';
      this.description = '';
      this.seat = this.viewModel.seats[0];
    }
  }
</script>
