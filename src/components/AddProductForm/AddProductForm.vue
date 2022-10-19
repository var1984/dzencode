<template>
  <div class="form-wrap">
    <v-form v-model="valid">
      <v-text-field
        label="Назва"
        required
        v-model="formData.title"
        :rules="[(v) => !!v]"
      ></v-text-field>

      <v-spacer></v-spacer>
      <v-dialog ref="dialog" v-model="modal" persistent width="290px">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="formData.date"
            label="Виберіть дату"
            readonly
            v-bind="attrs"
            :rules="[(v) => !!v]"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="formData.date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(formData.date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
      <v-text-field
        label="Ціна грн"
        required
        type="number"
        v-model="priceGRN"
        :rules="[(v) => !!v]"
      ></v-text-field>
      <v-text-field
        label="Ціна usd"
        required
        type="number"
        v-model="priceUSD"
        :rules="[(v) => !!v]"
      ></v-text-field>
      <v-text-field
        label="Специфікація"
        required
        v-model="formData.specification"
        :rules="[(v) => !!v]"
      ></v-text-field>
      <v-select
        label="Item"
        required
        :items="listElementGroup"
        v-model="selectData"
        :rules="[(v) => !!v]"
      ></v-select>
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="addProduct"
      >
        Validate
      </v-btn>
      <v-btn color="error" class="mr-4" @click="closeModal">Close</v-btn>
    </v-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "AddProductForm",

  data() {
    return {
      formData: {
        title: "",
        date: "",
        specification: "",
      },
      priceGRN: 0,
      priceUSD: 0,
      selectData: "",
      valid: true,
      modal: false,
      showModal: true,
    };
  },
  methods: {
    selectValue(value) {
      this.selectData = value;
    },
    addProduct() {
      this.$store.commit("setNewProduct", {
        formData: this.formData,
        selectData: this.selectData,
        priceData: {
          priceGRN: this.priceGRN,
          priceUSD: this.priceUSD,
        },
      });
      this.$emit("closeModal", false);
    },
    closeModal() {
      this.showModal = false;
      this.$emit("closeModal", this.modal);
    },
  },
  computed: {
    ...mapGetters({
      orders: "orders",
    }),
    listElementGroup() {
      return this.orders.map((item) => item.title);
    },
  },
};
</script>
<style lang="scss" scoped>
.form-wrap {
  position: fixed;
  padding: 25px;
  width: 500px;
  border: 5px solid green;
  border-radius: 10px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &::v-deep {
    .v-picker__title {
      border-radius: 0;
      width: 100%;
    }
  }
}
</style>