<template>
    <div class="nav">
        <i class="ion icon ion-md-menu" @click="toggleMenu"></i>
    </div> 
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    name: "Navigation",
    computed: {
        ...mapState(["menuOpen"])
    },
    methods: {
        ...mapMutations(["toggleMenu"])
    }
    
}
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

.nav {
    height: 40px;
    position: fixed;
    padding: 5px;
    border: 1px solid $grayE1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -2px;

    @include tablet {
        justify-content: flex-start;
        padding: 5px calc( 50% - 300px );
    }

    @include desktop {
        padding: 5px calc( 50% - 500px );
    }
}

</style>

