<template>
  <div>
    <div class="nav-items-wrap">
      <div class="c-link" @click="navChange('/')">homepage</div>
      <div class="c-link" @click="navChange('/test')">test</div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
        return {}
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      navChange(name) {
        this.$router.push(name)
      }
    }
  }
</script>