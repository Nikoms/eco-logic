<template>
    <div v-if="viewModel.hasMeter">
        <v-btn
                style="bottom: 70px"
                color="indigo"
                key="add"
                dark
                fab
                fixed
                bottom
                right
                @click="addConsumptionPresenter.showAddWaterConsumption(viewModel.meters)">
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <ListWaterConsumptionView/>
        <AddWaterConsumptionView/>

    </div>
    <div v-else>
        <InitWaterMeterView/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import AddWaterConsumptionView from '@/app/water/components/AddWaterConsumptionView.vue';
  import ListWaterConsumptionView from '@/app/water/components/ListWaterConsumptionView.vue';
  import InitWaterMeterView from '@/app/water/components/InitWaterMeterView.vue';
  import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';


  @Component({
    components: {
      InitWaterMeterView, AddWaterConsumptionView, ListWaterConsumptionView,
    },
  })
  export default class WaterConsumption extends Vue {
    presenter = this.$water.homePresenter;
    viewModel = this.$water.homePresenter.getHomeViewModel();

    addConsumptionPresenter = this.$water.addConsumptionPresenter;
    addConsumptionViewModel = this.$water.addConsumptionPresenter.getViewModel();

    initWaterViewModel = this.$water.initWaterMeterPresenter.getViewModel();

    async mounted() {
      this.$water.initWaterMeterController.initList();
    }

    @Watch('addConsumptionViewModel.displayed') consumptionChanged(displayed: boolean) {
      if (!displayed) {
        this.$water.listConsumptionsController.refresh();
      }
    }

    @Watch('initWaterViewModel.meters') metersChanged(meters: WaterMeter[]) {
      this.presenter.setMeters(meters);
    }
  }
</script>
