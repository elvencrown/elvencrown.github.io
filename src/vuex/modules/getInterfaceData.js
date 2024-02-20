import axios from 'axios'

let getInterfaceData = {
	state: {
		interface_data: []
	},

	mutations: {
	  UPDATE_INTERFACE (state, payload) {
	    state.interface_data = payload;
	  }
	},

	actions: {
	  GET_INTERFACE ({commit}, payload) {

	    return axios.get('http://192.168.3.140:3000/interfaceData')
	        .then( (response) => {
	             commit('UPDATE_INTERFACE', response.data)
	        })
	  }
	},

	getters: {
	  INTERFACE_DATA (state) {
	    return state.interface_data
	  }
	}
}; 

export default getInterfaceData;
