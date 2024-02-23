<template>
  <div class="cart-view">
    <h3>Cart</h3>
    <ul class="product-list">
      <li
        v-for="(product, index) in products"
        :key="index"
        class="item"
        @click="deSelectProduct(product)"
      >
        <div>
          <span class="item-title">{{ product.title }}</span>
        </div>
      </li>
    </ul>
    <div v-if="products.length === 0">Cart is Empty</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Logger from '../lib/Logger'
import { useMainStore } from '../stores'

const mainStore = useMainStore()

// COMPUTED
const products = computed(() => mainStore.getAllProductsSelectedUnchecked)

function deSelectProduct(product) {
  Logger.getInstance().addRecord('Check Product: ' + product.title, 'info')
  product.isChecked = !product.isChecked
}
</script>

<style scoped>
.cart-view .item {
  font-size: 22px;
  display: flex;
  justify-content: space-between;
  background-color: #eee;
  margin: 16px 0 8px;
  padding: 6px 4px;
  transition: background-color 300ms;
}
</style>
