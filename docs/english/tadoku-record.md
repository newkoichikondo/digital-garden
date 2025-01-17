---
title: "多読進捗状況"
description: "目標語数100万語に向けた多読の進捗状況を可視化。現在の達成率、読了語数、残り語数を円グラフで表示し、書籍ごとの詳細な記録も確認できます。"
keywords: ["多読", "目標達成率", "進捗状況", "語数", "読書記録", "読書管理", "読了記録", "読書進捗", "多読グラフ"]
---

# 多読進捗状況

## 目標達成率

<Chart :data="chartData" :options="chartOptions" />

### 現在の進捗状況
- **現在の読了語数**: {{ currentWords.toLocaleString() }} 語
- **残り語数**: {{ remainingWords.toLocaleString() }} 語
- **達成率**: {{ progressPercentage.toFixed(2) }} %

## 多読記録


<Table :books="books" />

## いつかは挑戦したい本

- [The London Eye Mystery](https://amzn.to/3DRwnOd)
- [Of Mice and Men](https://amzn.to/3PzkezL)





<script setup>
// Markdownから書籍データを解析する関数
function parseBooksFromMarkdown() {
  const rawBooks = `
- title: "Who Was Helen Keller?"
  author: "Gare Thompson"
  completedDate: "2025年1月9日"
  words: 8719

- title: "Who Was Steve Jobs?"
  author: "Pam Pollack"
  completedDate: "2025年1月10日"
  words: 7292

- title: "Diary of a Wimpy Kid"
  author: "Jeff Kinney"
  completedDate: "2025年1月16日"
  words: 19784

- title: "Who Was Albert Einstein?"
  author: "Jess Brallier"
  completedDate: "2025年1月17日"
  words: 8922
  `;
  return rawBooks
    .trim()
    .split("\n\n")
    .map((entry) => {
      const lines = entry.split("\n");
      return {
        title: lines[0].split(": ")[1].replace(/"/g, ""),
        author: lines[1].split(": ")[1].replace(/"/g, ""),
        completedDate: lines[2].split(": ")[1].replace(/"/g, ""),
        words: parseInt(lines[3].split(": ")[1], 10),
      };
    });
}

// 書籍データを取得
const books = parseBooksFromMarkdown();

// 現在の語数と目標
const currentWords = books.reduce((sum, book) => sum + book.words, 0);
const targetWords = 1000000;
const remainingWords = targetWords - currentWords;

// 達成率（％）
const progressPercentage = (currentWords / targetWords) * 100;

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
</script>
