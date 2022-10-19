<template>
  <div  >
    <template v-for="order of orders" >
    <ProductGroup
      :data="order"
      :setProducts="setProducts"
      :key="order.id"  
      v-if="order.products.length" 
    />
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductGroup from "../components/ProductGroup/ProductGroup";
export default {
  name: "Additions",
  components: { ProductGroup },
  methods: {
    setProducts(order) {
      this.$store.commit("setAdditionsProducts", order.id);
      this.$router.push({ path: `/additions/products/${order.id}` });
    },
  },
  computed: {
    ...mapGetters({
      orders: "orders",
    }),
  },
};
</script>


