<template>
    <div class="tooltip">
        <span class="tooltip-indicator" tabindex="0">
            <Question v-if="indicator == 'question'" />
        </span>
        <span class="tooltip-panel" v-html="tooltip"></span>
    </div>
</template>

<script>
import Question from '../components/icons/Question'

export default {
    name: 'Tooltip',
    props: {
        indicator: String,
        tooltip: String
    },
    components: {
        Question
    }
}
</script>

<style lang="scss" scoped>
.tooltip {
    position: relative;
    display: inline-flex;

    &-indicator {
        cursor: pointer;

        &:hover,
        &:focus {
            + .tooltip-panel {
                visibility: visible;
                opacity: 1;
                transform: translate(1em, 0);
            }
        }
    }

    &-panel {
        position: absolute;
        top: 0;
        left: 100%;
        min-width: 250px;
        font-size: 1rem;
        visibility: hidden;
        opacity: 0;
    }
}
</style>
