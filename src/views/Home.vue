<template>
  <div class="home">
    <start-screen />
  </div>
</template>

<script>
import StartScreen from '../components/StartScreen'

export default {
  name: 'home',
  components: {
    StartScreen
  }
}
</script>

<style lang="scss" scoped>

.home {
  padding: 10px;
  width: 100%
}

</style>

