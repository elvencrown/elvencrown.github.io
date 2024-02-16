let headerModule = {
	state: {
		navHeaderIsOpened: false
	},

	mutations: {
	    CHANGE_NAV_HEADER_BUTTON: (state, payload) => {
	      state.navHeaderIsOpened = payload
	    },
	},

	actions: {
	    ACTION_NAV_HEADER_STATE ({commit}, payload) {
	      commit('CHANGE_NAV_HEADER_BUTTON', payload)
	    },
	}, 

	getters: {
	    NAV_HEADER_IS_OPENED (state) {
	      return state.navHeaderIsOpened
	    },
	}
}; 

export default headerModule;
