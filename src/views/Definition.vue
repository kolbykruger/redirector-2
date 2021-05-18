<template>
    <div class="page" id="definition">
        <Pageheading title="Definition" />
        <section>
            <div class="container">
                <p>For the remaining links, you'll have to find the matches yourself.</p>
                <p v-if="oldLinks && status">
                    There are <span class="highlight">{{ oldLinks.length - selectedIndex }} links</span> remaining.
                </p>
                <Hint
                    title="Faster searching"
                    description="Click on any section of the url to add that term to the search query. You can select multiple."
                />
            </div>
        </section>
        <section class="definition" v-if="status">
            <div class="container">
                <DefinitionItem
                    :link="oldLinks[selectedIndex]"
                    :comparison="newLinks"
                    v-if="oldLinks"
                    @confirmed="incrementSelectedIndex"
                />
            </div>
        </section>
        <PageNavigation label="Continue" :status="true" :arrow="true" to="/culmination" back="/algorithmic" />
    </div>
</template>

<script>
import DefinitionItem from '@/components/definition/DefinitionItem.vue'
import Hint from '@/components/utility/Hint.vue'

export default {
    name: 'Definition',
    components: {
        DefinitionItem,
        Hint
    },
    data() {
        return {
            newLinks: null,
            oldLinks: null,
            selectedIndex: 0,
            status: true
        }
    },
    methods: {
        incrementSelectedIndex() {
            if (this.selectedIndex == this.oldLinks.length - 1) {
                this.status = false
            }
            this.selectedIndex++
        }
    },
    mounted() {
        const oldLinks = this.$store.getters.getLinks('old')
        this.newLinks = this.$store.getters.getLinks('new')
        this.oldLinks = oldLinks.filter(link => {
            return link.status != true
        })
    }
}
</script>

<style lang="scss" scoped>
.definition {
    margin-top: 3em;
}
</style>
