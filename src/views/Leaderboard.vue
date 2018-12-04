<template>
    <div class="leaderboard">
        <h1 class="leaderboard__title">Leaderboard</h1>
        <div class="player-container">
            <table class="leaderboard__table">
                <tr class="table-headers">
                    <th>
                        Player Name
                    </th>
                    <th>
                        Wins
                    </th>
                    <th>
                        Losses
                    </th>
                    <th>
                        Total Points
                    </th>
                </tr>
                <tr class="table-player" v-for="(player, key) in topPlayers" :key="key">
                    <td>
                        {{player.id}}
                    </td>
                    <td>
                        {{player.wins}}
                    </td>
                    <td>
                        {{player.losses}}
                    </td>
                    <td>
                        {{player.points}}
                    </td>
                </tr>

            </table>
        </div>
        <button class="back-btn button" @click="$router.go(-1)">Go Back</button>
    </div>
</template>

<script>
import { db } from '../main.js';

export default {
    data() {
        return {
            topPlayers: []
        }
    },
    firestore() {
        return {
            topPlayers: db.collection("players").orderBy("points", "desc").limit(10)
        }
    }    
}
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

.leaderboard {
    width: 100vw;
    height: 100vh;
    background: $white;
    text-align: center;
    padding: 20px;
    border-radius: 10px;

    @include tablet {
        width: 600px;
        padding:  0 50px 25px;
        margin: 0 calc( 50vw - 300px );
        height: auto;
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
    
    &__table {
        text-align: left;
        width: 100%;
        border: 1px solid $grayE1;
        border-collapse: collapse;
        // padding: 10px;

        @include tablet {
            width: 500px;
            margin: 50px calc( 50% - 250px ) 30px;
        }

        th, td {
            padding: 5px;

            @include tablet {
                padding: 10px 20px;
            }

            &:first-of-type {
                width: 50%;
            }
        }

        tr:nth-child(even) {
            background-color: $grayE1;
        }
    }

    .back-btn {
        font-size: 14px;
        padding: 10px 20px;
        
    }
}

</style>
