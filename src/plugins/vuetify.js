import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css' 

Vue.use(Vuetify);

export default new Vuetify({

    theme: {
        themes: {
          light: {
            primary: '#D81B60',
            secondary: '#EC407A',
            accent: '#FF80AB',
            error: '#b71c1c',
          },
        },
      },
    
});
