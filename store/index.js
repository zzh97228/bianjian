import Vuex from 'vuex'
const store = () => {
  return new Vuex.Store({
    state: {
      currentScreen: 0
    },
    mutations: {

    },
    getters: {
      currentScreen: (state) => {
        return state.currentScreen
      }
    },
    actions: {

    }
  })
}

export default store
