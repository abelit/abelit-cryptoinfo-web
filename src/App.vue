<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <a-image
      :src="require('@/assets/app-password-icon.png')"
      alt=""
      :height="50"
      :width="100"
    />
    <!-- <a-avatar :src="require('@/assets/app-password-icon.png')" :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }" /> -->
    <!-- <h1>Password Manager</h1> -->
  </div>
  <router-view />
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
</style>
