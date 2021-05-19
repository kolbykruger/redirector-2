<template>
    <button class="theme" @click="switchTheme">
        <div class="theme-tray" :class="'theme-tray--' + theme">
            <span class="theme-icon theme-icon-light" :class="{ 'theme-icon--active': theme == 'light' }">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-moon"
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </span>

            <span class="theme-icon theme-icon-dark" :class="{ 'theme-icon--active': theme == 'dark' }">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-sun"
                >
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            </span>
        </div>
    </button>
</template>

<script>
export default {
    name: 'Theme',
    data() {
        return {
            theme: 'light'
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

<style lang="scss" scoped>
.theme {
    position: fixed;
    bottom: 1.5em;
    right: 1.5em;
    --size: 3em;
    width: var(--size);
    height: var(--size);
    padding: 0;
    border-radius: 0.375em;
    color: c('default-2');
    overflow: hidden;
    outline: none;
    opacity: 0.35;

    &:hover {
        background: c('base-0');
        opacity: 1;
    }

    &:hover,
    &:focus {
        outline: none;
    }

    &-tray {
        transition: 0.6s cubic-bezier(0.53, 0.21, 0, 1);

        &--dark {
            transform: translate(0, -3em);
        }

        &--light {
            transform: translate(0, 0);
        }
    }

    &-icon {
        --size: 3em;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--size);
        height: var(--size);
    }
}
</style>
