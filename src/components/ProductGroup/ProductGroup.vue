<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card
        :elevation="hover ? 16 : 2"
        :class="{ 'on-hover': hover }"
        @click="setProducts(data)"
      >
        <v-list-item three-line>
          <v-list-item-content v-if="data.title">
            <div class="text-h5 mb-1">{{ data.title }}</div>
          </v-list-item-content>
          <v-list-item-content v-if="data.products">
            <div class="text-h5 mb-1">{{ data.products.length }}шт.</div>
          </v-list-item-content>
          <v-list-item-content v-if="data.date">
            <div class="text-h5 mb-1">
              {{ data.date }}
            </div>
          </v-list-item-content>
          <v-list-item-content v-if="data.allSum">
            <div class="text-h5 mb-1">{{ data.allSum.sumGRN }} грн</div>
            <div class="text-h5 mb-1">{{ data.allSum.sumUSD }} usd</div>
          </v-list-item-content>
          <v-list-item-content>
             <div class="text-h5 mb-1">{{ data.description }}</div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-hover>
  </div>
</template>
<script>
export default {
  name: "Additions",
  props: {
    data: {
      type: Object,
      require: true,
    },
    setProducts: {
      type: Function,
      require: false,
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

.groups {
   position: relative;

    &::before {
    content: "";
    position: absolute;
    width: 50px;
    height:100%;
    background-color: gray;
    background-image: url('../../assets/images/arrow-icon.svg');
    background-size: 20px;
    background-position: center;
    top: 0;
    right: 0;
    z-index: 10;
  }
}
</style>