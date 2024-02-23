<template>
  <div v-if="computedView === 'products'" class="products-view">
    <h3>Products</h3>
    <div class="mb-5">
      <ProductForm />
    </div>
    <ul class="product-list">
      <li
        v-for="(product, index) in computedProducts"
        :key="index"
        class="item"
        :class="product.isSelected ? 'item--selected' : ''"
      >
        <div class="item-title p-1" @click="changeProductSelection(product)">
          <span class="">{{ product.title }}</span>
        </div>
        <div class="flex">
          <span
            class="p-1 mr-1 hidden"
            @click="changeProductSelection(product)"
            >{{ product.sortVal }}</span
          >
          <button
            class="delete-button text-white bg-red-600 p-1"
            @click="mainStore.removeProduct(product.title)"
          >
            delete
          </button>
        </div>
      </li>
    </ul>
    <div v-if="computedIsEmpty">No Products found</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Logger from '../lib/Logger'
import { useMainStore } from '../stores'
import ProductForm from './ProductForm.vue'

const mainStore = useMainStore()

function changeProductSelection(product) {
  Logger.getInstance().addRecord(
    'Change selection status of ""' +
      product.title +
      '" to "' +
      !product.isSelected +
      '"',
  )
  product.isSelected = !product.isSelected
}

// COMPUTED
const computedView = computed(() => mainStore.$state.view)
const computedProducts = computed(() => mainStore.getAllProductsSortedByTitle)
const computedIsEmpty = computed(() => mainStore.isProductsEmpty)
</script>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  background-color: #eee;
  margin-bottom: 8px;
  transition: background-color 300ms;
}

.item--selected {
  background-color: #ccf;
}
.item-title {
  width: 100%;
}
</style>
