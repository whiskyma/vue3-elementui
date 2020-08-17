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
           
        }
    },
    computed: {
        ...mapGetters([])
    },
}
</script>

<style lang="stylus" scoped>

</style>
