import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    orders: null,
    additionsProducts: null,
  },
  getters: {
    orders(state) {
      return state.orders;
    },
    additionsProducts(state) {
      return state.additionsProducts;
    },
  },
  mutations: {
    setProducts(state, data) {
      state.orders = data;
    },
    setAdditionsProducts(state, payload) {
      state.additionsProducts = payload;
    },
    setNewProduct(state, { formData, selectData, priceData }) {
      const price = {
        ...formData,
        price: [
          { isDefault: 0, symbol: "USD", value: priceData.priceUSD },
          { isDefault: 1, symbol: "UAH", value: priceData.priceGRN },
        ],
      };
      return state.orders.find((item) => {
        if (item.title === selectData) {
          item.products.push(price);
        }
      });
    },
  },
  actions: {
    async getData({ commit }) {
      const data = await axios.get("/products.json");
      const newData = (orders) => {
        try {
          const arr = orders.map((el) => {
            return el.products.map((item) => {
              return {
                sumUSD: item.price[0].value,
                sumGRN: item.price[1].value,
              };
            });
          });

          return orders.map((el, i) => {
            const sum = [...arr[i]].reduce((acc, item) => ({
              sumGRN: acc.sumGRN + item.sumGRN,
              sumUSD: acc.sumUSD + item.sumUSD,
            }));

            return {
              ...orders[i],
              allSum: { sumGRN: sum.sumGRN, sumUSD: sum.sumUSD },
            };
          });
        } catch (e) {
          console.log(e);
        }
      };
      commit("setProducts", newData(data.data.orders));
    },
  },
  modules: {},
});
