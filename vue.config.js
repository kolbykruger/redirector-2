module.exports = {
    css: {
        loaderOptions: {
            // pass options to sass-loader
            // @/ is an alias to src/
            // so this assumes you have a file named `src/variables.sass`
            // Note: this option is named as "prependData" in sass-loader v8
            sass: {
                prependData: `@import "@/assets/css/styles.scss";`,
            },
        },
    },
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')

        svgRule.uses.clear()

        svgRule
            .use('vue-loader')
            .loader('vue-loader') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
            .end()
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
    },
}
