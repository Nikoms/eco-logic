<template>
    <v-dialog v-model="viewModel.displayed" max-width="600px">
        <v-form v-if="viewModel.displayed"
                @submit.prevent="updateOdometer(viewModel.selectedCar.id)">
            <v-card>
                <v-card-title>
                    <v-icon large left>mdi-car</v-icon>
                    <span class="title font-weight-light">{{viewModel.titleText}}</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="km"
                                  type="number"
                                  :label="viewModel.selectedCar.name"
                                  suffix="km"
                                  ref="carField"
                                  :placeholder="viewModel.previouslyPlaceHolder"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="$travel.presenter.hideUpdateOdometer()">
                        {{viewModel.cancelText}}
                    </v-btn>
                    <v-btn type="submit" flat color="primary">{{viewModel.saveText}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';

  @Component
  export default class UpdateOdometerView extends Vue {
    viewModel = this.$travel.viewModel.updateOdometerView;
    km = '';

    updateOdometer(carId: string) {
      this.$travel.controller.updateOdometer(carId, this.km);
    }

    @Watch('viewModel.displayed') onDisplayChanged(displayed: boolean) {
      if (displayed) {
        this.km = '';
        setTimeout(() => {
          (this.$refs.carField as any).focus();
        }, 0);
      }
    }
  }
</script>
