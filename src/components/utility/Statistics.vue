<template>
    <section class="stats">
        <div class="grid">
            <Redirects :stages="stages" />
        </div>
        <Download />
    </section>
</template>

<script>
import Redirects from '@/components/utility/Redirects.vue'
import Download from '@/components/utility/Download.vue'
export default {
    name: 'Statistics',
    props: {
        stages: Array
    },
    components: {
        Redirects,
        Download
    }
}
</script>
