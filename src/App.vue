<template>
    <transition name="sidebar" mode="in-out">
        <Aside v-if="sidebar" />
    </transition>
    <main>
        <router-view v-slot="{ Component }">
            <transition name="slide" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
    <Decor :status="decor" />
</template>

<script>
import Aside from '@/components/Aside'
import Decor from '@/components/Decor'

export default {
    components: {
        Aside,
        Decor
    },
    data() {
        return {
            sidebar: false,
            decor: false
        }
    },
    mounted() {},
    watch: {
        $route(value) {
            this.sidebar = value.name.toLowerCase() != 'home' ? true : false
            this.decor = value.name.toLowerCase() != 'home' ? true : false
        }
    }
}
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}

#app {
    min-height: 100vh;
}

body {
    @extend .font-family-sans;
    font-size: 16px;
    background: c('base-1');
    color: c('default');
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
}

main {
    min-height: 85vh;

    .page {
        min-height: 85vh;

        &:not(#home) {
            margin-left: 328px;
            margin-top: 15vh;
        }
    }
}

.page {
    padding: 0 270px;

    @media (max-width: 1920px) {
        padding: 0 135px;
    }
    @media (max-width: 1350px) {
        padding: 0 68px;
    }
}

a {
    text-decoration: none;
    color: c('primary-base');
}

p {
    @extend .font-size-base;
    color: c('default-0');
}

small {
    @extend .font-size-000;
    color: c('default-0');
}

h1 {
    @extend .font-size-300;
    @extend .font-weight-medium;
}

h2 {
    @extend .font-size-200;
    @extend .font-weight-medium;
}

h3 {
    @extend .font-size-100;
    @extend .font-weight-medium;
}

h1,
h2,
h3 {
    color: c('default-0');
}

ol,
ul,
dl,
li,
li::before {
    @extend .font-size-base;
}

table {
    @extend .font-size-base;
}

section {
    &.section-sm {
    }

    &.section-md {
    }

    &.section-lg {
        min-height: 100vh;
    }

    .container {
        max-width: 1100px;
        width: 100%;
    }
}

input,
label {
    @extend .font-size-000;
    @extend .font-weight-normal;
}

.highlight {
    color: c('primary-base');
    font-weight: 500;
}

::selection {
    background: c('primary-base');
}

.slide-enter-active,
.slide-leave-active {
    transition-duration: 0.6s;
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
    overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translate(0, 2em);
}

.sidebar-enter-active {
    transition-duration: 0.6s;
    transition-delay: 0.6s;
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
    overflow: hidden;
}
.sidebar-leave-active {
    transition-duration: 0.6s;
    transition-delay: 0s;
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
    overflow: hidden;
}
.sidebar-enter-from,
.sidebar-leave-to {
    opacity: 0;
    transform: translate(-3em, 0);
}
</style>
