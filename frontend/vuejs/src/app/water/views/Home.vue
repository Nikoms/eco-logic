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
                @click="$water.presenter.showAddWaterConsumption()">
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
  import { Component, Vue } from 'vue-property-decorator';
  import AddWaterConsumptionView from '@/app/water/components/AddWaterConsumptionView.vue';
  import ListWaterConsumptionView from '@/app/water/components/ListWaterConsumptionView.vue';
  import InitWaterMeterView from '@/app/water/components/InitWaterMeterView.vue';

  @Component({
    components: {
      InitWaterMeterView, AddWaterConsumptionView, ListWaterConsumptionView,
    },
  })
  export default class WaterConsumption extends Vue {
    // Impossible to ONLY use "$water.viewModel" in the template without putting this line here. Probably because the initialization is done before the template?
    viewModel = this.$water.viewModel;

    async mounted() {
      this.$water.controller.refreshSummary();
    }

  }
</script>
