<template>
  <div class="navigate-wrap">
    <v-card class="" max-width="500">
      <div class="avatar">
        <img :src="avatarUrl" />
        <v-file-input
          :rules="rules"
          accept="image/png, image/jpeg"
          placeholder="Pick an avatar"
          prepend-icon="mdi-cog"
          label="Avatar"
          :hide-input="true"
          @change="getUrlAvatar($event)"
        ></v-file-input>
      </div>
      {{ rules.value }}
      <!-- <v-list-item-icon> </v-list-item-icon> -->
      <v-list>
        <v-list-item-group v-model="model">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-content>
              <v-list-item
                v-text="item.text"
                :to="item.link"
                link
              ></v-list-item>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "mdi-inbox",
          text: "Прихід",
          link: "/additions",
        },
        {
          icon: "mdi-star",
          text: "Групи",
          link: "/groups",
        },
        {
          icon: "mdi-send",
          text: "Продукти",
          link: "/products",
        },
      ],
      model: 0,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
      avatarUrl: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg",
    };
  },
  methods: {
    getUrlAvatar(event) {
      this.avatarUrl = URL.createObjectURL(new Blob([event]));
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
  }
}

.v-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 0;
}

.navigate-wrap {
  position: relative;
  &::v-deep {
    .v-card > *:first-child:not(.v-btn):not(.v-chip):not(.v-avatar),
    .v-card > .v-card__progress + *:not(.v-btn):not(.v-chip):not(.v-avatar) {
      border-radius: 50%;
    }

    .v-input__prepend-outer {
      border-radius: 50%;
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(250, 228, 228);
      position: absolute;
      z-index: 200000;
      right: 5px;
      top: 90px;
    }
  }
}
</style>
