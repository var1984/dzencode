<template>
  <v-app>
    <Header :orders="orders" />
    <div class="main-wrap">
      <Navigate />
      <v-main>
        <router-view />
      </v-main>
      <v-card v-if="id" class="delete-modal">
        <v-list-item-content> Ви дійсно хочете видалити? </v-list-item-content>
        <div class="btn-wrap">
          <v-btn color="green accent-4" @click="deletetItem"> Ok </v-btn>
          <v-btn color="red darken-2" @click="cancel"> Cancel </v-btn>
        </div>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "./components/Header";
import Navigate from "./components/Navigate";
export default {
  components: { Header, Navigate },
  name: "App",
  data() {
    return {
      id: null,
      index: null,
    };
  },
  mounted() {
    this.init();
    this.$bus.$on("deleteProduct", ({ id, index }) => {
      this.id = id;
      this.index = index;
    });
  },
  computed: {
    ...mapGetters({ orders: "orders" }),
  },
  methods: {
    ...mapActions({
      getData: "getData",
    }),

    async init() {
      await this.getData();
    },
    deletetItem() {
      const data = this.orders.find((_, indx) => indx === this.index);
      data.products = data.products.filter((order) => order.id !== this.id);
       this.id = null
      return data;
    },
      cancel(){
      this.id = null
    }
  },
};
</script>

<style lang="scss">
.main-wrap {
  display: flex;
}

.v-main__wrap {
  padding: 25px;
  flex-grow: 1;
  max-width: 100%;
}

.delete-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 30px;
  border: 2px solid green;
  transform: translate(-50%, -50%);

  .btn-wrap {
    display: flex;
    justify-content: space-around;
  }
}
</style>
