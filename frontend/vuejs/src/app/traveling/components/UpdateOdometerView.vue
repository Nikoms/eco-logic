<template>
    <v-dialog v-model="viewModel.displayed" max-width="600px">
        <v-form v-if="form.carId"
                @submit.prevent="$travel.controller.updateOdometer(form)">
            <v-card>
                <v-card-title>
                    <v-icon large left>mdi-car</v-icon>
                    <span class="title font-weight-light">{{viewModel.titleText}}</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="form.km"
                                  type="number"
                                  :label="viewModel.carName"
                                  suffix="km"
                                  ref="carField"
                                  :placeholder="'Previously: '+viewModel.lastKm"
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
  import { UpdateOdometerRequest } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerRequest';

  @Component
  export default class UpdateOdometerView extends Vue {
    viewModel = this.$travel.viewModel.updateOdometerView;
    form = new UpdateOdometerRequest('', '');

    @Watch('viewModel.displayed') onDisplayChanged(displayed: boolean) {
      if (displayed) {
        this.form = new UpdateOdometerRequest(this.viewModel.carId, '');
        setImmediate(() => {
          (this.$refs.carField as any).focus();
        });
      }
    }
  }
</script>
