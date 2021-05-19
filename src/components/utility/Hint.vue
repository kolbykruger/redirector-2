<template>
    <section class="hint" v-if="show">
        <div class="hint-icon">
            <i fill="currentColor" style="display: inline-block;"
                ><svg
                    fill="none"
                    height="32"
                    width="32"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="display: inline-block; vertical-align: middle;"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="8"></line></svg
            ></i>
        </div>
        <p class="hint-title font-size-000 font-weight-bold" v-if="title">
            {{ title }}
        </p>
        <div class="hint-description" v-if="description">
            <p class="hint-text font-size-000" v-html="description"></p>
        </div>
        <div class="hint-dismiss">
            <button class="font-weight-medium" @click="show = !show">Dismiss</button>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Hint',
    props: {
        title: String,
        description: String
    },
    data() {
        return {
            show: true
        }
    },
    mounted() {
        this.show = true
    },
    watch: {
        $route() {
            this.show = false
        }
    }
}
</script>

<style lang="scss" scoped>
.hint {
    position: fixed;
    bottom: 2em;
    right: 2em;
    padding: 1.5em 2em;
    max-width: 320px;
    background: c('base-0');
    border-color: c('quartnary-base');
    border-left: 0.25em solid c('quartnary-base');
    border-radius: 0.275em;
    box-shadow: 0 0.625em 1.25em rgba(35, 45, 75, 0.08);
    visibility: hidden;
    opacity: 0;
    transform: translate(0, 3em);
    animation-delay: 0.6s;
    animation: hint-enter 0.3s cubic-bezier(0.53, 0.21, 0, 1) forwards;
    user-select: none;
    z-index: 10;

    @keyframes hint-enter {
        from {
            visibility: hidden;
            opacity: 0;
            transform: translate(0, 3em);
        }
        to {
            visibility: visible;
            opacity: 1;
            transform: translate(0, 0);
        }
    }

    &-icon {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
        padding: 0.5em;
        background: c('base-1');
        border-radius: 50%;
        cursor: pointer;

        svg circle,
        svg line {
            stroke: c('quartnary-base');
        }
    }
    &-title {
        margin-bottom: 0.5em;
    }
    &-dismiss {
        text-align: left;
        margin-top: 1em;

        button {
            color: c('default-0');
            font-size: 1rem;
            padding: 0;

            &:hover {
                color: c('quartnary-base');
            }
        }
    }
}
</style>
