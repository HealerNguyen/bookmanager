import axios from 'axios'

// export const state = () => ({
//   authUser: null
// })

// export const mutations = {
//   SET_USER: function (state, user) {
//     state.authUser = user
//   }
// }

// export const actions = {
//   // nuxtServerInit is called by Nuxt.js before server-rendering every page
//   nuxtServerInit({ commit }, { req }) {
//     if (req.session && req.session.authUser) {
//       commit('SET_USER', req.session.authUser)
//     }
//   },
//   async login({ commit }, { username, password }) {
//     try {
//       const { data } = await axios.post('/api/users/login', { username, password })
//       commit('SET_USER', data)
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         throw new Error('Bad credentials')
//       }
//       throw error
//     }
//   },

//   async logout({ commit }) {
//     await axios.post('/api/users/logout')
//     commit('SET_USER', null)
//   }

// }
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const CART = 'CART';

const store = () => {
    return new Vuex.Store({
        state: {
            isLoggedIn: false,
            authUser: '',
            cart: '',
        },
        mutations: {
            [LOGIN](state) {
                state.pending = true;
            },
            [LOGIN_SUCCESS](state, creds) {
                state.isLoggedIn = true;
                state.pending = false;
                state.authUser = creds
            },
            [LOGOUT](state) {
                state.isLoggedIn = false;
                state.authUser = ''
            },
            [CART](state, creds) {
                state.cart = creds
            }
        },
        actions: {
            nuxtServerInit({ commit }, { req }) {
                if (req.session && req.session.length) {
                    commit(LOGIN_SUCCESS, req.session);
                }  
            },
            login({
                state,
                commit,
                rootState
            }, creds) {
                //console.log("login...", creds);
                //console.log(creds.currentUser);
                //commit(LOGIN); // show spinner
                return new Promise(resolve => {
                    setTimeout(() => {
                        commit(LOGIN_SUCCESS, creds);
                        resolve();
                    }, 2000);
                });
            },
            cart({
                state,
                commit,
                rootState
            }, creds) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        commit(CART, creds);
                        resolve();
                    }, 2000);
                });
            },
            logout({
                commit
            }) {
                commit(LOGOUT);
            }
        },
        getters: {
            isLoggedIn: state => {
                return state.isLoggedIn;
            },
            authUser: state => {
                return state.authUser;
            },
            cart: state => {
                return state.cart;
            }
        }
    })
  }
  
export default store

