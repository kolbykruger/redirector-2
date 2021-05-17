<template>
    <div class="page" id="algorithmic">
        <Pageheading title="Algorithmic" />
        <!-- <pre><code>{{ links }}</code></pre> -->
        <section v-if="linksInThreshold">
            <div class="container">
                <p>We use matching algorithms to find some potentially close matches.</p>
                <p>
                    We found
                    <span class="highlight"
                        >{{ linksInThreshold.length }}
                        {{ linksInThreshold.length == 1 ? 'suggestion' : 'suggestions' }}</span
                    >
                    using a probability of
                    <select v-model="threshold" @change="getLinksInThreshold">
                        <option v-for="option in thresholdOptions" v-bind:value="option.value" :key="option.value">{{
                            option.text
                        }}</option>
                    </select>
                    or higher.
                </p>
                <p class="hint" v-if="linksInThreshold.length == 0">
                    You can try lowering or increasing the probability to restrict the suggestions.
                </p>
            </div>
        </section>
        <section class="algorithmic">
            <div class="container">
                <transition name="slide" mode="out-in">
                    <div v-if="linksInThreshold">
                        <AlgorithmicItem
                            v-for="link in linksInThreshold"
                            :key="link.id"
                            :link="link"
                            :threshold="threshold"
                            :comparison="newLinks"
                        />
                    </div>
                </transition>
            </div>
        </section>

        <PageNavigation label="Let's move on" :status="true" to="/definition" />
    </div>
</template>

<script>
import AlgorithmicItem from '../components/algorithmic/AlgorithmicItem.vue'

export default {
    name: 'Algorithmic',
    components: {
        AlgorithmicItem
    },
    data() {
        return {
            oldLinks: null,
            newLinks: null,
            threshold: 0.9,
            thresholdOptions: [
                { text: '75%', value: 0.75 },
                { text: '80%', value: 0.8 },
                { text: '85%', value: 0.85 },
                { text: '90%', value: 0.9 },
                { text: '95%', value: 0.95 }
            ],
            linksInThreshold: null
        }
    },
    computed: {},
    methods: {
        getLinksInThreshold() {
            this.linksInThreshold = this.oldLinks.filter(link => {
                return link.matches[0].rating >= this.threshold && link.status != true
            })
        }
    },
    mounted() {
        const oldLinks = this.$store.getters.getLinks('old')
        this.newLinks = this.$store.getters.getLinks('new')
        this.oldLinks = oldLinks.filter(link => {
            return link.status != true
        })
        this.getLinksInThreshold()
    }
}
</script>

<style lang="scss" scoped>
select {
    appearance: none;
    margin-top: 0.25em;
    border-radius: 0;
    background: none;
    color: c('primary-base');
    padding: 0 0.125em;
    line-height: 1.5;
    border: none;
    border-bottom: 2px dashed c('primary-base');
    cursor: pointer;
}

.algorithmic {
    margin-top: 3em;
}
</style>
