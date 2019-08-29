// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
//import VueAxios from 'vue-axios'
/*导入element-ui库*/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
//Vue.use(VueAxios,axios);

Vue.prototype.$http = axios;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-fromurlencodeed'; /*解决跨域问题*/
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})