<template>
    <section class="pageheading">
        <div class="container">
            <h1 class="font-size-200">{{ title }}</h1>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Pageheading',
    props: {
        title: String
    }
}
</script>

<style lang="scss">
.pageheading {
    margin-bottom: 5vh;
    padding-top: 5vh;

    h1 {
        margin-top: 0;
        margin-bottom: 0;
        line-height: 1;
    }
}
</style>
