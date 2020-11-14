import Vue from 'vue';
import Vuex from 'vuex';
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
    login(context, { params, callback }) {
      this._vm.$axios.post('/admin/login', params).then(res => {
        let data = res.data;
        if (data.code === 0) {
          context.commit('setToken', data.data.token);
          if (window.localStorage.getItem('a00000_blog_token')) {
            window.localStorage.setItem('a00000_blog_token', data.data.token);
          }
        } else {
          console.log(data.message);
        }
        callback(data);
      });
    },
    reflushToken(context, { params, callback }) {
      if (!params.token || params.token === '' || params.token === 'null') {
        params.token = window.localStorage.getItem('a00000_blog_token');
      }
      if (!params.token || params.token === '' || params.token === 'null') {
        params.token = context.getters.getToken;
      }
      if (!params.token || params.token === '' || params.token === 'null') {
        callback({
          code: 1,
          message: '没有有效的旧Token'
        });
        return;
      }
      if (this._vm.config.disableFlushToken) {
        context.commit('setToken', params.token);
        callback({
          code: 1,
          message: '未刷新token'
        });
      } else {
        this._vm.$axios.post('/admin/reflushToken', params).then(res => {
          let data = res.data;
          if (data.code === 0) {
            context.commit('setToken', data.data);
            if (window.localStorage.getItem('a00000_blog_token')) {
              window.localStorage.setItem('a00000_blog_token', data.data);
            }
          } else {
            console.log(data.message);
          }
          callback(data);
        });
      }
    },
    getLogs(context, { params, callback }) {
      let config = {
        headers: {
          token: context.getters.getToken
        }
      };
      this._vm.$axios.post('/log', params, config).then(res => {
        let data = res.data;
        callback(data);
      });
    },
    getAccessInfos(context, { params, callback }) {
      let config = {
        headers: {
          token: context.getters.getToken
        }
      };
      this._vm.$axios.post('/accessInfo', params, config).then(res => {
        let data = res.data;
        callback(data);
      })
    },
    getCodeContrasts(context, { params, callback }) {
      let config = {
        headers: {
          token: context.getters.getToken
        }
      };
      this._vm.$axios.post('/systemConfig/codeContrast', params, config).then(res => {
        let data = res.data;
        callback(data);
      })
    },
    addCodeContrasts(context, { params, callback }) {
      let config = {
        headers: {
          token: context.getters.getToken
        }
      };
      this._vm.$axios.post('/systemConfig/codeContrast/add', params, config).then(res => {
        let data = res.data;
        callback(data);
      });
    },
    deleteCodeContrasts(context, { params, callback }) {
      let config = {
        headers: {
          token: context.getters.getToken
        }
      };
      this._vm.$axios.post('/systemConfig/codeContrast/remove', params, config).then(res => {
        let data = res.data;
        callback(data);
      });
    },
    getAccessSource(context, { params, callback }) {
      let config = {
        headers: {
          token: context.getters.getToken
        }
      };
      this._vm.$axios.post('/systemConfig/accessSource', params, config).then(res => {
        let data = res.data;
        callback(data);
      });
    },
    addAccessSource(context, { params, callback }) {
      let config = {
        headers: {
          token: context.getters.getToken
        }
      };
      this._vm.$axios.post('/systemConfig/accessSource/add', params, config).then(res => {
        let data = res.data;
        callback(data);
      });
    },
    deleteAccessSource(context, { params, callback }) {
      let config = {
        headers: {
          token: context.getters.getToken
        }
      };
      this._vm.$axios.post('/systemConfig/accessSource/remove', params, config).then(res => {
        let data = res.data;
        callback(data);
      });
    },
    getConfig(context, { params, callback }) {
      let config = {
        headers: {
          token: context.getters.getToken
        }
      };
      this._vm.$axios.post('/systemConfig/config', params, config).then(res => {
        let data = res.data;
        callback(data);
      });
    },
    addConfig(context, { params, callback }) {
      let config = {
        headers: {
          token: context.getters.getToken
        }
      };
      this._vm.$axios.post('/systemConfig/config/add', params, config).then(res => {
        let data = res.data;
        callback(data);
      });
    },
    updateConfig(context, { params, callback }) {
      let config = {
        headers: {
          token: context.getters.getToken
        }
      };
      this._vm.$axios.post('/systemConfig/config/update', params, config).then(res => {
        let data = res.data;
        callback(data);
      });
    },
    deleteConfig(context, { params, callback }) {
      let config = {
        headers: {
          token: context.getters.getToken
        }
      };
      this._vm.$axios.post('/systemConfig/config/remove', params, config).then(res => {
        let data = res.data;
        callback(data);
      });
    },
    getUserView(context, { params, callback }) {
      let config = {
        headers: {
          token: context.getters.getToken
        }
      };
      this._vm.$axios.post('/admin/userView', params, config).then(res => {
        let data = res.data;
        callback(data);
      });
    },
    changeUserStatus(context, { params, callback }) {
      let config = {
        headers: {
          token: context.getters.getToken
        }
      };
      this._vm.$axios.post('/user/update', params, config).then(res => {
        let data = res.data;
        callback(data);
      });
    },
    addUser(context, { params, callback }) {
      let config = {
        headers: {
          token: context.getters.getToken
        }
      };
      this._vm.$axios.post('/user/add', params, config).then(res => {
        let data = res.data;
        callback(data);
      });
    }
  },
  modules: {
  }
});