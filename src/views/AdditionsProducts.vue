<template>
  <div class="about" >
    <template v-for="(item, index) of orders" >
    <Product :data="item" :key="item.id" :index="index" v-if="item.id === additionsProducts"/>
    </template>
  </div>
</template>
<script>
import Product from "../components/product/product";
import {mapGetters} from 'vuex'
export default {
  name: "AdditionsProducts",
  components: { Product },
  computed: {
    ...mapGetters({
      additionsProducts: 'additionsProducts',
      orders:'orders'
    })
  }
};
</script>