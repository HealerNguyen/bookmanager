import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
//import VueParticles from 'vue-particles'
import globalMixin from './globalMixin'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo);
Vue.use(globalMixin);
Vue.use(Vuetify);
//Vue.use(VueParticles);