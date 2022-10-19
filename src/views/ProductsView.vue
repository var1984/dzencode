<template>
  <div class="wrap">
    <div>
      <v-text-field label="Search product" v-model="search"></v-text-field>
    </div>
    <v-list-item>
      <v-btn class="mx-2" fab dark color="green" @click="showForm = true">
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
      <span>Добавити новий продукт</span>
    </v-list-item>
    <div>
      <template v-for="(item, index) of searchProduct">
        <Product
          :data="item"
          :key="item.id"
          :index="index"
        />
      </template>
    </div>
    <div>
      <AddProductForm v-if="showForm" @closeModal="closeModal" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import AddProductForm from "../components/AddProductForm/AddProductForm";
import Product from "../components/product/product";
export default {
  name: "Products",

  components: { Product, AddProductForm },
  data() {
    return {
      search: "",
      showForm: false,
    };
  },
  computed: {
    ...mapGetters({
      orders: "orders",
    }),

    searchProduct() {
      return this.orders.map((item) => {
        const obj = { ...item };
        obj.products = item.products.filter((el) =>
          el.title.toLowerCase().includes(this.search.toLowerCase())
        );
        return obj;
      });
    },
  },
  methods: {
    closeModal(flug) {
      this.showForm = flug;
    },
  
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  position: relative;
}

.v-list-item {
  padding: 0;
  margin-bottom: 25px;
}
</style>