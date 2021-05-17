export default {
    state: {
        files: {
            old: {
                data: [],
                status: false
            },
            new: {
                data: [],
                status: false
            }
        }
    },
    getters: {
        getFileData: state => type => {
            return state.files[type]
        }
    },
    mutations: {
        addFileLink(state, payload) {
            state.files[payload.type].data.push(payload.link)
        },
        emptyFileLinks(state, payload) {
            state.files[payload.type].data = []
        },
        setFileStatus(state, payload) {
            state.files[payload.type].status = payload.status
        }
    },
    actions: {}
}
