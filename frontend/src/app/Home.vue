<template>
    <div>
        <Co2Chart/>
        <v-alert :value="true" color="success" icon="new_releases">
            <p>
                2300 kg co2:
                Budget <strong>annuel</strong> d’émissions par personne pour limiter le réchauffement à 2°c.
            </p>
            <p><strong>Soit, 6.3 kg/jour</strong></p>
        </v-alert>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Co2Chart from '@/app/co2/components/co2-chart.vue';

  @Component({
    components: {
      Co2Chart,
    },
  })
  export default class Home extends Vue {
  }
</script>
