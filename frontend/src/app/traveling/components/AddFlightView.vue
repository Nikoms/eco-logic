<template>
    <v-dialog v-model="viewModel.displayed" max-width="600px">
        <v-form @submit.prevent="$travel.addFlightController.addFlight(viewModel.form)">
            <v-card>
                <v-card-title>
                    <v-icon large left>mdi-airplane</v-icon>
                    <span class="title font-weight-light">{{viewModel.titleLabel}}</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="viewModel.form.km" type="number" label="Distance" ref="distance"
                                  suffix="km"></v-text-field>
                    <v-select v-model="viewModel.form.seat"
                              :items="viewModel.seats"
                              :label="viewModel.seatsLabel"
                    ></v-select>
                    <v-text-field v-model="viewModel.form.description"
                                  :label="viewModel.descriptionLabel"></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="$travel.addFlightPresenter.cancelAddFlight()">
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

  @Component
  export default class AddFlightView extends Vue {
    viewModel = this.$travel.addFlightPresenter.getAddFlightViewModel();

    @Watch('viewModel.displayed') onDisplayedChanged(newValue: boolean) {
      if (newValue) {
        setImmediate(() => {
          (this.$refs.distance as any).focus();
        });
      }
    }
  }
</script>
