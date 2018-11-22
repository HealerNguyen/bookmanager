import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/dist/main'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCzbaIzL0APyGGPVANhwiZQ6e3JBiwjORc',
    libraries: 'places' 
  },
})