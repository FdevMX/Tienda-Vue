<template>
  <div id="app">
    <HeaderApp />
    <router-view/>
  </div>
</template>

<script>
import HeaderApp from '@/components/HeaderApp.vue'
export default {
  components: {
    HeaderApp
  }
}
</script>

<style lang="stylus">

</style>
