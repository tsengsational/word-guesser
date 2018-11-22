<template>
   <div class="session" >
       <div class="game-container">
           <game></game>
       </div>
    </div> 
</template>

<script>
import Game from '../components/Game'

export default {
    name: "Session",
    components: {
        Game
    }

}
</script>

<style lang="scss" scoped>

</style>
