import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import Nw1nFirebase from '../lib/Nw1nFirebase'
import _ from 'lodash'
import { nwClone } from '../lib/Util'
import Logger from '../lib/Logger'

export function generateDefaultProduct() {
  return {
    title: '',
    sortVal: 100,
    isSelected: false,
    isChecked: false,
  }
}

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    products: useStorage('products', []),
    view: useStorage('view', 'products'),
  }),
  getters: {
    getAllProducts() {
      return this.products
    },
    getAllProductsSortedBySortval() {
      return _.orderBy(this.products, ['sortVal'], ['asc'])
    },
    getAllProductsSortedByTitle() {
      return _.orderBy(this.products, [(o) => deUmlautLower(o.title)], ['asc'])
    },
    getAllProductsSortedReversed() {
      return _.reverse(this.products)
    },
    getAllProductsSelectedUnchecked() {
      let items = this.getAllProductsSortedByTitle
      items = _.filter(items, { isSelected: true })
      items = _.filter(items, { isChecked: false })
      return items
    },
    isProductsEmpty() {
      return this.products.length <= 0
    },
  },
  actions: {
    addNewProduct(item) {
      if (item && item.title) {
        Logger.getInstance().addRecord(
          'adding new record: ' + JSON.stringify(item),
          'info',
        )
        this.products.push(
          Object.assign(nwClone(item), {
            isSelected: true,
          }),
        )
      }
    },
    removeAllProducts() {
      this.products.length = 0
    },
    changeView() {
      Logger.getInstance().addRecord('Change View', 'info')
      this.products = _.map(this.products, (item) => {
        item.isChecked = false
        return item
      })
      if (this.view === 'products') {
        this.view = 'cart'
      } else {
        this.view = 'products'
      }
    },
    clearSelection() {
      Logger.getInstance().addRecord('Clear Product selection', 'info')
      this.products = _.map(this.products, (item) => {
        item.isChecked = false
        item.isSelected = false
        return item
      })
    },
    syncProducts() {
      Nw1nFirebase.getInstance().syncProducts(this.products)
    },
    removeProduct(productTitle) {
      Logger.getInstance().addRecord('Remove Product: ' + productTitle)
      let foundOne = false
      this.products = this.products.filter((prod) => {
        if (foundOne) {
          return true
        }
        const isProd = prod.title === productTitle
        if (isProd) {
          foundOne = true
        }
        return !isProd
      })
    },
  },
})

function deUmlautLower(germanStr) {
  let value = germanStr.toLowerCase()
  value = value.replace(/ä/g, 'a')
  value = value.replace(/ö/g, 'o')
  value = value.replace(/ü/g, 'u')
  value = value.replace(/ß/g, 'ss')
  return value
}
