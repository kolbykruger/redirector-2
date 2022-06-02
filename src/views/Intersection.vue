<template>
    <div class="page" id="intersection">
        <Pageheading title="Saving you from a headache" />

        <section class="intersection">
            <div class="container">
                <p>An intersection is when two URL pathnames match exactly, and could cause redirect issues.</p>
                <p>
                    We'll automatically remove the
                    <span class="highlight">{{ intersections.length }} intersections</span> we found for you, so that
                    they don't cause problems later.
                </p>
            </div>
        </section>

        <section class="intersections" v-if="intersections">
            <div class="container">
                <IntersectionItem v-for="link in intersections" :key="link" :link="link" />
            </div>
        </section>

        <page-navigation label="Continue" to="/algorithmic" :status="true" :arrow="true" />
    </div>
</template>

<script>
import IntersectionItem from '../components/intersection/IntersectionItem.vue'

export default {
    components: { IntersectionItem },
    name: 'Intersection',
    data() {
        return {
            oldLinks: null,
            newLinks: null,
            intersections: [],
        }
    },
    methods: {
        findIntersections() {
            const _this = this,
                oldLinks = _this.oldLinks,
                newLinks = _this.newLinks

            const intersections = oldLinks.filter(o1 => {
                return newLinks.some(o2 => {
                    return o1.url.pathname.replace(/\/$/, '') === o2.url.pathname.replace(/\/$/, '')
                })
            })

            intersections.forEach(link => {
                _this.removeIntersection(link)
            })
        },
        removeIntersection(link) {
            this.intersections.push(link)
            this.$store.commit('removeLink', { type: link.type, id: link.id })
        },
    },
    mounted() {
        this.oldLinks = this.$store.getters.getLinks('old')
        this.newLinks = this.$store.getters.getLinks('new')
        this.findIntersections()
    },
}
</script>

<style lang="scss">
.intersections {
    margin-top: 3rem;
}
</style>
