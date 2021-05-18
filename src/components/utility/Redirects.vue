<template>
    <div class="redirects" :class="{ 'redirects--active': shown }">
        <p class="value font-family-mono font-size-100">{{ count }}</p>
        <p class="label">Redirects created</p>
    </div>
</template>

<script>
export default {
    name: 'Redirects',
    props: {
        stages: Array
    },
    data() {
        return {
            shown: false
        }
    },
    computed: {
        count() {
            const links = this.$store.getters.getLinks('old')
            const redirects = links.filter(link => {
                return link.status === true
            })
            return redirects.length
        }
    },
    methods: {
        checkShowing() {
            this.stages.forEach(item => {
                if (item.stage == 'intersection') {
                    this.shown = item.status
                }
            })
        }
    },
    mounted() {
        this.checkShowing()
    },
    watch: {
        $route() {
            this.checkShowing()
        }
    }
}
</script>

<style lang="scss" scoped>
.redirects {
    background: c('base-3');
    border-radius: 0.375em;
    padding: 1em;
    text-align: center;
    opacity: 0;
    visibility: hidden;
    box-shadow: 0 0.625em 1.25em rgba(35, 45, 75, 0.08);

    .value {
        margin: 0.25em 0;
    }

    &--active {
        animation: redirects-enter 0.6s forwards;

        @keyframes redirects-enter {
            from {
                opacity: 0;
                visibility: hidden;
                transform: translate(0, 2em);
            }
            to {
                opacity: 1;
                visibility: visible;
                transform: translate(0, 0);
            }
        }
    }
}
</style>
