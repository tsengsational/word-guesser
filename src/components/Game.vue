<template>
    <div class="game" v-if="!loading">
        <div class="spaces" >
            <span class="space" v-for="(space, key) in letters" :key="key" >
                <span :class="{show: guessed(space)}">{{space}}</span>
            </span>
            <div class="hint-tooltip-button tooltip-button" :class="{show: showHint}" @click="toggleHint">
                <i class="icon ion ion-md-help-circle"></i>
                <div class="hint-tooltip tooltip">
                    Get Hint:
                    <button class="button syll-btn" @click.prevent.stop="handleSyllable" :disabled="disableSyllables">Syllables (1pt)</button>
                    <button class="button def-btn" @click.prevent.stop="handleDefinition" :disabled="disableDefinition">Definition (2pts)</button>
                    <div class="tooltip-bank">
                        Available Hint Points: {{bank}}
                    </div>
                </div>
            </div>
        </div>
        <div class="hint">
            <div class="definitions" v-if="displayDefs.length > 0">
                <h3>Definitions:</h3>
                <ul>
                    <li v-for="(definition, key) in displayDefs" :key="key">{{definition}}</li>
                </ul>
            </div>
            <div class="syllables" v-if="hintObj.syllable">
                <h3>Syllables:</h3>
                {{syllables.count}}
            </div>
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
        <transition name="fade" >
            <div class="end" v-if="gameOver" :class="{show: gameOver}">
                <div class="end__container">
                    <h1 class="end__title" >{{endTitle}}</h1>
                    <p class="end__subtitle">You {{endCondition}}</p>
                    <h2 class="end__word">{{this.secretWord}}</h2>
                    <p class="end__points" v-if="(6 - badNum) > 0" >You earned {{6 - badNum}} Hint Points!</p>
                    <button class="end__button" @click="$router.go(-1)">Play Again?</button>
                </div>
            </div>
        </transition>
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
            alphabet: "abcdefghijklmnopqrstuvwxyz",
            showHint: false,
            hintObj: {
                syllable: false,
                definitions: false
            },
            displayDefs: []
        }
    },
    computed: {
        ...mapState([
            'secretWord',
            'difficulty',
            'hints',
            'bank',
            'loading'
            ]),
        alphaArray() {
            return this.alphabet.split('');
        },
        letters() {
            return this.secretWord.split('');
        },
        totalLetters() {
            let total = {}
            this.letters.forEach( letter => total[letter] ? total[letter]++ : total[letter] = 1 )
            return Object.keys(total).length;
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
        },
        lose() {
            return this.badGuesses.length === 6 ? true : false; 
        },
        win() {
            return this.guesses.length - this.badGuesses.length === this.totalLetters ? true : false;
        },
        gameOver() {
            if ( this.lose || this.win ) {
                return true;
            } else {
                return false;
            }
        },
        endTitle() {
            return this.win ? "Congratulations!" : "Sorry"
        },
        endCondition() {
            return this.win ? "Won" : "Lost"
        },
        syllables() {
            return this.hints.syllables ? this.hints.syllables : "None"
        },
        definitions() {
            if ( this.hints && this.hints.hasOwnProperty("results") && this.hints.results.length > 0 ){
                const results = this.hints.results;
                const definitions = results.map( result => result.definition );
                return definitions
            } else {
                return []
            }
        },
        disableSyllables() {
            if ( this.hintObj.syllable || this.bank == 0 ) {
                return true;
            } else {
                return false;
            }
        },
        disableDefinition() {
            if ( this.hintObj.definitions || this.bank < 2 || this.definitions.length === 0 ) {
                return true;
            } else {
                return false;
            }
        }
    },
    watch: {
        win( val ) {
            if ( val === true ) {
                const score = 6 - this.badNum;
                this.addToBank( score );

                switch ( this.difficulty ) {
                    case "1":
                        this.setScore( { wins: 1 } );
                        break;
                    case "5":
                        this.setScore( { wins: 2 } );
                        break;
                    case "10":
                        this.setScore( { wins: 3 } );
                }
            }
        }, 
        lose( val ) {
            if ( val === true ) {
                switch ( this.difficulty ) {
                    case "1":
                        this.setScore( { losses: 1 } );
                        break;
                    case "5":
                        this.setScore( { losses: 2 } );
                        break;
                    case "10":
                        this.setScore( { losses: 3 } );
                }
            }
        }
    },
    async created() {
        const difficulty = this.difficulty
        let word = await this.getWord(difficulty);
        while ( word.includes(" ") || word.includes("-") ) {
            word = await this.getWord();
        }
        const hints = await this.getHints(word);
        this.setProperty(["secretWord", word]);
        this.setProperty(["hints"], hints);
    },
    methods: {
        ...mapMutations([
            'setProperty', 'addToBank', 'decrementBank', 'setScore'
        ]),
        getWord( difficulty ) {
            this.setProperty( [ "loading", true ] );
            const origin = window.location.protocol + '//' + window.location.host;

            const diffQuery = `?difficulty=${difficulty}`

            const headers = new Headers({
                origin: origin
            })

            return fetch(`https://cors-anywhere.herokuapp.com/http://app.linkedin-reach.io/words${diffQuery}`, {headers: headers})
                .then(resp => {
                    return resp.text();
                    })
                .then(text => {
                    let string = new String(text);
                    let lib = string.split('\n');
                    let ceiling = lib.length;
                    let rand = Math.floor( Math.random() * ceiling );
                    let word = lib[rand];
                    this.setProperty( [ "loading", false ] );
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
        },
        toggleHint() {
            this.showHint = !this.showHint;
        },
        getHints(word) {
            const headers = new Headers({
            "X-Mashape-Key": "vrYXh8KRj2mshS9epaur1Oc3K289p1qC01NjsnnzskjPVnRhmX",
            "Accept": "application/json"
            })
            const searchUrl = 'https://wordsapiv1.p.mashape.com/words/' + word

            fetch(searchUrl, {headers: headers})
                .then(resp => resp.json())
                .then(json => {
                    const word = json
                    this.setProperty(["hints", word])
                })
        },
        handleSyllable() {
            if ( this.bank >= 1 ) {
                this.decrementBank( 1 )
                this.hintObj.syllable = true
            }
        },
        handleDefinition() {

            if ( this.bank >= 2 && this.definitions.length > 0 ) {
                this.decrementBank( 2 )
                let definition = this.definitions.shift();
                this.displayDefs.push( definition );
            }
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

    .spaces {

        @include desktop {
            grid-column-start: left;
            grid-column-end: content-end;
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

    .hint {
        grid-column: content / content-end;
        text-align: center;
        
        h3 {
            display: inline-block;
            margin: 0;
        }

        @include desktop {
            grid-column: left / content-end;
        }
    }

    .button {
        padding: 2px 6px;
        display: block;
        margin: 5px auto;
    }
    
    .hint-tooltip {
        text-align: center;
    }

    .guesses {
        padding: 0 20px;

        @include desktop {
            grid-column-start: left;
            grid-column-end: right;
        }
        
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
            min-height: 40px;

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

    .end {
        display: none;

        &.show {
            display: block;
        } 

        &__container {
            position: fixed;
            width: calc( 100vw - 40px);
            padding: 50px 0;
            top: 50px;
            left: 20px;
            text-align: center;
            z-index: 3;
            background-color: $white;
        }

        &__title {
            @include title-font;
            @include logo;
            font-size: 40px;
            line-height: 36px;

            &::before, &::after {
                @include logo-before-after;
            }

            &::before {
                top: 10px;
            }
        }

        &__subtitle {
            @include body-font;
            font-size: 22px;
            line-height: 26px;
        }

        &__word {
            text-transform: uppercase;
        }

        &__button {
            @include button;
            width: 150px;
            height: 40px;
            font-size: 14px;
            line-height: 18px;
            font-weight: 900;
        }

        &::after {
            content: "";
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 2;
            background: $blue-to-pink;
        }
    }
}
</style>
