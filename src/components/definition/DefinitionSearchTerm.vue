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
</template>

<script>
export default {
    name: 'DefinitionSearchTerm',
    props: {
        pathname: {
            type: String
        },
        searchTerm: {
            type: String
        }
    },
    data() {
        return {
            terms: [],
            selected: []
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
        isSelected(term) {
            const found = this.selected.filter(item => {
                return item == term
            })
            if (found.length > 0) {
                return true
            }
        }
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
        }
        // selected: {
        //     handler() {
        //         //this.$emit('selectedSearchTerm', value.join(''))
        //     },
        //     deep: true
        // }
    }
}
</script>

<style lang="scss">
.definition-item-terms {
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
        color: c('secondary-base');
        border-color: c('secondary-base');

        &:hover {
            border-color: c('quartnary-base');
        }
    }
}
</style>