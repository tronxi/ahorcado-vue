import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from 'vue-resource';
import EleccionTemas from "./components/eleccionTemas";
import Juego from "./components/juego";
import Vuex from 'vuex'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Vuex)

Vue.http.options.root = 'http://192.168.0.5/ahorcado-spring/';
const routes = [
  {path:'/', redirect:'/temas'},
  {path:'/temas', component: EleccionTemas},
  {path:'/juego', component: Juego}
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

const store = new Vuex.Store({
  state: {
    tema: ""
  },
  mutations: {
    cambiarTema (state, t) {
      state.tema = t;
    }
  }
})

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
