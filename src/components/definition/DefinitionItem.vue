<template>
    <section class="definition-item">
        <div class="container">
            <div class="definition-item-line definition-line-label">
                <div class="definition-item-line font-family-mono font-size-000">{{ link.url.pathname }}</div>
            </div>

            <div class="definition-item-search">
                <input
                    class="font-family-mono font-size-000"
                    type="text"
                    placeholder="Search..."
                    v-model="term"
                    @keydown="search"
                    ref="definitionSearch"
                />

                <div class="definition-item-manual" v-if="custom.status">
                    <input type="text" v-model="custom.url" placeholder="https://google.com/" />
                </div>

                <div v-if="!custom.status">
                    <div class="definition-item-search-results" v-if="results.length > 0">
                        <button
                            class="definition-item-search-result definition-item-title font-family-mono font-size-000"
                            :class="{ 'definition-item-search-result-selected': isMatch(result.item.id) }"
                            v-for="result in results"
                            :key="result.item.id"
                            @click="select(result.item)"
                        >
                            {{ result.item.url.pathname }}
                        </button>
                    </div>
                    <div class="definition-item-line" v-else>
                        <p class="font-size-000">No results found.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="definition-item-actions">
            <button class="button button-style-icon algorithmic-item-actions--confirm" @click="confirm">
                <Check />
            </button>
            <button class="button button-style-icon algorithmic-item-actions--manual" @click="manual">
                <Edit v-if="!custom.status" />
                <EditSlash v-if="custom.status" />
            </button>
            <button class="button button-style-icon algorithmic-item-actions--skip" @click="skip">
                <Cross />
            </button>
        </div>
    </section>
</template>

<script>
import Fuse from 'fuse.js'
import Check from '@/components/icons/Check'
import Cross from '@/components/icons/Cross'
import Edit from '@/components/icons/Edit'
import EditSlash from '@/components/icons/EditSlash'

export default {
    name: 'DefinitionItem',
    props: {
        link: {
            type: Object
        },
        comparison: {
            type: Array
        }
    },
    components: {
        Check,
        Cross,
        Edit,
        EditSlash
    },
    data() {
        return {
            fuse: null,
            term: '',
            results: [],
            selection: null,
            custom: {
                status: false,
                url: ''
            }
        }
    },
    methods: {
        search() {
            // Clear previous search results
            this.results = []

            const results = this.fuse.search(this.term)
            this.results.push([...results])
            // Flatten the array
            this.results = this.results.flat()
        },
        confirm() {
            this.$emit('confirmed')
            this.$store.commit('setRedirect', {
                type: this.link.type,
                id: this.link.id,
                link: this.selection
            })
            this.reset()
        },
        skip() {
            this.$emit('confirmed')
            this.reset()
        },
        manual() {
            this.custom.status = !this.custom.status
        },
        select(match) {
            const links = this.comparison
            const elem = links.filter(item => {
                return match.id == item.id
            })
            this.selection = elem
        },
        isMatch(match) {
            if (this.selection) {
                if (match == this.selection[0].id) {
                    return true
                }
            }
        },
        reset() {
            this.term = ''
            this.selection = null
            this.custom.status = false
            if (this.$refs.definitionSearch) {
                this.$refs.definitionSearch.focus()
            }
        }
    },
    mounted() {
        const _this = this
        this.fuse = new Fuse(_this.comparison, {
            includeScore: false,
            keys: ['url.pathname']
        })
        this.$refs.definitionSearch.focus()
    },
    watch: {
        term(value) {
            if (value.length < 1) {
                this.results = []
            }
        }
    }
}
</script>

<style lang="scss">
.definition-item {
    --radius: 0.375rem;
    display: grid;
    grid-template-columns: auto 62px;
    grid-gap: 0.65em;
    margin-bottom: 3em;
    max-width: 1100px;

    .container {
        max-width: 100%;
        border-radius: 0.375em;
        box-shadow: 0 0.625em 1.25em rgba(35, 45, 75, 0.08);
        overflow: hidden;
    }

    &-line,
    &-search-result {
        display: grid;
        grid-template-columns: auto 52px;
        grid-gap: 1.5em;
        align-items: center;
        width: 100%;
        padding: 0.65em;
        background: c('base-0');
        color: c('default-0');
        text-align: left;

        &-selected {
            background: c('secondary-base');
        }
    }

    &-label {
        background: c('base-2');
    }

    &-search {
        input[type='text'] {
            appearance: none;
            display: block;
            width: 100%;
            background: c('base-0');
            color: c('default-0');
            padding: 0.65em 0.75em;
            font-size: 0.875rem;
            font-weight: 500;
            line-height: 1.5;
            border: none;
            border-top: 1px solid c('base-2');
            border-bottom: 1px solid c('base-2');
            box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
    }

    &-search-results {
        max-height: 40vh;
        overflow: auto;
    }

    &-search-result {
        display: block;
        width: 100%;
        text-align: left;
        color: c('default-0');
        background: c('base-2');

        &-selected {
            background: c('secondary-base');
        }
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
