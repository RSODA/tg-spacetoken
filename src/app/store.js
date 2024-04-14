import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: null,
  },

  getters: {
    users(state){
        return state.user;
    }   
  },

  mutations: {
      setUser(state, user) {
        state.user = user;
      },
      restoreUserFromLocalStorage(state) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          state.user = JSON.parse(savedUser);
        }
      },
  },

  beforeCreate() {
    this.$store.commit('restoreUserFromLocalStorage');
  },

  created() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.$store.commit('setUser', JSON.parse(savedUser));
    }
  },

  actions: {
    async login({ commit }, { name, password }) {
      try {
        const response = await axios.post('/user/login', {
          name,
          password
        });

        if (response.status == 200) {
          commit('setUser', response.data);
          return response.data;
        }
      } catch (error) {
        console.error('Ошибка аутентификации', error);
      }
    },
    async register({ commit }, { name, password, wallet }) {
      try {
        const response = await axios.post('/user/register', {
          name,
          password,
          wallet
        });

        if (response.status == 200) {
          commit('setUser', response.data);
          return response.data;
        }
      } catch (error) {
        console.error('Ошибка аутентификации', error);
      }
    },
  },
})
