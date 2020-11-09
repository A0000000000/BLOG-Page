<template>
  <div id="app">
    <div class="input" v-if="view">
      <div class="item">
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
      </div>
      <div class="item">
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      </div>
      <div class="item">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
    <div v-if="!view">
      <p id="msg">已登录, 密钥: {{ token }}</p>
      <div>
        <el-button type="primary" @click="saveToken">保存密钥</el-button>
        <el-button type="primary" @click="deleteToken">删除密钥</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px;
  padding: 0px 10%;
}

.input {
  width: auto;
}

.item {
  margin: 20px 0px;
  padding: 0px 50px;
}

#msg {
  word-wrap: break-word;
  word-break: break-all;
  text-align: left;
  color: black;
}
</style>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      view: true,
      token: null,
    };
  },
  mounted() {
    this.$store.dispatch("reflushToken", {
      params: {
        token: this.token,
      },
      callback: () => {
        this.token = this.$store.getters.getToken;
        this.view = !this.token || this.token === "" || this.token === "null";
      },
    });
  },
  methods: {
    login() {
      let params = {
        username: this.username,
        password: this.password,
      };
      this.$store.dispatch("login", {
        params,
        callback: (data) => {
          if (data.code === 0) {
            this.token = this.$store.getters.getToken;
            this.$message({
              message: "登录成功",
              type: "success",
            });
            this.view = false;
          } else {
            this.$message.error(data.message);
          }
        },
      });
    },
    saveToken() {
      if (this.token && this.token !== "") {
        window.localStorage.setItem("a00000_blog_token", this.token);
        this.$message({
          message: "保存成功",
          type: "success",
        });
      } else {
        this.$message.error("保存失败, 密钥为空");
      }
    },
    deleteToken() {
      window.localStorage.removeItem("a00000_blog_token");
      this.$message({
        message: "删除成功",
        type: "success",
      });
    },
  },
};
</script>