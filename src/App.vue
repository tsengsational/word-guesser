<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
@import './assets/mixins.scss';

body {
  margin: 0;
}

#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  background: $blue-to-pink;
  display: flex;
  align-items: center;
  justify-content: center;
  
  div, span {
    box-sizing: border-box;
  }
}

</style>
