<template>
    <v-card>
        <v-card-title class="headline">Do you have a day-night electric meters?</v-card-title>

        <v-card-text>In some house, you can have 2 electric meters, one for the night, the other for the day.
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-2" flat="flat" @click="initElectricMeter(true)">Two meters: Day-night</v-btn>
            <v-btn color="blue darken-4" flat="flat" @click="initElectricMeter(false)">One meter</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
  export default class InitElectricMetersView extends Vue {
    async initElectricMeter(hasDayAndNightMeter: boolean) {
      this.$electricity.controller.initializeMeters(hasDayAndNightMeter);
    }
  }
</script>
