<template>
    <div class="hello">
        <v-text-field
                v-model="consumption"
                type="number"
                label="Consumption"
                suffix="kWh"
                :append-outer-icon="consumption ? 'mdi-send' : 'mdi-microphone'"
                @click:append-outer="sendMessage"
        ></v-text-field>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { AddPowerConsumption as Add } from '../../../../application/src/interactor/electricity/AddPowerConsumption';
  import { handle } from '@/handlers';

  @Component
  export default class AddPowerConsumption extends Vue {
    consumption: string = '';

    async sendMessage() {
      console.log(await handle(new Add(parseFloat(this.consumption))));
      this.clearMessage();
    }

    clearMessage() {
      this.consumption = '';
    }
  }
</script>
