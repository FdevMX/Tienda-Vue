
<template>
<div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
    <AsideApp />
    <div class="flex-lg-1 h-screen overflow-y-lg-auto">
      <TopApp />
      <div class="home">
          <h1>This is an about page</h1>
      </div>
    </div>
</div>
  
</template>

<script>
// @ is an alias to /src
import AsideApp from "@/components/AsideApp.vue";
import TopApp from '@/components/TopApp.vue';


export default {
  name: 'HomeView',
  components: {
    AsideApp,
    TopApp
  }
}
</script>
