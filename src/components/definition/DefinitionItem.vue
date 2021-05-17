<template>
    <section class="definition-item" v-if="link" ref="definitionItem">
        <div class="container">
            <div class="definition-item-search">
                <input
                    class="font-family-mono font-size-000"
                    type="text"
                    placeholder="Search..."
                    v-model="term"
                    @keydown="search"
                    ref="definitionSearch"
                />
                <Search />
            </div>

            <div class="definition-item-data">
                <div class="definition-item-line definition-item-label font-family-mono font-size-000">
                    <DefinitionSearchTerm
                        :pathname="link.url.pathname"
                        :searchTerm="term"
                        @selectedSearchTerm="setTermFromSelection"
                    />
                </div>

                <div class="definition-item-search">
                    <!-- <input
                    class="font-family-mono font-size-000"
                    type="text"
                    placeholder="Search..."
                    v-model="term"
                    @keydown="search"
                    ref="definitionSearch"
                />
                <Search /> -->
                    <div class="definition-item-manual" v-if="custom.status">
                        <input type="text" v-model="custom.url" placeholder="https://google.com/" />
                    </div>

                    <div class="definition-item-search-results" v-if="!custom.status">
                        <div v-if="term.length > 1">
                            <div v-if="results.length > 0">
                                <transition-group name="search" mode="in-out">
                                    <button
                                        class="definition-item-search-result definition-item-title font-family-mono font-size-000"
                                        :class="{ 'definition-item-search-result-selected': isMatch(result.item.id) }"
                                        v-for="result in results"
                                        :key="result.item.id"
                                        @click="select(result.item)"
                                    >
                                        {{ result.item.url.pathname }}
                                    </button>
                                </transition-group>
                            </div>
                        </div>
                        <div class="definition-item-search-results" v-else>
                            <button
                                class="definition-item-search-result definition-item-title font-family-mono font-size-000"
                                :class="{ 'definition-item-search-result-selected': isMatch(result.id) }"
                                v-for="result in comparison"
                                :key="result.id"
                                @click="select(result)"
                            >
                                {{ result.url.pathname }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="definition-item-actions">
            <button
                class="button button-style-icon definition-item-actions--confirm"
                :disabled="!selection"
                @click="confirm"
            >
                <Check />
                <span class="tooltip">Confirm</span>
            </button>
            <!-- <button
                class="button button-style-icon button-style-icon--transparent definition-item-actions--manual"
                @click="manual"
            >
                <Edit v-if="!custom.status" />
                <EditSlash v-if="custom.status" />
                <span class="tooltip">Test</span>
            </button> -->
            <button
                class="button button-style-icon button-style-icon--transparent definition-item-actions--skip"
                @click="skip"
            >
                <Cross />
                <span class="tooltip">Skip</span>
            </button>
        </div>
    </section>
</template>

<script>
import Fuse from 'fuse.js'
import DefinitionSearchTerm from '@/components/definition/DefinitionSearchTerm'
import Check from '@/components/icons/Check'
import Cross from '@/components/icons/Cross'
//import Edit from '@/components/icons/Edit'
//import EditSlash from '@/components/icons/EditSlash'
import Search from '@/components/icons/Search'

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
        DefinitionSearchTerm,
        Check,
        Cross,
        //Edit,
        //EditSlash,
        Search
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

            const dataPanel = this.$refs.definitionItem.querySelector('.definition-item-data')
            dataPanel.style.transform = 'translate(0, 1em)'
            dataPanel.style.opacity = 0

            setTimeout(() => {
                dataPanel.style.transform = 'translate(0, 0)'
                dataPanel.style.opacity = 1
            }, 220)

            if (this.$refs.definitionSearch) {
                this.$refs.definitionSearch.focus()
            }
        },
        setTermFromSelection(value) {
            //Sets the search term if selected from the term buttons
            this.term = value
            this.search()
        }
    },
    mounted() {
        const _this = this
        this.fuse = new Fuse(_this.comparison, {
            includeScore: true,
            keys: ['url.pathname']
        })
        if (_this.link) {
            this.$refs.definitionSearch.focus()
        }
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
    }

    &-line,
    &-search-result {
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
        border-radius: 0.375em 0.375em 0 0;
    }

    &-data {
        box-shadow: 0 0.625em 1.25em rgba(35, 45, 75, 0.08);
        border-radius: 0.375em;
        transition: transform 0.3s;
    }

    &-search {
        position: relative;

        input[type='text'] {
            @extend .font-size-000;
            appearance: none;
            display: block;
            width: 100%;
            background: c('base-0');
            color: c('default-0');
            padding: 0.85em 1em;
            margin-bottom: 1em;
            padding-left: 3.5em;
            font-weight: 400;
            line-height: 1;
            border: none;
            border-radius: 0.375em;
            //border-bottom: 2px solid c('base-1');
            box-shadow: 0 0.625em 1.25em rgba(35, 45, 75, 0.04);
            transition: 0.3s ease;

            &:focus {
                outline: none;
                box-shadow: 0 0.625em 1.25em rgba(35, 45, 75, 0.08);
            }
        }

        svg {
            position: absolute;
            top: 0.875em;
            left: 1em;
            opacity: 0.5;
            pointer-events: none;
            user-select: none;
        }
    }

    &-search-results {
        max-height: 40vh;
        border-radius: 0 0 0.375em 0.375em;
        overflow: auto;
    }

    &-search-result {
        display: block;
        width: 100%;
        text-align: left;
        color: c('default-0');
        //background: c('base-2');
        transition: color 0.6s;

        &-selected {
            color: c('secondary-base');
        }

        &:hover,
        &:focus {
            outline: none;
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
            position: relative;
            --size: 52px;
            width: var(--size);
            height: var(--size);
            margin-bottom: 0.25em;

            .tooltip {
                position: absolute;
                top: 50%;
                left: 100%;
                display: flex;
                align-items: center;
                transform: translate(0.7em, -50%);
                color: $color-tertiary;
                background: $color-base-000;
                height: 34px;
                padding: 0 0.7em;
                border-radius: 0.4em;
                opacity: 0;
                visibility: hidden;

                &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 50%;
                    width: 0.5em;
                    height: 0.5em;
                    background: $color-base-000;
                    transform: translate(-30%, -50%) rotate(45deg);
                    border-radius: 0.125em;
                    z-index: -1;
                }
            }

            &:hover,
            &:focus {
                .tooltip {
                    opacity: 1;
                    visibility: visible;
                    animation: tooltip-enter 0.3s cubic-bezier(0.53, 0.21, 0, 1) forwards;

                    @keyframes tooltip-enter {
                        from {
                            transform: translate(1em, -50%);
                            opacity: 0;
                        }
                        to {
                            transform: translate(0.7em, -50%);
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }
}

.search-move {
    transition: transform 0.2s;
}
</style>
