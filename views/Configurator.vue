<template>
    <div>
      <ConfiguratorControls @update-color="handleUpdateColor" />
      <canvas id="three-canvas"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      handleUpdateColor({ part, color }) {
        // Update Three.js model colors
        console.log(`Updating ${part} color to ${color}`);
      },
    },
  };
  </script>