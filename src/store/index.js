import { createStore } from 'vuex'
import files from './modules/files'
import stages from './modules/stages'
import links from './modules/links'

export default createStore({
    modules: {
        files,
        stages,
        links
    },
    state: {},
    getters: {},
    mutations: {},
    actions: {}
})
