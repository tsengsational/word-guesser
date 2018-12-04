<template>
    <div class="start-screen">
        <h1>
            Word Guesser
        </h1>

        <div class="difficulty">
            <span class="difficulty__arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="8.573" height="5.287" viewBox="0 0 8.573 5.287"><path fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M7.573 1L4.286 4.287 1 1"/></svg>
            </span>
            <select class="difficulty__select" name="difficulty" id="difficulty" @change="changeDifficulty">
                <option value="" :selected="selectDisabled" disabled>Select Difficulty</option>
                <option value="1" :selected="selectDifficulty === '1'" >Easy</option>
                <option value="5" :selected="selectDifficulty === '5'">Medium</option>
                <option value="10" :selected="selectDifficulty === '10'">Hard</option>
            </select>
            <label class="name-label" for="name">
            Player Name
            </label>
            <input class="name" v-model="name" id="name" type="text">
        </div>

        <button class="start-button" :disabled="!playReady" @click="start" >
            Play
        </button>
        <div class="leader-container">
            <button class="leader-btn" @click="$router.push({name: 'leaderboard'})">
                <i class="ion icon ion-ios-medal"></i>
            </button>
            <h3 class="leader-caption">Leaderboard</h3>
        </div>
    </div>

</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    name: "StartScreen",
    data() {
        return {

        }
    },
    computed: {
        ...mapState( [ "score", "difficulty" ] ),
        playReady() {
            return this.name.length > 0 ? true : false;
        },
        name: {
            get() {
                return this.$store.state.name;
            },
            set(value) {
                this.setProperty(['name', value])
            }
        },
        selectDisabled() {
            let totalGames = this.score.wins + this.score.losses;

            return totalGames > 0 ? false : true;
        },
        selectDifficulty() {
            if ( !this.selectDisabled ) {
                return this.difficulty;
            } else {
                return false;
            }
        }
    },
    methods: {
        ...mapMutations([
            'setProperty'
            ]),
        start() {
            this.setProperty(['name', this.name])
            let route = {
                name: "session"
            }
            this.$router.push(route)
        },
        changeDifficulty(event) {
            let difficulty = event.target.value;
            this.setProperty(['difficulty', difficulty]);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/mixins.scss";

.start-screen {
    width: 100%;
    padding: 20px 0 60px;
    background-color: $white;
    border-radius: 5px;
    text-align: center;
    position: relative;

    @include tablet {
        width: 640px;
        margin: 0 calc( 50% - 320px );
    }

    @include desktop {
        width: 1000px;
        margin: 0 calc( 50% - 500px );
    }

    h1 {
        @include title-font;
        @include logo;
        font-size: 30px;


        @include tablet {
            font-size: 40px;
        }

        @include desktop {
            font-size: 60px;
            text-shadow: -6px -1px 0 $white, 6px -1px 0 $white, -6px 1px 0 $white, 6px 1px 0 $white;
        }

        &::after, &::before {
            @include logo-before-after;

            @include tablet {
                width: 200px;
                margin-left: calc( 50% - 100px );
            }

            @include desktop {
                width: 300px;
                margin-left: calc( 50% - 150px);
            }
        }

        &::after {
            top: -5px;
        }

        &::before {
            top: 10px;

            @include tablet {
                top: 15px;
            }

            @include desktop {
                top: 20px;
            }
        }
    }

    .difficulty {
        @include select;
        width: 200px;
        margin: 0 calc( 50% - 100px) 20px;
    }

    .start-button {
        width: 150px;
        height: 40px;
        font-size: 14px;
        line-height: 18px;
        font-weight: 900;
        @include button;
    }

    
    .name {
        width: 200px;
        height: 34px;
        padding: 2px 12px;
        box-sizing: border-box;
        display: block;
        border: 2px solid $grayE1;
        font-size: 14px;
        line-height: 18px;

        &-label {
            width: 200px;
            text-align: left;
            margin-bottom: 5px;
            display: block;
            font-size: 12px;
            color: $gray6;
        }
    }

    .leader-container {
        position: absolute;
        right: 10px;
        bottom: 10px;

        .leader-caption {
            position: absolute;
            right: 36px;
            bottom: 5px;
            margin-bottom: 0;
            font-size: 14px;

            @include tablet {
                opacity: 0;
                transform: translateX(20px);
                transition: all .3s;
            }
        }

        &:hover {
            .leader-caption {

                @include tablet {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
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
