<template>
    <div class="intersection-item">
        <p class="font-family-mono font-size-000">{{ link.url.pathname }}</p>
        <a class="button button-style-icon" target="_blank" rel="nofollow norefer" :href="link.url">
            <External />
        </a>
    </div>
</template>

<script>
import External from '@/components/icons/External'

export default {
    name: 'IntersectionItem',
    props: {
        link: {
            type: Object
        }
    },
    components: {
        External
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
    padding: 0.65em 1.5em;
    padding-right: 0.4em;
    margin-bottom: 0.5em;
    border-radius: 0.375em;
}
</style>
