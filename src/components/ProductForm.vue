<template>
  <form @submit.prevent="addProduct" class="flex">
    <input
      v-model="myProduct.title"
      type="text"
      class="product-text-input mr-2 border border-slate-600"
    />
    <input
      v-model="myProduct.sortVal"
      type="number"
      class="hidden mr-2 number-input border border-slate-600"
    />
    <input
      class="text-white bg-emerald-600 p-1 ml-auto"
      type="submit"
      value="Add"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { generateDefaultProduct, useMainStore } from '../stores'

const mainStore = useMainStore()

// REFS
const myProduct = ref(generateDefaultProduct())

function addProduct() {
  mainStore.addNewProduct(myProduct.value)
  myProduct.value = generateDefaultProduct()
}
</script>

<style scoped>
.product-text-input {
  width: 230px;
}
.number-input {
  width: 60px;
}
</style>
