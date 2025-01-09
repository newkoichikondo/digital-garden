<Chart :data="chartData" :options="chartOptions" />

<script setup>
const chartData = {
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      label: 'Reading Progress',
      data: [5, 10, 15],
      backgroundColor: ['rgba(75, 192, 192, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)'],
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
</script>
