<template>
    <div class="definition-item-terms" v-if="terms.length > 0">
        <!-- <button
            class="definition-item-term"
            v-for="(term, index) in terms"
            :key="index"
            @click="select(term, index)"
            :class="{ 'definition-item-term--selected': isSelected(term) }"
        >
            {{ term }}
        </button> -->
        <span v-for="(term, index) in terms" :key="index">
            <button
                v-if="term.length > 1"
                @click="select(term, index)"
                class="definition-item-term"
                :class="{ 'definition-item-term--selected': isSelected(term) }"
            >
                {{ term }}
            </button>
            <span v-else>
                {{ term }}
            </span>
        </span>
    </div>

    <button class="definition-item-terms-action" @click="toggleAllSearchTerms" title="Insert all search terms">
        <Brackets />
    </button>
    <a
        :href="url.url"
        v-if="url"
        target="_black"
        rel="nofollow norefer"
        class="definition-item-terms-action"
        title="Open link in new tab"
    >
        <External />
    </a>
</template>

<script>
import Brackets from '@/components/icons/Brackets'
import External from '@/components/icons/External'

export default {
    name: 'DefinitionSearchTerm',
    components: {
        Brackets,
        External,
    },
    props: {
        pathname: {
            type: String,
        },
        url: {
            type: Object,
        },
        searchTerm: {
            type: String,
        },
    },
    data() {
        return {
            terms: [],
            selected: [],
        }
    },
    methods: {
        createTerms() {
            let pathname = this.pathname
            const regExp = new RegExp('([^A-Za-z0-9]+)')
            let terms = pathname.split(regExp)
            let filtered = terms.filter(Boolean)

            this.terms = filtered
        },
        select(term, index) {
            let found = false
            this.selected.filter((item, index) => {
                if (item == term) {
                    this.selected.splice(index, 1)
                    found = true
                }
            })
            if (!found) {
                this.selected.splice(index, 0, term)
            }

            //
            this.selected.sort((a, b) => {
                return this.terms.indexOf(a) - this.terms.indexOf(b)
            })

            this.$emit('selectedSearchTerm', this.selected.join(' '))
        },
        toggleAllSearchTerms() {
            const reducedTerms = this.terms.filter(term => {
                return term.length > 1
            })
            if (this.selected.length == reducedTerms.length) {
                this.selected = []
                this.$emit('selectedSearchTerm', this.selected.join(' '))
                return false
            }
            this.selected = reducedTerms
            this.$emit('selectedSearchTerm', reducedTerms.join(' '))
        },
        isSelected(term) {
            const found = this.selected.filter(item => {
                return item == term
            })
            if (found.length > 0) {
                return true
            }
        },
    },
    mounted() {
        this.createTerms()
    },
    watch: {
        pathname() {
            this.selected = []
            this.createTerms()
        },
        searchTerm(value) {
            // reset the selected array if the search term is deleted
            if (value.length < 1) {
                this.selected = []
            }

            // reset the selected array if the search term is different from the selected selection
            if (value != this.selected.join(' ')) {
                this.selected = []
            }
        },
        // selected: {
        //     handler() {
        //         //this.$emit('selectedSearchTerm', value.join(''))
        //     },
        //     deep: true
        // }
    },
}
</script>

<style lang="scss">
.definition-item-terms {
    &-action {
        --size: 32px;
        width: 32px;
        height: 32px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.375em;
        opacity: 0.65;

        svg path {
            fill: c('tertiary-base');
        }

        &:hover {
            background: c('base-1');
            opacity: 1;
            box-shadow: 0 0.625em 1.25em rgba(35, 45, 75, 0.08);
        }

        &:hover,
        &:focus {
            outline: none;
        }
    }
}

.definition-item-term {
    color: c('default-0');
    padding: 0.125em 0;
    border-bottom: 1px dashed transparent;
    outline: none;
    transition: 120ms ease-out;

    &:hover,
    &:focus {
        outline: none;
    }

    &:hover {
        //background: c('default-0');
        color: c('quartnary-base');
        //mix-blend-mode: difference;
    }

    &--selected {
        color: c('quartnary-base');
        border-color: c('quartnary-base');

        &:hover {
            border-color: c('primary-base');
        }
    }
}
</style>
