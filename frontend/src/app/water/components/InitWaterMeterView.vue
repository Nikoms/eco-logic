<template>
    <v-card>
        <v-card-title class="headline">Do you have different water meters for cold and hot water?</v-card-title>

        <v-card-text>In some house, you can have 2 water meters, one for the cold water, the other for hot water.
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-4" flat="flat" @click="initWaterMeter(true)">Cold-Hot</v-btn>
            <v-btn color="blue darken-4" flat="flat" @click="initWaterMeter(false)">Standard</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { InitWaterMeterRequest } from '@eco/domain/src/Water/UseCase/InitWaterMeter/InitWaterMeterRequest';

  @Component({})
  export default class InitWaterMeterView extends Vue {
    async initWaterMeter(hasColdAndHotMeter: boolean) {
      this.$water.controller.initialize(new InitWaterMeterRequest(hasColdAndHotMeter));
    }
  }
</script>
