# 多読進捗状況

## 目標達成率

<Chart :data="chartData" :options="chartOptions" />

### 現在の進捗状況
- **現在の読了語数**: {{ currentWords.toLocaleString() }} 語
- **残り語数**: {{ remainingWords.toLocaleString() }} 語

## 多読記録

<Table :books="books" />

<script setup>
// JSON データをインポート
import progressData from './progress.json';

// 現在の語数と目標
const currentWords = progressData.books.reduce((sum, book) => sum + book.words, 0);
const targetWords = 1000000;
const remainingWords = targetWords - currentWords;

// グラフ用のデータ
const chartData = {
  labels: ['達成済み', '残り'],
  datasets: [
    {
      label: '目標達成率',
      data: [currentWords, remainingWords],
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(192, 192, 192, 0.6)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(192, 192, 192, 1)'],
      borderWidth: 1,
    },
  ],
};

// グラフのオプション
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw.toLocaleString()} 語`,
      },
    },
  },
};

// テーブル用のデータ
const books = progressData.books;
</script>
