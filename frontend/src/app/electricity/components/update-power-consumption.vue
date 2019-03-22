<template>
    <v-form @submit.prevent="saveConsumption">
        <v-card>
            <v-card-text>
                <v-text-field v-model="kWh"
                              type="number"
                              :label="meterName"
                              :placeholder="lastKWh"
                              suffix="kWh"
                              ref="consumptionField"
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="secondary" @click="cancel">Cancel</v-btn>
                <v-btn type="submit" flat color="primary" @click="saveConsumption">Update consumption</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';
  import { AddPowerConsumption as Add } from '@eco/core-electricity/src/interactor/AddPowerConsumption';
  import { handle } from '@eco/infrastructure/src/handlers';

  @Component
  export default class UpdatePowerConsumption extends Vue {
    kWh = '';
    meterName = '';
    lastKWh = '';

    @Prop()
    electricMeter?: ElectricMeter;

    cancel() {
      this.kWh = '';
      this.$emit('cancel');
    }

    async saveConsumption() {
      if (this.electricMeter && this.kWh.trim().length > 0) {
        await handle(new Add(parseFloat(this.kWh), this.electricMeter));
        this.$emit('added');
      }
    }

    @Watch('electricMeter')
    onPropertyChanged(electricMeter: ElectricMeter) {
      this.initForm(electricMeter);
    }

    initForm(electricMeter: ElectricMeter) {
      this.kWh = '';
      this.meterName = electricMeter.name;
      this.lastKWh = `${electricMeter.kWh}`;
    }

    mounted() {
      // This is necessary for DEV ONLY. The "hot refresh", "this.electricMeter" is set, but the form has been empty.
      // Vue.js does NOT trigger the watcher => form is empty
      if (this.electricMeter) {
        this.initForm(this.electricMeter);
      }
    }

    async startEditing() {
      (this.$refs.consumptionField as any).focus();
    }
  }
</script>
