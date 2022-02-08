<template>
  <a-layout class="layout-panel">
    <a-laout-header class="header-panel">
      <a-image
        :src="require('@/assets/app-password-keeper.png')"
        alt=""
        :width="150"
        :height="50"
      />
    </a-laout-header>
    <a-laout-content class="content-panel">
      <router-view />
    </a-laout-content>
    <a-layout-footer class="footer-panel">
      Password Keeper ©2022 Created by Abelit
    </a-layout-footer>
  </a-layout>
</template>

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
  height: 60px;
  background-color: #1276c7;
  padding-top: 5px;
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
</style>
