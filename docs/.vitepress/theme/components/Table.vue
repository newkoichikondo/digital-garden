<template>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Completed Date</th>
          <th>Word Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" :key="index">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.completedDate }}</td>
          <td>{{ book.words.toLocaleString() }} 語</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: {
      books: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f4f4f4;
    text-align: left;
  }
  </style>
  