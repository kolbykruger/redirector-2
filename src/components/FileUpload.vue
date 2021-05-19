<template>
    <div class="file-upload" :data-uploading="uploading">
        <label
            v-cloak
            :for="'file-upload-' + type"
            @drop.prevent="addFile"
            @dragenter="updateDragZone(true)"
            @dragleave="updateDragZone(false)"
            @dragover.prevent="updateDragZone(true)"
            :class="{ 'file-upload-drop': inDragZone }"
        >
            <span class="file-upload-hover"></span>
            <div class="file-upload-icon">
                <div class="file-upload-icon-default" v-if="!file && !uploading && !inDragZone">
                    <FileUploadIcon />
                </div>
                <div class="file-upload-icon-uploading" v-if="uploading && !inDragZone">
                    <Loader />
                </div>
                <div class="file-upload-icon-uploading" v-if="inDragZone">
                    <CloudUpload />
                </div>
                <div class="file-upload-icon-uploaded" v-if="file && !uploading && !inDragZone">
                    <Check />
                </div>
            </div>

            <div class="file-upload-details">
                <p class="file-upload-details-title font-size-base font-weight-normal">
                    <span>{{ context ? context : label }}</span>
                </p>
                <p class="file-upload-details-descriptor font-size-000">
                    <span v-if="!file && !uploading">(click or drag & drop to upload)</span>
                    <span v-if="uploading"></span>
                </p>
            </div>
            <div class="file-upload-actions">
                <button class="file-upload-actions-remove" @click.prevent="removeFile" v-if="file && !uploading">
                    <Cross />
                </button>
            </div>

            <input
                :id="'file-upload-' + type"
                type="file"
                name="Upload"
                value=""
                v-on:change="handleFileUpload()"
                ref="file"
            />
        </label>
    </div>
</template>

<script>
import FileUploadIcon from '../components/icons/FileUploadIcon'
import Loader from '../components/icons/Loader'
import Check from '../components/icons/Check'
import Cross from '../components/icons/Cross'
import CloudUpload from '../components/icons/CloudUpload'

export default {
    name: 'FileUpload',
    props: {
        type: String,
        label: String
    },
    components: {
        FileUploadIcon,
        Loader,
        Check,
        Cross,
        CloudUpload
    },
    data() {
        return {
            file: null,
            inDragZone: false,
            uploading: false,
            context: ''
        }
    },
    methods: {
        handleFileUpload() {
            if (this.$refs.file.files[0].type != 'text/xml') {
                return false
            }
            this.file = this.$refs.file.files[0]
            this.parseFile()
            this.fileUploadTimer()
        },
        updateDragZone(status) {
            if (this.inDragZone === true && status === true) {
                this.context = 'Drop to upload...'
                return
            }
            this.inDragZone = status
            this.context = null
        },
        addFile(e) {
            let files = e.dataTransfer.files

            if (!files) return false
            if (files[0].type != 'text/xml') return false

            this.file = files[0]
            this.inDragZone = false
            this.parseFile()
            this.fileUploadTimer()
        },
        fileUploadTimer() {
            const _this = this
            this.uploading = true
            this.context = 'Uploading...'

            setTimeout(() => {
                _this.uploading = false
                _this.context = this.file.name
                _this.$store.commit('setFileStatus', { type: this.type, status: true })
                _this.$emit('sendStatus', { type: this.type, status: true })
            }, 1200)
        },
        parseFile() {
            let _this = this
            if (!this.file) {
                return false
            }

            //Remove the old file data
            this.fileData = []
            // NOTE
            this.$store.commit('emptyFileLinks', { type: this.type })
            this.inDragZone = false

            let reader = new window.FileReader()
            reader.onload = event => {
                let arr = [],
                    readXML = event.target.result,
                    parser = new DOMParser(),
                    doc = parser.parseFromString(readXML, 'application/xml'),
                    type = _this.type

                let loc = doc.querySelectorAll('loc')

                loc.forEach(item => {
                    const link = item.innerHTML
                    arr.push(link)
                })

                // Remove duplicates
                let unique = arr.reduce((a, b) => {
                    if (a.indexOf(b) < 0) a.push(b)
                    return a
                }, [])

                // Put in alpha order
                let alpha = unique.sort((a, b) => {
                    return a.localeCompare(b)
                })

                alpha.forEach(item => {
                    _this.$store.commit('addFileLink', { type, link: item })
                })
            }
            reader.readAsText(this.file, 'UTF-8')
        },
        removeFile() {
            this.file = null
            this.fileData = []
            this.$store.commit('emptyFileLinks', { type: this.type })
            this.$store.commit('setFileStatus', { type: this.type, status: false })
            this.$emit('sendStatus', { type: this.type, status: false })
            this.inDragZone = false
        }
    },
    mounted() {}
}
</script>

<style lang="scss">
.file-upload {
    margin-bottom: 2em;

    input[type='file'] {
        display: none;
    }

    label {
        position: relative;
        display: grid;
        grid-template-columns: 52px auto 52px;
        grid-gap: 1.4em;
        align-items: center;
        background: c('base-0');
        box-shadow: 0 0.625em 1.25em rgba(35, 45, 75, 0.04);
        border-radius: 0.4em;
        padding: 1.4em;
        cursor: pointer;
        overflow: hidden;

        &.file-upload-drop {
            outline: 3px dashed c('secondary-base');
        }

        &:hover,
        &:focus {
            .file-upload-hover {
                transform: scaleX(1);
                transform-origin: 0% 0%;
            }
        }
    }

    &-hover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: c('base-3');
        transform: scaleX(0);
        transform-origin: 100% 100%;
        transition: transform 0.6s cubic-bezier(0.53, 0.21, 0, 1);
        will-change: transform;
    }

    &-details {
        position: relative;
        display: flex;
        grid-gap: 1.4em;
        align-items: center;
        pointer-events: none;
        user-select: none;

        &-title {
            margin: 0;
        }

        &-descriptor {
            margin: 0;
            color: c('tertiary-base');
        }
    }

    &-icon {
        position: relative;
        width: 52px;
        height: 52px;
        border-radius: 0.4em;
        pointer-events: none;
        user-select: none;
        overflow: hidden;

        svg {
            width: 100%;
            height: 100%;
            padding: 0.7em;

            path {
                fill: c('primary-base');
            }
        }

        &-default {
            background: c('primary-ghost');
        }

        &-drop {
            background: c('secondary-ghost');

            svg path {
                fill: c('secondary-base');
            }
        }

        &-uploading {
            background: c('secondary-ghost');
            svg path {
                fill: c('secondary-base');
            }
        }

        &-uploaded {
            background: c('secondary-ghost');

            svg path {
                fill: c('secondary-base');
            }
        }
    }

    &-actions {
        position: relative;

        &-remove {
            width: 52px;
            height: 52px;
            border-radius: 0.4em;

            svg path {
                fill: c('tertiary-base');
            }

            &:hover,
            &:focus {
                svg path {
                    fill: c('primary-base');
                }
            }
        }
    }
}
</style>
