<template>
    <div>
        <v-data-iterator :items="meters" hide-actions>
            <template v-slot:item="props">
                <v-card class="mx-auto mb-3 mt-3" color="#26c6da" dark max-width="400"
                        @click="showDialogForMeter(props.item)">
                    <v-card-title>
                        <v-icon large left>mdi-flash</v-icon>
                        <span class="title">{{ props.item.name }}</span><span class="title font-weight-light"> {{ props.item.lastKWhUpdate? `: ${props.item.lastKWhUpdate.toLocaleDateString('fr')}`:''}}</span>
                    </v-card-title>
                    <v-card-text class="headline font-weight-bold text-xs-right">{{ props.item.kWh }} kWh</v-card-text>
                </v-card>
            </template>
        </v-data-iterator>

        <v-dialog v-model="showDialog" max-width="600px">
            <AddPowerConsumption ref="form" @added="consumptionUpdated" @cancel="hideDialog"
                                 :electricMeter="selectedMeter"/>
        </v-dialog>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { handle } from '@eco/infrastructure/src/handlers';
  import { GetElectricMeters } from '@eco/core-electricity/src/interactor/GetElectricMeters';
  import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';
  import AddPowerConsumption from '@/app/electricity/components/update-power-consumption.vue';

  @Component({
    components: { AddPowerConsumption },
  })
  export default class ListElectricMeters extends Vue {
    meters = [];
    selectedMeter: ElectricMeter | null = null;
    showDialog = false;

    async mounted() {
      await this.refresh();
    }

    async refresh() {
      this.meters = await handle(new GetElectricMeters());
      console.log(this.meters);
    }

    showDialogForMeter(electricMeter: ElectricMeter) {
      this.selectedMeter = electricMeter;
      setImmediate(() => {
        (this.$refs.form as AddPowerConsumption).startEditing();
      });
      this.showDialog = true;
    }

    hideDialog() {
      this.showDialog = false;
    }

    consumptionUpdated() {
      this.showDialog = false;
    }
  }
</script>
