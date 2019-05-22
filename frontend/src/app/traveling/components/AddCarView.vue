<template>
    <v-dialog v-model="viewModel.displayed" max-width="600px">
        <v-form @submit.prevent="$travel.addCarController.addCar(viewModel.form)">
            <v-card>
                <v-card-title>
                    <v-icon large left>mdi-car</v-icon>
                    <span class="title font-weight-light">{{viewModel.titleLabel}}</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="viewModel.form.name" :label="viewModel.nameLabel" ref="name"></v-text-field>
                    <v-text-field v-model="viewModel.form.consumption" type="number" :label="viewModel.consumptionLabel"
                                  :suffix="viewModel.consumptionSuffix"></v-text-field>
                    <v-select v-model="viewModel.form.engine" :items="viewModel.engines"
                              :label="viewModel.engineLabel"></v-select>
                    <v-text-field v-model="viewModel.form.km" :label="viewModel.kmLabel"></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="$travel.addCarPresenter.cancelAddCar()">{{viewModel.cancelLabel}}</v-btn>
                    <v-btn flat color="primary" type="submit">{{viewModel.saveLabel}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';

  @Component
  export default class AddCarView extends Vue {
    viewModel = this.$travel.addCarPresenter.getAddCarViewModel();

    @Watch('viewModel.displayed') onDisplayChanged(displayed: boolean) {
      if (displayed) {
        setImmediate(() => {
          (this.$refs.name as any).focus();
        });
      }
    }

  }
</script>
