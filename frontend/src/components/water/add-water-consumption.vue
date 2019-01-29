<template>
    <div class="hello">
        <v-text-field
                v-model="consumption"
                type="number"
                label="Consumption"
                suffix="m3"
                :append-outer-icon="consumption ? 'mdi-send' : 'mdi-microphone'"
                @click:append-outer="sendMessage"
        ></v-text-field>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { handle } from '@/handlers';
  import { AddWaterConsumption as Add } from '@eco/application/src/interactor/water/AddWaterConsumption';

  @Component
  export default class AddWaterConsumption extends Vue {
    consumption: string = '';

    async sendMessage() {
      await handle(new Add(parseFloat(this.consumption)));

      this.clearMessage();
    }

    clearMessage() {
      this.consumption = '';
    }
  }
</script>
