<template>
  <div class="app-container">
    <div class="left-nav">
	    <nav-menu></nav-menu>
    </div>
    <div class="main-content-container c-container">
      <transition :name="transitionName">
        <template v-if="$route.matched.length">
          <router-view></router-view>
        </template>
        <template v-else>
        </template>
      </transition>
    </div>
  </div>
</template>

<script>
  import NavMenu from './navMenu'
  import { mapState, mapActions } from 'vuex'
  export default {
  	components: { NavMenu },
  	data () {
  		return {
  			loggedIn: false,
        transitionName: 'fade'
  		}
  	},
    computed: {
      ...mapState([
        'userName'
      ])
    },
  	methods: {
  		...mapActions([
  		    'getUserInfo'
  		])
  	},
  	created() {
  		this.getUserInfo();
  	}
  }
</script>

<style lang='scss' scoped>
  @import '../stylesheet/partial/var';
  .app-container {
    display: flex;
  }
  .left-nav {
    flex-basis: 160px;
  }
  .main-content-container {
    background-color: $white;
    flex-basis: calc(100% - 160px);
  }
</style>
