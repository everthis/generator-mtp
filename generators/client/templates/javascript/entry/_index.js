import styles from '../../stylesheet/index.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'
import Entry from '../../component/entry.vue'
import vueRoute from '../common/vueRoute'
import routePath from '../common/routePath'

function importComponent(name) {
  return function(resolve) {
    import(`../../component/${name}.vue`).then(mod => {
      resolve(mod)
    })
  }
}

const routes = [...vueRoute(routePath)]

const router = new VueRouter({
  mode: 'history',
  base: '/<%= s || moduleName.split("-")[moduleName.split("-").length - 1] %>',
  routes
})

Vue.use(VueRouter)

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Entry)
})
