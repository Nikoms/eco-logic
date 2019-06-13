<template>
    <div>
        <v-card class="mx-auto mb-3 mt-3" color="#ff8000" dark max-width="400">
            <v-card-title>
                <v-icon large left>mdi-fuel</v-icon>
                <span class="title">Fuel oil commands</span>
                <v-spacer></v-spacer>
                <v-btn flat icon @click="presenter.showAddFuelOilOrder()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-card-title>
        </v-card>
        <v-data-iterator :items="viewModel.orders" hide-actions>
            <template v-slot:item="props">
                <v-card class="mx-auto mb-3 mt-3" color="#26c6da" dark max-width="400">
                    <v-card-title>
                        <span class="title font-weight-light">Last order: </span><span
                            class="title">{{props.item.liters}} liters</span>
                    </v-card-title>
                    <v-card-text class="headline font-weight-bold text-xs-right">
                        {{props.item.date.toLocaleDateString('fr')}}
                    </v-card-text>
                </v-card>
            </template>
        </v-data-iterator>

        <v-card class="mx-auto mb-3 mt-3" color="#26c6da" dark max-width="400">
            <v-card-title>
                <span class="title font-weight-light">Total ordered: </span><span
                    class="title">{{viewModel.totalFuelOilOrder}} liters</span>
            </v-card-title>
        </v-card>
        <AddFuelOilOrderView/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AddFuelOilOrderView from '@/app/fuel-oil/components/AddFuelOilOrderView.vue';

  @Component({ components: { AddFuelOilOrderView } })

  export default class TravelingConsumption extends Vue {
    presenter = this.$houseHeating.homePresenter;
    viewModel = this.$houseHeating.homePresenter.getHomeViewModel();

    mounted() {
      this.$houseHeating.controller.refreshSummary();
    }
  }
</script>
