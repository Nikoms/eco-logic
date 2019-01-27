<template>
    <div class="water-consumption">
        Please add your latest Water Consumption below
        <AddWaterConsumption/>
        <ListWaterConsumption/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import AddWaterConsumption from '@/components/water-consumption/add.vue';
    import ListWaterConsumption from '@/components/water-consumption/list.vue'; // @ is an alias to /src

    @Component({
        components: {
            AddWaterConsumption, ListWaterConsumption,
        },
    })
    export default class WaterConsumption extends Vue {
    }
</script>
