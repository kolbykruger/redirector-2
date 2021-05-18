export default {
    state: {
        stage: {
            data: true,
            processing: false,
            intersection: false,
            algorithmic: false,
            definition: false,
            culmination: false
        }
    },
    getters: {
        getStageStatus: state => type => {
            return state.stage[type]
        }
    },
    mutations: {
        setStageStatus(state, payload) {
            state.stage[payload.stage] = payload.status
        }
    },
    actions: {}
}
