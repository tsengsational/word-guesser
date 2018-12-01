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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.button {
  @include button;
}

// tooltip styles
.tooltip-button {
  position: relative;
  width: 14px;
  height: 14px;
  color: $blue;
  display: inline-block;
  border-radius: 50%;
  font-size: 12px;
  text-align: center;
  line-height: 14px;
  font-weight: 900;
  margin-left: 10px;

  i {
    &::before {
      font-size: 18px;
    }
  }


  .tooltip {
      position: absolute;
      z-index: -1;
      opacity: 0;
      transform: translateY( -20px );
      transition: opacity .3s, transform .3s;
      color: $black3;
      font-size: 14px;
      font-weight: normal;
      width: 200px;
      padding: 10px;
      background: $white;
      border: 1px solid $grayE1;
      left: -60px;
      top: 17px;
      text-align: left;
  }

  &:hover, &.show {

      .tooltip {
          opacity: 1;
          z-index: 1;
          transform: translateY( 0px );
          transition: opacity .3s, transform .3s;
      }
  }
}

</style>
