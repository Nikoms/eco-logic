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

  @Component
  export default class AddPowerConsumption extends Vue {
    consumption: string = '';

    async sendMessage() {
      const rawResponse = await fetch('http://localhost:3000/power-consumption', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'kWh': this.consumption,
          'userId': '1'
        })
      });
      console.log(await rawResponse.json());

      this.clearMessage();
    }

    clearMessage() {
      this.consumption = '';
    }
  }
</script>
