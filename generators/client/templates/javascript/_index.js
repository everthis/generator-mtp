import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Entry from '../components/entry.vue'
import styles from '../stylesheets/index.scss';

function importComponent(name) {
  return function(resolve) {
    import(`../components/${name}.vue`).then(mod => {
      resolve(mod)
    })
  }
}

const routes = [
  { path: '/', component: importComponent('unclaimedCases') },
  { path: '/test', component: importComponent('test') },
]

const router = new VueRouter({
  mode: 'history',
  base: '/mtp',
  routes
})

Vue.use(VueRouter);

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Entry)
})
