<template>
    <div class="start-screen">
        <h1>
            Word Guesser
        </h1>

        <button class="start-button" @click="start" >
            Play
        </button>
    </div>

</template>

<script>
export default {
    name: "StartScreen",
    methods: {
        start() {
            let route = {
                name: "session"
            }
            this.$router.push(route)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/mixins.scss";

.start-screen {
    width: 100%;
    padding: 20px 0 40px;
    background-color: $white;
    border-radius: 5px;
    text-align: center;

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
        transform: rotate(-5deg);
        font-size: 30px;
        stroke: 2px $white;
        text-shadow: -5px -1px 0 $white, 5px -1px 0 $white, -5px 1px 0 $white, 5px 1px 0 $white;

        @include tablet {
            font-size: 40px;
        }

        @include desktop {
            font-size: 60px;
            text-shadow: -6px -1px 0 $white, 6px -1px 0 $white, -6px 1px 0 $white, 6px 1px 0 $white;
        }

        &::after, &::before {
            width: 150px;
            height: 1px;
            background-color: $black3;
            content: "";
            display: block;
            margin-left: calc( 50% - 150px/2 );
            position: relative;
            z-index: -1;

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

    .start-button {
        width: 150px;
        height: 40px;
        font-size: 14px;
        line-height: 18px;
        font-weight: 900;
        @include button;
    }

}

</style>
