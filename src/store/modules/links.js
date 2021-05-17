export default {
    state: {
        links: {
            old: [],
            new: []
        }
    },
    getters: {
        getLinks: state => type => {
            return state.links[type]
        }
    },
    mutations: {
        addLink(state, payload) {
            state.links[payload.type].push(payload.link)
        },
        removeLink(state, payload) {
            state.links[payload.type].filter((item, index) => {
                item.id == payload.id ? state.links[payload.type].splice(index, 1) : ''
            })
        },
        setRedirect(state, payload) {
            state.links[payload.type].filter(item => {
                if (item.id == payload.id) {
                    item.redirect = payload.link
                    item.status = true

                    console.log(item)
                }
            })
        },
        removeRedirect(state, payload) {
            state.links[payload.type].filter(item => {
                if (item.id == payload.id) {
                    delete item.redirect
                    item.status = false
                }
            })
        }
    },
    actions: {}
}
