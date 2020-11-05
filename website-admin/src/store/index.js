import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null
  },
  getters: {
    getToken: (state) => {
      return state.token;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    login(context, {params, callback}) {
      axios.post('/admin/login', params).then(res => {
        let data = res.data;
        if (data.code === 0) {
          context.commit('setToken', data.data.token);
        } else {
          console.log(data.message);
        }
        callback(data);
      });
    }
  },
  modules: {
  }
});