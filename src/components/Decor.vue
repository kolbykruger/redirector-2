<template>
    <span ref="decor" class="decor" :class="{ 'decor-expanded': status }">
        <img src="/decor.jpg" alt="" />
    </span>
</template>

<script>
export default {
    name: 'Decor',
    props: {
        status: Boolean
    }
}
</script>

<style lang="scss" scoped>
.decor {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 3vh;
    background: c('tertiary-base');
    z-index: -1;
    pointer-events: none;
    user-select: none;
    transition: max-height 0.6s cubic-bezier(0.77, 0, 0.175, 1);
    overflow: hidden;

    &.decor-expanded {
        transition-delay: 0.05s;
        max-height: 15vh;
    }

    img {
        object-fit: cover;
        width: 200%;
        height: 100%;
        animation: decor 16s linear 2s infinite;

        @keyframes decor {
            0% {
                object-position: 50% 0%;
            }
            25% {
                object-position: 50% 95%;
                background-size: 250%;
            }
            50% {
                object-position: 50% 95%;
            }
            75% {
                object-position: 50% 95%;
            }
            100% {
                object-position: 50% 5%;
            }
        }
    }
}
</style>
