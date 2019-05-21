<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-card class="mx-auto mb-3 mt-3" color="#ff8000" dark max-width="400">
            <v-card-title>
                <v-icon large left>mdi-car</v-icon>
                <span class="title">{{viewModel.carsTitle}}</span>
                <v-spacer></v-spacer>
                <v-btn flat icon @click="presenter.showAddCar()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-card-title>
        </v-card>
        <v-data-iterator :items="viewModel.cars" hide-actions>
            <template v-slot:item="props">
                <v-card class="mx-auto mb-3 mt-3" color="#26c6da" dark max-width="400"
                        @click="presenter.showUpdateOdometer(props.item)">
                    <v-card-title>
                        <v-flex class="text-xs-left title">{{ props.item.name }}</v-flex>
                        <span class="title font-weight-light text-xs-right">{{ props.item.km }}</span>
                    </v-card-title>
                </v-card>
            </template>
        </v-data-iterator>

        <v-card class="mx-auto mb-3 mt-3" color="#ff8000" dark max-width="400">
            <v-card-title>
                <v-icon large left>mdi-airplane mdi-rotate-45</v-icon>
                <span class="title">{{viewModel.flightTitle}}</span>
                <v-spacer></v-spacer>
                <v-btn flat icon @click="presenter.showAddFlight()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-card-title>
        </v-card>
        <v-data-iterator :items="viewModel.flights" hide-actions>
            <template v-slot:item="props">
                <v-card class="mx-auto mb-3 mt-3" color="#26c6da" dark max-width="400">
                    <v-card-title>
                        <v-icon large left>mdi-airplane mdi-rotate-45</v-icon>
                        <span class="title">{{ props.item.date }}</span><span
                            class="title font-weight-light"> {{ props.item.description }}</span>
                    </v-card-title>
                    <v-card-text class="headline font-weight-bold text-xs-right">{{ props.item.km }}</v-card-text>
                </v-card>
            </template>
        </v-data-iterator>

        <AddFlightView/>
        <AddCarView/>
        <UpdateOdometerView/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AddCarView from '@/app/traveling/components/AddCarView.vue';
  import AddFlightView from '@/app/traveling/components/AddFlightView.vue';
  import UpdateOdometerView from '@/app/traveling/components/UpdateOdometerView.vue';
  import { HomePresenterInterface } from '@/domain/Traveling/UseCase/Home/HomePresenterInterface';

  @Component({ components: { UpdateOdometerView, AddFlightView, AddCarView } })

  export default class TravelingConsumption extends Vue {
    presenter: HomePresenterInterface = this.$travelingFactory.travelingHomePresenter;
    viewModel = this.presenter.getHomeViewModel();

    mounted() {
      this.$travelingFactory.travelingHomeController.initList();
    }
  }
</script>
