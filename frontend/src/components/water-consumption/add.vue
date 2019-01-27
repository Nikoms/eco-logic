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

  @Component
  export default class AddWaterConsumption extends Vue {
    consumption: string = '';

    async sendMessage() {
      const rawResponse = await fetch('http://localhost:3000/water-consumption', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'm3': this.consumption,
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
