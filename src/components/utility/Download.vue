<template>
    <div class="buttons buttons-center dwnld">
        <button class="button" disabled>
            <span class="hover"></span>
            <!-- <span class="icon">
                <Terminal /> -->
            <!-- <Diskette />
            </span> -->
            <span class="label">BETA VERSION</span>
        </button>
        <p class="font-size-000 font-weight-medium"></p>
    </div>
</template>

<script>
// import Diskette from '@/components/icons/Diskette'
// import Terminal from '@/components/icons/Terminal'

export default {
    name: 'Download',
    components: {
        // Diskette
        // Terminal
    }
}
</script>

<style lang="scss" scoped>
p {
    text-align: center;
    opacity: 0.5;
}
.dwnld {
    width: 100%;
    margin-top: 1.5em;
    margin-bottom: 0.5em;

    .button {
        width: 100%;
        justify-content: center;
        margin-right: 0;
    }
}
</style>
