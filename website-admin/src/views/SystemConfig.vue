<template>
  <div id="app">
    <div id="tips">本页面提供和系统配置相关操作的功能</div>
    <div id="content">
      <div id="left">
        <router-link class="link" to="/systemConfig/codeContrast">错误码对照表</router-link>
        <router-link class="link" to="/systemConfig/accessSource">访问来源</router-link>
        <router-link class="link" to="/systemConfig/config">系统配置</router-link>
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
  data() {
    return {
      token: null,
    };
  },
  methods: {},
};
</script>