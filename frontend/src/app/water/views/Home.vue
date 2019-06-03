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
                @click="presenter.showAddWaterConsumption()">
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <ListWaterConsumptions ref="list"/>
        <v-dialog v-model="viewModel.addWaterConsumptionDisplayed" max-width="600px">
            <AddWaterConsumption ref="form" @added="added"/>
        </v-dialog>

    </div>
    <div v-else>
        <InitWater @init="waterInitialized"/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AddWaterConsumption from '@/app/water/components/add-water-consumption.vue';
  import ListWaterConsumptions from '@/app/water/components/list-water-consumptions.vue';
  import InitWater from '@/app/water/components/init-water.vue';


  @Component({
    components: {
      InitWater,
      AddWaterConsumption, ListWaterConsumptions,
    },
  })
  export default class WaterConsumption extends Vue {
    presenter = this.$water.homePresenter;
    viewModel = this.$water.homePresenter.getHomeViewModel();

    async mounted() {
      this.$water.homeController.initList();
    }

    showDialog() {
      setImmediate(() => {
        (this.$refs.form as AddWaterConsumption).startEditing();
      });
    }

    added() {
      this.presenter.hideAddWaterConsumption();
      (this.$refs.list as ListWaterConsumptions).refresh(); // En attendant redux/rematch
    }

    waterInitialized() {
      this.$water.homeController.initList();
    }
  }
</script>
