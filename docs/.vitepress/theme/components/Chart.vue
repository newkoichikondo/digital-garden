<template>
    <canvas ref="chartCanvas" style="width: 100%; height: 400px;"></canvas>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  // Chart.js のモジュールを登録
  Chart.register(...registerables);
  
  export default {
    props: {
      data: {
        type: Object,
        required: true,
      },
      options: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      new Chart(this.$refs.chartCanvas, {
        type: 'doughnut',
        data: this.data,
        options: this.options,
      });
    },
  };
  </script>
  