<template>
    <div class="progress-bar">
      <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      progress: {
        type: Number,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .progress-bar {
    background-color: #ddd;
    border-radius: 5px;
    height: 10px;
    margin: 10px 0;
    width: 100%;
  }
  .progress {
    background-color: #69ff47;
    height: 100%;
    border-radius: 5px;
    transition: width 0.3s ease;
  }
  </style>