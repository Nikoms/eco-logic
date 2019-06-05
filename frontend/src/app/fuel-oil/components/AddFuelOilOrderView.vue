<template>
    <v-dialog v-model="viewModel.displayed" max-width="600px">
        <v-form @submit.prevent="controller.add(request)">
            <v-card>
                <v-card-text>
                    <v-text-field v-model="request.liters"
                                  type="number"
                                  :label="viewModel.literInputLabel"
                                  :placeholder="viewModel.literInputHelp"
                                  :suffix="viewModel.literInputSuffix"
                                  ref="liters"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="presenter.addFuelOilOrderCancelled()">
                        {{viewModel.cancelLabel}}
                    </v-btn>
                    <v-btn type="submit" flat color="primary">{{viewModel.addLabel}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { AddFuelOilOrderRequest } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderRequest';

  @Component({})
  export default class AddFuelOilOrderView extends Vue {
    presenter = this.$houseHeating.addFuelOilOrderPresenter;
    viewModel = this.$houseHeating.addFuelOilOrderPresenter.getAddFuelOilOrderViewModel();
    controller = this.$houseHeating.addFuelOilOrderController;

    request = new AddFuelOilOrderRequest('');

    @Watch('viewModel.displayed') onDisplayChanged(displayed: boolean) {
      if (displayed) {
        this.request = new AddFuelOilOrderRequest('');
        setImmediate(() => {
          (this.$refs.liters as any).focus();
        });
      }
    }
  }
</script>
