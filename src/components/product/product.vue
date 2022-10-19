<template>
  <div v-if="data">
    <div v-for="item of data.products" :key="item.id">
      <v-hover v-slot="{ hover }">
        <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
          <v-list-item three-line>
            <v-list-item-avatar tile size="80" color="grey">
              <img :src="item.photo" />
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="text-h5 mb-1">{{ item.title }}</div>
            </v-list-item-content>
            <v-list-item-content>
              <div class="text-h5 mb-1">
                {{ item.date }}
              </div>
            </v-list-item-content>
            <v-list-item-content>
              <div
                class="text-h5 mb-1"
                v-for="price of item.price"
                :key="price.id"
              >
                <div v-if="price.isDefault === 1">
                  {{ price.value }}
                  <span>{{ price.symbol }}</span>
                </div>
                <div v-else>
                  {{ price.value }}
                  <span>{{ price.symbol }}</span>
                </div>
              </div>
            </v-list-item-content>
            <v-list-item-content>
              <div class="text">{{ item.specification }}</div>
            </v-list-item-content>
            <v-btn @click="deleteItem(item.id)">
              <v-icon large color="green accent-4"> mdi-delete </v-icon>
            </v-btn>
          </v-list-item>
        </v-card>
      </v-hover>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Additions",
  props: {
    data: {
      type: Object,
    },
    id: {
      type: Number,
    },
    index: {
      type: Number,
    },
  },
  computed: {
    ...mapGetters({
      orders: "orders",
    }),
  },

  methods: {
    deleteItem(id) {
      this.$bus.$emit('deleteProduct', {id, index: this.index})
      // const data = this.orders.find((_, indx) => indx === this.index);
      // data.products = data.products.filter((order) => order.id !== id);
      // return data;
    },
  },
};
</script>
<style lang="scss" scoped>
.v-card {
  align-items: flex-start;
  padding: 0;
  margin-bottom: 25px;
  cursor: pointer;
}

.v-list-item {
  justify-content: space-between;
  width: 100%;
}

.v-card.on-hover {
  background-color: #fff;
}
</style>
