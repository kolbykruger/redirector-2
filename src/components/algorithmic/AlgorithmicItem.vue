<template>
    <transition name="algo" mode="out-in">
        <section class="algorithmic-item" v-if="value && !status">
            <div class="container">
                <div class="algorithmic-item-line algorithmic-item-label">
                    <div class="algorithmic-item-title font-family-mono font-size-000">{{ link.url.pathname }}</div>
                    <div class="algorithmic-item-score font-family-mono">
                        <ArrowCornerCcwLB />
                    </div>
                </div>

                <button
                    v-for="match in link.matches"
                    :key="match.link.id"
                    :class="{ 'algorithmic-item-line-selected': isMatch(match) }"
                    class="algorithmic-item-line"
                    @click="select(match)"
                >
                    <div class="algorithmic-item-title font-family-mono font-size-000">{{ match.target }}</div>
                    <div class="algorithmic-item-score font-family-mono">{{ (match.rating * 100).toFixed(0) }}%</div>
                    <span class="algorithmic-item-hover"></span>
                </button>
            </div>
            <div class="algorithmic-item-actions">
                <button
                    class="button button-style-icon algorithmic-item-actions--confirm"
                    :disabled="!selection"
                    @click="confirm"
                >
                    <Check />
                </button>
                <!-- <button class="button button-style-icon algorithmic-item-actions--compare" @click="compare">
                <Eye />
            </button> -->
                <button
                    class="button button-style-icon button-style-icon--transparent algorithmic-item-actions--skip"
                    @click="skip"
                >
                    <Redo />
                </button>
            </div>
        </section>
    </transition>
</template>

<script>
//import External from '@/components/icons/External'
import Check from '@/components/icons/Check'
import Redo from '@/components/icons/Redo'
// import Eye from '@/components/icons/Eye'
import ArrowCornerCcwLB from '@/components/icons/ArrowCornerCcwLB'

export default {
    name: 'AlgorithmicItem',
    props: {
        link: {
            type: Object
        },
        threshold: {
            type: Number
        },
        comparison: {
            type: Array
        }
    },
    components: {
        //External,
        Check,
        Redo,
        // Eye,
        ArrowCornerCcwLB
    },
    data() {
        return {
            selection: null,
            status: false
        }
    },
    computed: {
        value() {
            if (this.link.matches[0].rating < this.threshold) {
                return false
            }
            return true
        }
    },
    methods: {
        confirm() {
            const links = this.comparison
            const selection = this.selection
            const elem = links.filter(item => {
                return selection.link.id == item.id
            })

            this.$emit('confirmed')

            // Send confirmation to store
            this.$store.commit('setRedirect', {
                type: this.link.type,
                id: this.link.id,
                link: elem
            })
            this.status = true
        },
        compare() {},
        skip() {
            this.$emit('confirmed')
            this.status = true
        },
        select(match) {
            this.selection = match
        },
        isMatch(match) {
            if (match == this.selection) {
                return true
            }
        }
    },
    mounted() {
        this.selection = this.link.matches[0]
    }
}
</script>

<style lang="scss" scoped>
.algorithmic-item {
    --radius: 0.375rem;
    display: grid;
    grid-template-columns: auto 52px;
    grid-gap: 1em;
    margin-bottom: 3em;
    max-width: 1100px;

    .container {
        max-width: 100%;
        border-radius: 0.375em;
        box-shadow: 0 0.625em 1.25em rgba(35, 45, 75, 0.08);
        overflow: hidden;
    }

    &-line {
        display: grid;
        grid-template-columns: auto 52px;
        grid-gap: 1.5em;
        align-items: center;
        width: 100%;
        padding: 0.85em;
        background: c('base-0');
        color: c('default-0');
        text-align: left;

        &-selected {
            background: c('secondary-ghost');
            color: c('secondary-base');
        }
    }

    &-label {
        background: c('base-2');
    }

    &-score {
        --size: 52px;
        width: var(--size);
        //height: var(--size);
        display: grid;
        place-content: center;
        text-align: center;
        opacity: 0.5;
    }

    &-link {
        --size: 52px;
        width: var(--size);
        height: var(--size);
        display: grid;
        place-content: center;
    }

    &-hover {
        position: absolute;
        display: none;
    }

    &-actions {
        display: flex;
        flex-flow: column;

        button {
            --size: 52px;
            width: var(--size);
            height: var(--size);
            margin-bottom: 0.25em;
        }
    }
}
</style>
