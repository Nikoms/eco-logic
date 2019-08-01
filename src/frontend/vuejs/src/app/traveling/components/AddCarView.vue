<template>
    <v-dialog v-model="viewModel.displayed" max-width="600px">
        <v-form @submit.prevent="$travel.controller.addCar(form)">
            <v-card>
                <v-card-title>
                    <v-icon large left>mdi-car</v-icon>
                    <span class="title font-weight-light">{{viewModel.titleLabel}}</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="form.name" :label="viewModel.nameLabel" ref="name"></v-text-field>
                    <v-text-field v-model="form.consumption" type="number" :label="viewModel.consumptionLabel"
                                  :suffix="viewModel.consumptionSuffix"></v-text-field>
                    <v-select v-model="form.engine" :items="viewModel.engines"
                              :label="viewModel.engineLabel"></v-select>
                    <v-text-field v-model="form.km" :label="viewModel.kmLabel"></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="$travel.presenter.hideAddCar()">
                        {{viewModel.cancelLabel}}
                    </v-btn>
                    <v-btn flat color="primary" type="submit">{{viewModel.saveLabel}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { AddCarRequest } from '../../../../../../eco/domain';

  @Component
  export default class AddCarView extends Vue {
    form = new AddCarRequest('', '', '', '');
    viewModel = this.$travel.viewModel.addCarView;

    @Watch('viewModel.displayed') onDisplayChanged(displayed: boolean) {
      if (displayed) {
        this.form = new AddCarRequest('', '', this.viewModel.engines[0], '0');
        setTimeout(() => {
          (this.$refs.name as any).focus();
        },0);
      }
    }

  }
</script>
