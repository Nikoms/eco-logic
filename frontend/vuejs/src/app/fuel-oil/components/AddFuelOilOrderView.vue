<template>
    <v-dialog v-model="viewModel.formDisplayed" max-width="600px">
        <v-form @submit.prevent="$houseHeating.controller.addFuelOilOrder(quantity)">
            <v-card>
                <v-card-text>
                    <v-text-field v-model="quantity"
                                  type="number"
                                  :label="viewModel.literInputLabel"
                                  :placeholder="viewModel.literInputHelp"
                                  :suffix="viewModel.literInputSuffix"
                                  ref="liters"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="$houseHeating.ui.hideAddFuelOilOrder()">
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

  @Component({})
  export default class AddFuelOilOrderView extends Vue {
    quantity = '';
    viewModel = this.$houseHeating.viewModel;

    @Watch('viewModel.formDisplayed') onDisplayChanged(displayed: boolean) {
      if (displayed) {
        this.quantity = '';
        setImmediate(() => {
          (this.$refs.liters as any).focus();
        });
      }
    }
  }
</script>
