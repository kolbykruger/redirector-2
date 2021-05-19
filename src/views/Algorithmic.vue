<template>
    <div class="page" id="algorithmic">
        <Pageheading title="Algorithmic" />
        <!-- <pre><code>{{ links }}</code></pre> -->
        <section v-if="linksInThreshold">
            <div class="container">
                <p>Using matching algorithms, we'll try to find some suggestions for you.</p>
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
                <Hint
                    title="Adjust the probability"
                    description="You can try lowering or increasing the probability to restrict the suggestions."
                    v-if="linksInThreshold.length == 0"
                />
            </div>
        </section>
        <section class="algorithmic" v-if="linksInThreshold">
            <div class="container">
                <AlgorithmicItem
                    v-for="link in linksInThreshold"
                    :key="link.id"
                    :link="link"
                    :threshold="threshold"
                    :comparison="newLinks"
                />
            </div>
        </section>

        <PageNavigation label="Continue" :status="true" to="/definition" />
    </div>
</template>

<script>
import AlgorithmicItem from '../components/algorithmic/AlgorithmicItem.vue'
import Hint from '../components/utility/Hint.vue'

export default {
    name: 'Algorithmic',
    components: {
        AlgorithmicItem,
        Hint
    },
    data() {
        return {
            oldLinks: null,
            newLinks: null,
            threshold: 0.85,
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
    font-weight: 500;
    border: none;
    border-bottom: 2px dashed c('primary-base');
    cursor: pointer;
}

.algorithmic {
    margin-top: 3em;
    transition-duration: 0.3s;
}

.algo-move {
    transition-duration: 0.3s;
    transition-property: opacity, transform;
}

.algo-enter-active {
    transition-duration: 0.3s;
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
    overflow: hidden;
}
.algo-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
    overflow: hidden;
}
.algo-enter-from,
.algo-leave-to {
    opacity: 0;
    transform: translate(0, -1em);
}
</style>
