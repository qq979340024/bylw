<template>

</template>

<script>
export default {
    name: "Skip",
    data(){
        return{
            currentPath:JSON.parse(window.sessionStorage.getItem("currentPath")),
        }
    },
    mounted() {
        this.initPath();
    },
    methods:{
        initPath(){
            this.$router.replace(this.currentPath);
        }
    }
}
</script>

<style scoped>

</style>