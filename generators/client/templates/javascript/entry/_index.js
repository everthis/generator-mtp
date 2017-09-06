import styles from '../../stylesheet/index.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'
import Entry from '../../component/entry.vue'

function importComponent(name) {
  return function(resolve) {
    import(`../../component/${name}.vue`).then(mod => {
      resolve(mod)
    })
  }
}

const routes = [
  { path: '/', component: importComponent('homepage') },
  { path: '/test', component: importComponent('test') }
]

const router = new VueRouter({
  mode: 'history',
  base: '/<%= moduleName %>',
  routes
})

Vue.use(VueRouter)

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Entry)
})
