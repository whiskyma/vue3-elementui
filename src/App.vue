<template lang="pug">
#app
    router-view
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: 'app',
    components: {

    },
    data(){
        return {
           msg: 'this is a msg'
        }
    },
    computed: {
        ...mapGetters([])
    },
}
</script>

<style lang="stylus" scoped>

</style>
