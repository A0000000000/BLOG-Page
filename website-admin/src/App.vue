<template>
  <div id="app">
    <div id="title">网站后台管理页面</div>
    <div id="nav">
      <router-link to="/">首页</router-link>|
      <router-link to="/login">登录</router-link>|
      <router-link to="/systemConfig">系统配置</router-link>|
      <router-link to="/websiteInfo">网站信息</router-link>|
      <router-link to="/userInfo">用户信息</router-link>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: gray;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px 15%;
  padding: 50px 0px;
}

#title {
  text-align: center;
  font-size: 30px;
  color: skyblue;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>