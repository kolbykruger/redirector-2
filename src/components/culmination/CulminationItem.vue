<template>
    <div v-if="link">
        <span class="ds">{{ delimiters.start }}</span
        ><span class="sp">{{ validStartpoint }}</span
        >{{ link.url.pathname }}<span class="dm">{{ delimiters.middle }}</span
        ><span class="ep">{{ validEndpoint }}</span
        >{{ link.redirect[0].url.pathname }}<span class="de">{{ delimiters.end }}</span
        ><span class="dl">{{ delimiters.line }}</span>
        <br />
    </div>
</template>

<script>
export default {
    name: 'CulminationItem',
    props: {
        link: {
            type: Object
        },
        delimiters: {
            type: Object
        },
        startpoint: {
            type: String
        },
        endpoint: {
            type: String
        }
    },
    computed: {
        validEndpoint() {
            return this.pointValidator(this.endpoint)
        },
        validStartpoint() {
            return this.pointValidator(this.startpoint)
        }
    },
    methods: {
        pointValidator(point) {
            return point.slice(-1) == '/' ? point.slice(0, -1) : point
        }
    }
}
</script>

<style lang="scss" scoped>
.ds {
    color: c('secondary-base');
}
.dm {
    color: c('primary-base');
}
.de {
    color: c('quartnary-base');
}
.dl {
    color: c('tertiary-base');
}

.sp,
.ep {
    border-bottom: 1px dashed #ddd;
}
</style>
