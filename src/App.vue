<template>
  <a-layout class="layout-panel">
    <a-laout-header class="header-panel">
      <a-row>
        <a-col :span="6" :offset="9">
          <a-image
            :src="require('@/assets/app-password-keeper.png')"
            alt=""
            :width="150"
            :height="50"
          />
        </a-col>

        <a-col :span="2" :offset="7">
          <a-dropdown class="app-profile">
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="profile"> Profile </a-menu-item>
                <a-menu-item key="logout"> Logout </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              <!-- <span style="font-size: 18px; color: #fff">
                {{ userInfo.username ? userInfo.username : "尚未登录" }}</span
              >  -->
              user
            </a-button>
          </a-dropdown>
        </a-col>
      </a-row>
    </a-laout-header>
    <a-laout-content class="content-panel">
      <router-view />
    </a-laout-content>
    <a-layout-footer class="footer-panel">
      Password Keeper ©2022 Created by Abelit
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const handleButtonClick = (e: Event) => {
      console.log("click left button", e);
    };
    const handleMenuClick = (e: Event | any) => {
      console.log("click", e);
      if (e.key === "logout") {
        store.dispatch("logout").then(() => {
          console.log("logout success");
          router.push("/#");
        });
      }
    };
    return {
      handleButtonClick,
      handleMenuClick,
    };
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.header-panel {
  height: 48px;
  line-height: 48px;
  background-color: #1276c7;
}
.layout-panel {
  height: 100vh;
}
.content-panel {
  height: 100%;
  align-content: center;
  justify-content: center;
}
.footer-panel {
  height: 60px;
  background-color: #1276c7;
  text-align: center;
}
.app-profile {
  margin-left: 20px;
  background-color: #1276c7 !important;
  border-color: #1276c7 !important;
}
</style>
