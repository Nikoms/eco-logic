<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <AddPowerConsumption></AddPowerConsumption>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AddPowerConsumption from '@/components/power-consumption/add.vue';
  import ListPowerConsumption from '@/components/power-consumption/list.vue'; // @ is an alias to /src

  @Component({
    components: {
      AddPowerConsumption, ListPowerConsumption
    },
  })
  export default class Home extends Vue {
  }
</script>
