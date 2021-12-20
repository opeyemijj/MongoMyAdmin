import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify)

let vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#00A45E',
        secondary: '#3B3B3B',
        gray2: "B6BFD3",
        gray3: "7B849B",
        c_light_blue: "EEF4FF",
        c_dark: "404041",
        background: 'F4F6FE',
      }
    }
  }
});

new Vue({
  render: h => h(App),
  vuetify,
}).$mount('#app')
