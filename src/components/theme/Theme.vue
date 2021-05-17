<template>
    <button @click="switchTheme">THEME</button>
</template>

<script>
export default {
    name: 'Theme',
    data() {
        return {
            theme: null
        }
    },
    methods: {
        switchTheme() {
            const theme = this.theme == 'light' ? 'dark' : 'light'
            this.theme = theme
            document.documentElement.setAttribute('theme', theme)
        }
    },
    mounted() {
        this.theme = 'light'
    }
}
</script>

<style lang="scss" scoped></style>
