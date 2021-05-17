<template>
    <div>
        <button class="button">
            <span class="hover"></span>
            <span class="icon">
                <Diskette />
            </span>
            <span class="label">Save & Download</span>
        </button>
    </div>
</template>

<script>
import Diskette from '../components/icons/Diskette'

export default {
    name: 'Download',
    components: {
        Diskette
    }
}
</script>

<style lang="scss" scoped></style>
