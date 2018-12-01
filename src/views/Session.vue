<template>
   <div class="session" >
       <navigation></navigation>
       <menue></menue>
       <div class="game-container">
           <game></game>
       </div>
    </div> 
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Game from '../components/Game';
import Navigation from "../components/Navigation";
import Menue from "../components/Menue";

export default {
    name: "Session",
    components: {
        Game,
        Navigation,
        Menue
    },
    computed: {
    },
    methods: {    
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

</style>
