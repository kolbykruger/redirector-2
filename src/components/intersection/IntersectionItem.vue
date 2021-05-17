<template>
    <div class="intersection-item">
        <p class="font-family-mono font-size-000">{{ link.url.pathname }}</p>
    </div>
</template>

<script>
//import External from '@/components/icons/External'

export default {
    name: 'IntersectionItem',
    props: {
        link: {
            type: Object
        }
    },
    components: {
        //External
    }
}
</script>

<style lang="scss" scoped>
.intersection-item {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    background: c('base-0');
    padding: 0.85em 1em;
    padding-right: 0.4em;
    margin-bottom: 0.5em;
    border-radius: 0.375em;
    box-shadow: 0 0.625em 1.25em rgba(35, 45, 75, 0.08);
}
</style>
