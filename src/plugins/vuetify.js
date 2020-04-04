import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css' 

Vue.use(Vuetify);

export default new Vuetify({

    theme: {
        themes: {
          light: {
            primary: '#00ACC1',
            secondary: '#B2EBF2',
            accent: '#18FFFF',
            error: '#b71c1c',
          },
        },
      },
    
});
