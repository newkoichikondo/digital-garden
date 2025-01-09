<template>
    <canvas ref="chartCanvas" style="width: 100%; height: 400px;"></canvas>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  // Chart.js のモジュールを登録
  Chart.register(...registerables);
  
  export default {
    mounted() {
      new Chart(this.$refs.chartCanvas, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow'],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3],
              backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
              borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  };
  </script>
  