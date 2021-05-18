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
    margin: 0 0.25em;

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
        padding: 0.65em 1em;
        font-size: 0.875rem;
        visibility: hidden;
        opacity: 0;
        background: c('base-3');
        background-repeat: repeat-x;
        border-left: 0.25em solid c('quartnary-base');
        box-shadow: 0 0.625em 1.25em rgba(35, 45, 75, 0.08);
        border-radius: 0.275em;
        color: c('default-0');
    }
}
</style>
