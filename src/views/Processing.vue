<template>
    <div class="page" id="processing">
        <Pageheading title="Processing" />

        <section class="process-stats">
            <div class="container">
                <p>Your sitemaps have been processed. Here's what we found.</p>
                <div class="grid">
                    <div class="process-stats-item">
                        <p class="process-stats-item-value font-family-mono font-size-100">
                            {{ $store.state.links.links.old.length }}
                        </p>
                        <p class="process-stats-item-label">Old website links</p>
                    </div>
                    <div class="process-stats-item">
                        <p class="process-stats-item-value font-family-mono font-size-100">
                            {{ $store.state.links.links.new.length }}
                        </p>
                        <p class="process-stats-item-label">New website links</p>
                    </div>
                </div>
            </div>
        </section>

        <PageNavigation label="Continue" :status="true" to="/intersection" :arrow="true" />
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
            status: false
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
        }
    },
    mounted() {
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

<style lang="scss" scoped>
.process-stats {
    .grid {
        margin-top: 3em;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1.5em;
    }

    &-item {
        padding: 1em;
        background: c('base-0');
        border-radius: 0.375em;
        box-shadow: 0 0.625em 1.25em rgba(35, 45, 75, 0.08);

        &-value {
            margin: 0.25em 0;
        }
    }
}
</style>
