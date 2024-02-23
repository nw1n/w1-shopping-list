import { useMainStore } from '../stores/index'
// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  Firestore,
  CollectionReference,
  getDocs,
  DocumentData,
} from 'firebase/firestore'
import _ from 'lodash'
import { Pinia } from 'pinia'

let instance: Nw1nFirebase | null = null

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBZmq2U7-thQZCxzndiUOBNliKBHeqywUo',
  authDomain: 'einkaufsliste-nw1n.firebaseapp.com',
  projectId: 'einkaufsliste-nw1n',
  storageBucket: 'einkaufsliste-nw1n.appspot.com',
  messagingSenderId: '743289253102',
  appId: '1:743289253102:web:e3a13f9462bd56860297ff',
}

interface StoreData {
  products: Array<DocumentData>
}

export default class Nw1nFirebase {
  app: FirebaseApp
  db: Firestore
  productsColRef: CollectionReference
  store: StoreData
  piniaStore: any

  constructor() {
    this.store = {
      products: [],
    }
    this.app = initializeApp(firebaseConfig)
    this.db = getFirestore(this.app)
    this.productsColRef = collection(this.db, 'products')
    this.piniaStore = useMainStore()

    this.fillStore()
  }

  syncProducts(localProducts) {
    getDocs(this.productsColRef).then((data) => {
      const myData = data.docs.map((doc) => doc.data())
      const last = _.last(myData)
      this.store.products = _.map(last, (pr) => pr)[0]
      // console.log(this.store.products)
      const finalArr: Array<any> = []
      for (const item of localProducts) {
        finalArr.push({
          title: item.title ? item.title : '',
          sortVal: item.sortVal ? item.sortVal : 100,
        })
      }
      for (const item of this.store.products) {
        if (!_.find(finalArr, { title: item.title })) {
          finalArr.push({
            title: item.title ? item.title : '',
            sortVal: item.sortVal ? item.sortVal : 100,
          })
        }
      }
      console.log('finalArr')
      console.log(finalArr)
      addDoc(this.productsColRef, {
        products: finalArr,
        timeStamp: Date.now(),
      })
        .then((data) => {
          console.log(data)
          this.piniaStore.removeAllProducts()
          for (const item of finalArr) {
            const obj = {
              title: item.title ? item.title : '',
              sortVal: item.sortVal ? item.sortVal : 100,
              isChecked: false,
              isSelected: false,
            }
            this.piniaStore.addProduct(obj)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  fillStore() {
    getDocs(this.productsColRef).then((data) => {
      const myData = data.docs.map((doc) => doc.data())
      const last = _.last(myData)
      this.store.products = _.map(last, (pr) => pr)
      // console.log(this.store.products)
    })
  }

  static getInstance() {
    if (!instance) {
      instance = new Nw1nFirebase()
    }
    return instance
  }
}
