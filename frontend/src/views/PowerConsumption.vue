<template>
    <div class="power-consumption">
        Please add your latest Power Consumption below
        <AddPowerConsumption/>
        <ListPowerConsumption/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import AddPowerConsumption from '@/components/power-consumption/add.vue';
    import ListPowerConsumption from '@/components/power-consumption/list.vue'; // @ is an alias to /src

    @Component({
        components: {
            AddPowerConsumption, ListPowerConsumption,
        },
    })
    export default class PowerConsumption extends Vue {
    }
</script>
