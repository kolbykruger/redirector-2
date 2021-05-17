<template>
    <div class="page" id="processing">
        <Pageheading title="Processing" />
        <section v-if="!status">
            <div class="container">
                <div class="spinner">
                    {{ timer.time }}
                </div>
                <p>Processing links...</p>
            </div>
        </section>
        <PageNavigation label="That was fast! Let's go" :status="true" to="/intersection" :arrow="false" />
    </div>
</template>

<script>
let stringSimilarity = require('string-similarity')
export default {
    name: 'Processing',
    data() {
        return {
            newLinks: [],
            oldLinks: [],
            status: false,
            timer: {
                time: 0,
                running: false,
                interval: null
            }
        }
    },
    methods: {
        processNewLinks(opts) {
            const _this = this
            const links = opts.links.data

            links.forEach(link => {
                let $Link = _this.createLink(link, 'new')
                _this.newLinks.push($Link)
                _this.$store.commit('addLink', { type: 'new', link: $Link })
            })
        },
        processOldLinks(opts) {
            const _this = this
            const links = opts.oldLinks.data
            const newLinks = opts.newLinks

            //Format newLinks into string arrays for matching phase
            let analysis = []
            newLinks.forEach(item => {
                analysis.push(item.url.pathname)
            })

            links.forEach(link => {
                // Instantiate [Link] object shape
                let $Link = _this.createLink(link, 'old')

                const matches = _this.createStringMatches($Link.url.pathname, analysis, newLinks)

                $Link.matches = matches

                _this.$store.commit('addLink', { type: 'old', link: $Link })
            })
            this.timer.running = false
        },
        createLink(link, type) {
            const url = this.createURL(link)
            return {
                id: this.createStringHash(link),
                status: false,
                type: type,
                url: url
            }
        },
        createURL(link) {
            try {
                return new URL(link)
            } catch {
                return false
            }
            // const url = new URL(link)

            // delete url.hash
            // delete url.password
            // delete url.search
            // delete url.searchParams
            // delete url.username

            // return url
        },
        createStringHash(str, seed = 0) {
            // Generates a unique hexidecimal enumeration based on the string
            let h1 = 0xdeadbeef ^ seed,
                h2 = 0x41c6ce57 ^ seed
            for (let i = 0, ch; i < str.length; i++) {
                ch = str.charCodeAt(i)
                h1 = Math.imul(h1 ^ ch, 2654435761)
                h2 = Math.imul(h2 ^ ch, 1597334677)
            }
            h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
            h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
            return 4294967296 * (2097151 & h2) + (h1 >>> 0)
        },
        createStringMatches(str, candidates, newLinks) {
            let results = stringSimilarity.findBestMatch(str, candidates)
            let ratings = results.ratings

            //sort the results by rating
            ratings.sort((a, b) => (a.rating > b.rating ? -1 : b.rating > a.rating ? 1 : 0))
            ratings = ratings.slice(0, 3)

            ratings.forEach(item => {
                newLinks.forEach(n => {
                    if (item.target.replace(/\/$/, '') === n.url.pathname.replace(/\/$/, '')) {
                        item.link = n
                    }
                })
            })

            return ratings
        },
        incrementTime() {
            if (this.timer.running) {
                this.timer.time = this.timer.time + 1
            }
        }
    },
    mounted() {
        //Start a timer
        this.timer.running = true
        this.timer.interval = setInterval(this.incrementTime, 1000)

        const rawOldLinks = this.$store.getters.getFileData('old')
        const rawNewLinks = this.$store.getters.getFileData('new')

        // Disbatch the new links for processing
        this.processNewLinks({
            links: rawNewLinks,
            type: 'new'
        })

        const newLinks = this.newLinks
        // Disbatch the old links for processing
        this.processOldLinks({
            oldLinks: rawOldLinks,
            newLinks: newLinks,
            type: 'old'
        })
    }
}
</script>

<style lang="scss" scoped></style>
