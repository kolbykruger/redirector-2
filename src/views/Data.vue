<template>
    <div class="page" id="about">
        <Pageheading title="Data" />
        <section>
            <div class="container">
                <p>Please attach your sitemaps for both the new and old website.</p>
            </div>
        </section>
        <section class="data">
            <div class="container">
                <FileUpload type="old" label="Old Sitemap" @sendStatus="updateFileStatus" />
                <FileUpload type="new" label="New Sitemap" @sendStatus="updateFileStatus" />
            </div>
        </section>
        <Hint
            title="Sitemap Generator"
            description="If you need to generate a sitemap, I recommend using <a href='https://www.xml-sitemaps.com/' target='_blank'>XML Sitemap's Generator</a>."
        />
        <PageNavigation label="Continue" v-bind:status="status" to="/processing" />
    </div>
</template>

<script>
import FileUpload from '@/components/FileUpload'
import Hint from '@/components/utility/Hint'

export default {
    name: 'Data',
    components: {
        FileUpload,
        Hint
    },
    data() {
        return {
            fileStatus: {
                old: false,
                new: false
            }
        }
    },
    computed: {
        status() {
            if (this.fileStatus.old && this.fileStatus.new) {
                return true
            }
            return false
        }
    },
    methods: {
        updateFileStatus(value) {
            this.fileStatus[value.type] = value.status
        }
    },
    watch: {
        $state(value) {
            console.log(value)
        }
    }
}
</script>

<style lang="scss" scoped>
.data {
    margin-top: 3em;
}
</style>
