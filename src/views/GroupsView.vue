<template>
  <div>
     <div class="group-wrap">
      <div class="product-group">
        <template v-for="({ date, id, products }, index) of orders">
          <ProductGroup
            v-if="products.length"
            :data="{ date, id, products, index }"
            :setProducts="setProducts"
            :key="id"
            :class="id === arrowID ? 'groups' : ''"
          />
        </template>
      </div>
      <template v-for="(item, index) of orders">
        <Product
          :data="item"
          :key="item.id"
          :index="index"
          v-if="item.id === additionsProducts"
          class="product"
        />
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ProductGroup from "../components/ProductGroup/ProductGroup";
import Product from "../components/product/product";
export default {
  name: "Group",
  components: { ProductGroup, Product },
  data() {
    return {
      arrowID: null,
      index: null,
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters({
      orders: "orders",
      additionsProducts: "additionsProducts",
    }),
  },
  methods: {
    async init() {
      await this.setProducts({ id: 1 });
    },

    setProducts(productID) {
      const { id, index } = productID;
      this.arrowID = id;
      this.index = index;
      this.$store.commit("setAdditionsProducts", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.group-wrap {
  display: flex;
}
.product-group {
  width: 35%;
  margin-right: 25px;
}

.v-list-item {
  margin-bottom: 25px;
}
.product {
  width: 100%;
}
</style>