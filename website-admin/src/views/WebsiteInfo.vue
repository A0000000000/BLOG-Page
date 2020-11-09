<template>
  <div id="app">
    <div id="tips">本页面提供显示日志和访问信息等相关功能.</div>
    <div id="content">
      <div id="left">
        <router-link class="link" to="/websiteInfo/log">日志</router-link>
        <router-link class="link" to="/websiteInfo/accessInfo">访问信息</router-link>
      </div>
      <div id="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  margin: 0px;
  padding: 0px;
}

#tips {
  font-size: 20px;
  padding: 10px 0px;
  color: #66ffcc;
}

#content {
  display: flex;
  flex-direction: row;
  margin: 0px;
  padding: 10px 5px;
}

#left {
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.link {
  padding: 10px 0px;
  font-size: 20px;
  text-decoration: none;
}

#left a.router-link-exact-active {
  color: #42b983;
}

#right {
  width: 80%;
}
</style>

<script>
export default {
  mounted() {
    this.$store.dispatch("reflushToken", {
      params: {},
      callback: () => {
        let token = this.$store.getters.getToken;
        if (!token || token === "" || token === "null") {
          this.$message({
            message: "请先登录",
            type: "warning",
          });
          this.$router.push({ path: "/login" });
        }
      },
    });
  },
};
</script>