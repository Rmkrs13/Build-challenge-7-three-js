<template>
    <div id="configurator">
      <h1>Sneaker Configurator</h1>
      <div>
        <label for="laces-color">Veterskleur:</label>
        <input id="laces-color" type="color" v-model="lacesColor" />
      </div>
      <div>
        <label for="sole-color">Zoolkleur:</label>
        <input id="sole-color" type="color" v-model="soleColor" />
      </div>
      <div>
        <label for="extra-option">Extra Optie:</label>
        <input id="extra-option" type="text" v-model="extraOption" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        lacesColor: '#ffffff',
        soleColor: '#000000',
        extraOption: '',
      };
    },
  };
  </script>
  
  <style>
  #configurator {
    position: absolute;
    top: 10px;
    left: 10px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  </style>  