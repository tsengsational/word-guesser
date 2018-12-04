<template>
    <div class="statistics" :class="{show: menuOpen}" v-if="!loading">
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
           <div class="leader-container" @click="$router.push({name: 'leaderboard'})">
            <span class="leader-caption">Leaderboard</span>
            <button class="leader-btn" >
                <i class="ion icon ion-ios-medal"></i>
            </button>
        </div>
           <div class="menu-close">
               <button class="button" @click="toggleMenu"><i class="icon ion ion-ios-arrow-up"></i> Close</button>
           </div>
       </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState(["name", "difficulty", "score", "bank", "menuOpen", "loading"]),
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
    },
    methods: {
        ...mapMutations(["toggleMenu"])
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/mixins.scss";

.statistics {
    position: fixed;
    top: 0px;
    left: -6px;
    display: grid;
    grid-template-columns: [first] 33% [second] calc(33%/2) [middle] calc(33%/2) [third] 33% [end];
    justify-content: flex-end;
    width: calc(100% + 6px);
    z-index: 1;
    transform: translate( 0, -200px );
    transition: transform .3s;

    &.show {
        transform: translate( 0px );
    }

    @include tablet {
        top: 38px;
        width: 200px;
        transform: translate( -200px, 0 )
    }

    @include desktop {
        width: 200;
    }

    h3 {
        font-size: 14px;
        line-height: 18px;
        font-weight: 900;
        margin: 0;
        display: inline-block;
    }

    

    .player-name, .score, .difficulty, .bank, .menu-close, .leader-container {
        padding: 10px 20px;
        font-size: 14px;
        line-height: 18px;
        grid-column: first / end;
        background: $white;
        border: 1px solid $grayE1;
        margin: -1px;
        z-index: 1;

    }

    .menu-close {
        text-align: center;

        button {
            padding: 5px 15px;
        }

        i::before {
            font-size: 14px;
            position: relative;
            top: 1px;
        }
    }

    .leader-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

        span {
            font-size: 14px;
            line-height: 18px;
            font-weight: 900;
        }
    }

    .leader-btn {
        border-radius: 50%;
        background-color: $blue;
        color: $white;
        border: 1px solid $blue;
        width: 28px;
        height: 28px;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        
        cursor: pointer;

        i {
            &::before {
                font-size: 15px
            }
        }
    }
    
}
</style>
