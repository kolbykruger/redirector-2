<template>
    <div class="redirects">
        <hr />
        <p>Redirects:</p>
        <p>{{ count }}</p>
    </div>
</template>

<script>
export default {
    name: 'Redirects',
    computed: {
        count() {
            const links = this.$store.getters.getLinks('old')
            const redirects = links.filter(link => {
                return link.status === true
            })
            return redirects.length
        }
    }
}
</script>

<style lang="scss" scoped></style>
