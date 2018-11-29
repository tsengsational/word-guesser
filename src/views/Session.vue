<template>
   <div class="session" >
       <div class="statistics">
           <div class="player-name">
               <h3>Player:</h3> {{this.name}}
           </div>
           <div class="score">
               <h3>Score:</h3> {{this.score.wins}}/{{this.score.losses}}
           </div>
           <div class="difficulty">
               <h3>Difficulty:</h3> {{diffName}}
           </div>
           <div class="bank">
               <h3>Hint Points:</h3> {{bank}}
           </div>
       </div>
       <div class="game-container">
           <game></game>
       </div>
    </div> 
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Game from '../components/Game';

export default {
    name: "Session",
    components: {
        Game
    },
    computed: {
        ...mapState(["name", "difficulty", "score", "bank"]),
        diffName() {
            let level = this.difficulty;
            switch ( level ) {
                case 1:
                    return "Easy";
                case 5:
                    return "Medium";
                case 10:
                    return "Hard";
                default:
                    return "Easy";
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.statistics {
    position: fixed;
    top: 0px;
    display: flex;
    width: 100%;
    justify-content: flex-end;

    .player-name, .score, .difficulty, .bank {
        padding: 20px;
    }
}

</style>
