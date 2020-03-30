import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#C2185B',
            secondary: '#FCE4EC',
            accent: '#F50057',
            error: '#E53935',
          },
        },
      },
});
