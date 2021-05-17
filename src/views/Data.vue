<template>
    <div class="page" id="about">
        <Pageheading title="Data" />
        <section>
            <div class="container">
                <p>Please attach your sitemaps for both the new and old website.</p>
                <p>All of your files are saved locally, and nothing is uploaded to a server.</p>
            </div>
        </section>
        <section class="data">
            <div class="container">
                <FileUpload type="old" label="Old Sitemap" @sendStatus="updateFileStatus" />
                <FileUpload type="new" label="New Sitemap" @sendStatus="updateFileStatus" />
            </div>
        </section>
        <PageNavigation label="Look's good" v-bind:status="status" to="/processing" />
    </div>
</template>

<script>
import FileUpload from '@/components/FileUpload'

export default {
    name: 'About',
    components: {
        FileUpload
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
