<script setup>
import HeaderSite from './components/HeaderSite.vue'
import LeftNav from './components/LeftNav.vue'
import Anchor from './components/Anchor.vue'
</script>

<template>
  <div class="app">
    <HeaderSite/>

    <LeftNav/>

    <router-view v-slot="{ Component }">  
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </router-view>

    <Anchor></Anchor>
  </div>
</template>