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

        <ListWaterConsumptions ref="list"/>
        <AddWaterConsumptionView/>

    </div>
    <div v-else>
        <InitWater @init="waterInitialized"/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import AddWaterConsumptionView from '@/app/water/components/AddWaterConsumptionView.vue';
  import ListWaterConsumptions from '@/app/water/components/list-water-consumptions.vue';
  import InitWater from '@/app/water/components/init-water.vue';


  @Component({
    components: {
      InitWater, AddWaterConsumptionView, ListWaterConsumptions,
    },
  })
  export default class WaterConsumption extends Vue {
    presenter = this.$water.homePresenter;
    viewModel = this.$water.homePresenter.getHomeViewModel();

    addConsumptionPresenter = this.$water.addConsumptionPresenter;
    addConsumptionViewModel = this.$water.addConsumptionPresenter.getViewModel();

    async mounted() {
      this.$water.homeController.initList();
    }

    @Watch('addConsumptionViewModel.displayed') consumptionChanged() {
      (this.$refs.list as ListWaterConsumptions).refresh(); // En attendant redux/rematch
    }

    waterInitialized() {
      this.$water.homeController.initList();
    }
  }
</script>
