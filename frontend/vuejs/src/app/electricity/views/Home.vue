<template>
    <div>
        <div v-if="viewModel.hasMeter">
            <GetElectricMetersView/>
        </div>
        <div v-else>
            <InitElectricMetersView/>
        </div>

        <UpdatePowerConsumptionView/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import UpdatePowerConsumptionView from '@/app/electricity/components/UpdatePowerConsumptionView.vue';
  import GetElectricMetersView from '@/app/electricity/components/GetElectricMetersView.vue';
  import InitElectricMetersView from '@/app/electricity/components/InitElectricMetersView.vue';

  @Component({
    components: {
      InitElectricMetersView,
      UpdatePowerConsumptionView,
      GetElectricMetersView,
    },
  })
  export default class Home extends Vue {
    viewModel = this.$electricity.getElectricMetersPresenter.getGetElectricMetersViewModel();

    async mounted() {
      this.$electricity.controller.refreshMeters();
    }
  }
</script>
