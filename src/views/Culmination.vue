<template>
    <div class="page" id="culmination">
        <Pageheading title="Customize your redirects" />

		<section class="actions">
			<div class="container">
				<button class="button button-size-small" @click="createCSV">Download as a CSV</button>
			</div>
		</section>

        <section class="points">
            <div class="container">
                <h3 class="font-size-base font-weight-medium">URLs</h3>
                <div class="grid grid-50">
                    <label for="startpoint">
                        <span class="font-size-000 font-weight-medium">Startpoint</span>
                        <input
                            class="font-family-mono"
                            id="startpoint"
                            type="text"
                            placeholder="https://www.old-website.com"
                            v-model="urls.start"
                            @keyup="validateEndpoint('start', 'startError')"
                        />
                        <span class="font-size-000 error" v-if="urls.startError">{{ urls.startError }}</span>
                    </label>
                    <label for="endpoint">
                        <span class="font-size-000 font-weight-medium">Endpoint</span>
                        <input
                            class="font-family-mono"
                            id="endpoint"
                            type="text"
                            placeholder="https://www.new-website.com"
                            v-model="urls.end"
                            @keyup="validateEndpoint('end', 'endError')"
                        />
                        <span class="font-size-000 error" v-if="urls.endError">{{ urls.endError }}</span>
                    </label>
                </div>
            </div>
        </section>

        <section class="delimiters">
            <div class="container">
                <h3 class="font-size-base font-weight-medium">
                    Delimiters
                    <Tooltip
                        indicator="question"
                        tooltip="A set of characters that is used to separate two strings of text."
                    />
                </h3>
                <div class="grid">
                    <label for="a">
                        <span class="font-size-000 font-weight-medium">Start</span>
                        <input
                            class="font-family-mono"
                            id="a"
                            type="text"
                            placeholder="Starting delimiter"
                            v-model="delimiters.start"
                        />
                    </label>
                    <label for="b">
                        <span class="font-size-000 font-weight-medium">Middle</span>
                        <input
                            class="font-family-mono"
                            id="b"
                            type="text"
                            placeholder="Middle delimiter"
                            v-model="delimiters.middle"
                        />
                    </label>
                    <label for="c">
                        <span class="font-size-000 font-weight-medium">End</span>
                        <input
                            class="font-family-mono"
                            id="c"
                            type="text"
                            placeholder="Ending delimiter"
                            v-model="delimiters.end"
                        />
                    </label>
                    <label for="line">
                        <span class="font-size-000 font-weight-medium">Line</span>
                        <input
                            class="font-family-mono"
                            id="line"
                            type="text"
                            placeholder="Line delimiter"
                            v-model="delimiters.line"
                        />
                    </label>
                    <!-- <div class="buttons">
                        <button class="button button-secondary button-size-small">
                            <span>Prefill .htaccess</span>
                        </button>
                    </div> -->
                </div>
            </div>
        </section>

        <section class="redirects" v-if="links">
            <div class="container" v-if="links.length > 0">
                <div class="grid grid-50">
                    <h3 class="font-size-base font-weight-medium">
                        Redirects&nbsp;
                        <span>({{ links.length }})</span>
                    </h3>
                    <!-- <div class="redirects-actions">
                        <button class="button button-size-small" @click="copy">
                            <span class="hover"></span>
                            <span class="label">Copy</span>
                        </button>
                    </div> -->
                </div>
                <pre><code><CulminationItem
                    v-for="link in links"
                    :link="link"
                    :key="link.id"
                    :delimiters="delimiters"
                    :startpoint="urls.start"
                    :endpoint="urls.end"
                /></code></pre>
            </div>
        </section>
    </div>
</template>

<script>
import CulminationItem from '../components/culmination/CulminationItem'

export default {
    name: 'Culmination',
    components: {
        CulminationItem,
    },
    data() {
        return {
			allLinks: null,
            links: null,
            delimiters: {
                start: 'RewriteRule ^',
                middle: '$ ',
                end: ' [R=301,L]',
                line: '',
            },
            urls: {
                start: '',
                end: 'https://new-website.com',
                startError: '',
                endError: '',
            },
        }
    },
    methods: {
        validateEndpoint(type, typeError) {
            const endpoint = this.urls[type]
            if (endpoint.length < 1) {
                this.urls[typeError] = ''
                return false
            }

            try {
                new URL(endpoint)
                this.urls[typeError] = ''
            } catch {
                this.urls[typeError] = 'Must be a valid URL'
            }
        },
        copy() {},
		createCSV() {
			let csvContent = "data:text/csv;charset=utf-8,";
			csvContent += 'Old, New' + "\r\n"
			this.allLinks.forEach((link) => {
				let oldLink = link.url.pathname
				let newLink = link.redirect ? link.redirect[0].url.pathname : ''
				let row = [oldLink, newLink]
				csvContent+= row + "\r\n"
			})

			let encodedUri = encodeURI(csvContent);
			let link = document.createElement("a");
			let timestamp = Date.now()
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", `redirects-${timestamp}.csv`);
			document.body.appendChild(link); // Required for FF

			link.click();
		}
    },
    mounted() {
        // Empty links
        this.links = null
        this.allLinks = null

        // Get new links
        const links = this.$store.getters.getLinks('old')
        this.links = links.filter(link => {
            return link.status == true
        })

		// Get all links
		this.allLinks = links.sort((a, b) => {
			if (a.redirect && b.redirect) {
				a.redirect.length > b.redirect.length ? 1 : -1
			}
		})
    },
}
</script>

<style lang="scss" scoped>
.points,
.delimiters,
.redirects {
    margin-top: 3em;
}

.redirects {
    &-actions {
        display: flex;
        justify-content: flex-end;
    }
}

label {
    display: block;
    font-size: 1rem;
    margin-top: 0.5em;

    span {
        color: c('default-2');
    }

    input[type='text'] {
        appearance: none;
        display: block;
        width: 100%;
        margin-top: 0.25em;
        border-radius: 0.375em;
        background: c('base-0');
        color: c('default-0');
        padding: 0.65em 0.75em;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1.5;
        border: 1px solid c('base-2');
        box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
}

.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1.5em;

    &-50 {
        grid-template-columns: repeat(2, 1fr);
    }
}

h3 {
    display: flex;
    align-items: center;
}

pre {
    @extend .font-family-mono;
    color: c('default-0');
    background: c('base-0');
    overflow-x: auto;
    font-size: 0.875em;
    line-height: 1.7142857;
    margin-top: 0.25em;
    margin-bottom: 0;
    border-radius: 0;
    padding: 0.65em 0.75em;
    border-radius: 0.375em;
    min-height: 6em;
    border: 1px solid c('base-2');
    box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    code {
        @extend .font-family-mono;
        background-color: transparent;
        border-width: 0;
        border-radius: 0;
        padding: 0;
        font-weight: 500;
        color: inherit;
        font-size: 0.875rem;
        line-height: inherit;
    }
}
</style>
