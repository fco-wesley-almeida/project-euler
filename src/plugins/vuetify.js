import Vue from 'vue';
import Vuetify from 'vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#0d47a1',
        secondary: '#ffffff',
        accent: '#0d47a1',
        error: '#FF5252',
        info: '#2196F3',
        success: '#0d47a1',
        warning: '#FFC107',
        background: '#fafafa',
      },
    },
  },
});
