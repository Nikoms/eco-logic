<template>
    <div class="small">
        <line-chart :chart-data="datacollection"></line-chart>
        <button @click="fillData()">Randomize</button>
    </div>
</template>

<script>
    import LineChart from './LineChart.js';

    export default {
        components: {
            LineChart,
        },
        data() {
            return {
                datacollection: null,
            };
        },
        mounted() {
            this.fillData();
        },
        methods: {
            fillData() {
                this.datacollection = {
                    labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [
                        {
                            label: 'Data One',
                            borderColor: '#FC2525',
                            pointBackgroundColor: 'white',
                            borderWidth: 1,
                            pointBorderColor: 'white',
                            backgroundColor: this.gradient,
                            data: [40, 39, 10, 40, 39, 80, 40],
                        }, {
                            label: 'Data Two',
                            borderColor: '#05CBE1',
                            pointBackgroundColor: 'white',
                            pointBorderColor: 'white',
                            borderWidth: 1,
                            backgroundColor: this.gradient2,
                            data: [60, 55, 32, 10, 2, 12, 53],
                        },
                    ],
                };
            },
            getRandomInt() {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
            },
        },
    };
</script>

<style>
    .small {
        max-width: 600px;
        margin: 150px auto;
    }
</style>
