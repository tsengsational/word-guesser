<template>
    <div class="game">
        <div class="spaces" >
            <span class="space" v-for="(space, key) in letters" :key="key" >
                <span :class="{show: guessed(space)}">{{space}}</span>
            </span>
        </div>
        <div class="guesses">
            <h2>Guesses:</h2>
            <div class="guess-container" >
                <span class="guess" v-for="(guess, key) in guesses" :key="key" :class="{ bad: isBadGuess( guess ) }" >{{guess}}</span>
            </div>
            <h2>Strikes ({{ badNum }}/6):</h2>
            <div class="strikes-container">
                <div class="strike" v-for="(strike, key) in badGuesses" :key="key" ><i class="icon ion ion-md-close-circle"></i> </div>
            </div>
        </div>
        <div class="alphabet">
            <button class="letter-btn" v-for="(letter, key) in alphaArray" :key="key" :disabled="guessed(letter)" :value="letter" @click="guess(letter)" >{{letter}}</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: "Game",
    data() {
        return {
            words: [],
            guesses: [],
            alphabet: "abcdefghijklmnopqrstuvwxyz"
        }
    },
    computed: {
        ...mapState([
            'secretWord'
            ]),
        alphaArray() {
            return this.alphabet.split('');
        },
        letters() {
            return this.secretWord.split('');
        },
        lettersCodex() {
            let codex = {}
            this.letters.forEach( letter => {
                codex[letter] = true;
            });
            return codex;
        },
        badGuesses() {
            let badGuesses = this.guesses.filter( letter => !this.lettersCodex[letter] )
            return badGuesses
        },
        badNum() {
            return this.badGuesses.length
        }
    },
    async created() {
        let word = await this.getWord();
        while ( word.includes(" ") || word.includes("-") ) {
            word = await this.getWord();
        }
        this.setProperty(["secretWord", word]);

    },
    methods: {
        ...mapMutations([
            'setProperty'
        ]),
        getWord() {
            // const headers = new Headers({
            // "X-Mashape-Key": "vrYXh8KRj2mshS9epaur1Oc3K289p1qC01NjsnnzskjPVnRhmX",
            // "Accept": "application/json"
            // })

            // return fetch('https://wordsapiv1.p.mashape.com/words/?random=true', {headers: headers})
            //     .then(resp => resp.json())
            //     .then(json => {
            //         const word = json.word
            //         return word
            //     })
            const origin = window.location.protocol + '//' + window.location.host;

            const headers = new Headers({
                origin: origin
            })

            return fetch('https://cors-anywhere.herokuapp.com/http://app.linkedin-reach.io/words', {headers: headers})
                .then(resp => {
                    return resp.text()
                    })
                .then(text => {
                    let string = new String(text)
                    let lib = string.split('\n')
                    let ceiling = lib.length
                    let rand = Math.floor( Math.random() * ceiling )
                    let word = lib[rand]
                    return word
                    })
        },
        guess( letter ) {
            this.guesses.push(letter)
        },
        guessed( letter ) {
            return this.guesses.includes( letter ) ? true : false;
        },
        isBadGuess( letter ) {
            return this.badGuesses.includes( letter ) ? true : false;
        }
    }    
}
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

.game {
    width: 100vw;
    height: 100vh;
    background-color: $white;
    display: grid;
    grid-template-columns: [first] 20px [content] calc(100% - 40px) [content-end] 20px [end]; 

    @include tablet {
        grid-template-columns: [first] calc( 50% - 320px ) [content] 640px [content-end] calc( 50% - 320px ) [end]
    }

    @include desktop {
        grid-template-columns: [first] calc( 50% - 500px ) [left] 500px [right] 500px [content-end] calc( 50% - 500px ) [end];
    }

    .spaces, .guesses, .alphabet {
        grid-column-start: content;
        grid-column-end: content-end;
    }

    .spaces, .guesses {

        @include desktop {
            grid-column-start: left;
            grid-column-end: right;
        }
    }

    .spaces {
        padding: 20px 0 10px;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        @include tablet {
            padding: 50px 0;
        }

        .space {
            font-size: 25px;
            display: block;
            position: relative;
            margin-left: 5px;
            min-width: 15px;
            text-transform: uppercase;
            text-align: center;
            max-width: 30px;

            @include tablet {
                font-size: 40px;
                min-width: 30px;
            }

            span {
                opacity: 0;
                transition: opacity .3s;

                &.show {
                    opacity: 1;
                }
            }
            
            &::after {
                width: 20px;
                height: 1px;
                background-color: $black3;
                content: "";
                display: block;
                position: relative;
                left: calc(50% - 10px);

                @include tablet {
                    width: 30px;
                }
            }
        }
    }

    .guesses {
        padding: 0 20px;
        
        h2 {
            @include title-font;
            font-size: 20px;
            margin-bottom: 0;

            @include tablet {
                font-size: 30px;
            }
        }

        .strikes-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin-bottom: 20px;

            .strike {
                color: $pink;
                font-size: 20px;
                margin-right: 10px;
            }
        }

        .guess-container {
            display: flex;
            flex-wrap: wrap;
            min-height: 40px;
        }

        .guess {
            font-size: 24px;
            line-height: 28px;
            margin-right: 10px;
            font-weight: 900;
            text-transform: uppercase;

            &.bad {
                color: $pink;
            }
        }
    }

    .alphabet {

        @include desktop {
            grid-column-start: right;
            grid-column-end: content-end;
        }
    }

    .letter-btn {
        @include button;
        font-size: 14px;
        line-height: 18px;
        font-weight: 900;
        width: 30px;
        height: 30px;
        margin: 5px;

        @include tablet {
            width: 50px;
            height: 50px;
            font-size: 18px;
            line-height: 22px;
        }
    }

    .alphabet {
        text-align: center;
    }
}
</style>
