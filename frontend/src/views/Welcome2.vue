<template>
    <div>
        <v-dialog v-model="dialog" max-width="290">
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
        </v-dialog>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { InitWaterMeter } from '@eco/application/src/interactor/water/InitWaterMeter';
  import { handle } from '@/handlers';

  @Component({
    components: {
    },
  })
  export default class Welcome2 extends Vue {
    dialog = false;

    mounted() {
      this.dialog = window.localStorage.getItem('water-meter-is-set') === null;
    }

    async initWaterMeter(hasColdAndHotMeter: boolean) {
      this.dialog = false;
      window.localStorage.setItem('water-meter-is-set', hasColdAndHotMeter.toString());
      await handle(new InitWaterMeter(hasColdAndHotMeter));

      this.$router.push('home');
    }
  }
</script>
