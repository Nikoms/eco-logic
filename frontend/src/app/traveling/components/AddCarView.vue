<template>
    <v-form @submit.prevent="sendMessage">
        <v-card>
            <v-card-title>
                <v-icon large left>mdi-car</v-icon>
                <span class="title font-weight-light">{{viewModel.titleLabel}}</span>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="name" label="Name" ref="name"></v-text-field>
                <v-text-field v-model="consumption" type="number" label="Consumption" suffix="l/100"></v-text-field>
                <v-select v-model="engine" :items="viewModel.engines" label="Engine"></v-select>
                <v-text-field v-model="km" :label="viewModel.kmLabel"></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="secondary" @click="presenter.cancelAddCar()">{{viewModel.cancelLabel}}</v-btn>
                <v-btn flat color="primary" type="submit">{{viewModel.saveLabel}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { AddCarRequest } from '@/domain/Traveling/UseCase/AddCar/AddCarRequest';
  import { AddCar } from '@/domain/Traveling/UseCase/AddCar/AddCar';
  import { AddCarPresenterInterface } from '@/domain/Traveling/UseCase/AddCar/AddCarPresenterInterface';
  import { AddCarController } from '@/domain/Traveling/UseCase/AddCar/AddCarController';

  @Component
  export default class AddCarView extends Vue {
    @Prop()
    presenter?: AddCarPresenterInterface;
    viewModel = this.presenter!.getAddCarViewModel();
    controller = new AddCarController(new AddCar(this.presenter!));

    name = '';
    consumption = '';
    km = '';
    engine = '';


    async sendMessage() {
      this.controller.addCar(new AddCarRequest(this.name, this.consumption, this.engine, this.km));
    }

    @Watch('viewModel.displayed') onDisplayChanged(displayed: boolean) {
      if (displayed) {
        this.clearForm();
        setImmediate(() => {
          (this.$refs.name as any).focus();
        });
      }
    }

    private clearForm() {
      this.name = '';
      this.consumption = '';
      this.km = '0';
      this.engine = this.viewModel.engines[0];
    }
  }
</script>
