<template>
  <div class="container p-2">
    <div class="inner-container">
      <ProductsView v-if="computedView === 'products'" />
      <CartView v-else />
      <Logger />
      <Nw1nFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useMainStore } from '../stores'
import Logger from './LogList.vue'
import Nw1nFooter from './Nw1nFooter.vue'
import ProductsView from './ProductsView.vue'
import CartView from './CartView.vue'

const mainStore = useMainStore()

const computedView = computed(() => mainStore.$state.view)
</script>

<style scoped>
.inner-container {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 100px);
}
</style>
