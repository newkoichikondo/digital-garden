<template>
    <canvas ref="chartCanvas"></canvas>
  </template>
  
  <script>
  import { Chart } from 'chart.js';
  
  export default {
    props: ['data', 'options'],
    mounted() {
      new Chart(this.$refs.chartCanvas, {
        type: 'bar', // グラフタイプ（bar, line, etc.）
        data: this.data,
        options: this.options,
      });
    },
  };
  </script>
  