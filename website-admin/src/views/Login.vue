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
      <p id="msg">登录成功! 密钥: {{ token }}</p>
    </div>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  width: 50%;
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
    this.token = this.$store.getters.getToken;
    if (this.token !== null && this.token !== undefined && this.token !== "") {
      this.view = false;
    } else {
      this.view = true;
    }
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
            this.view = false;
          }
        },
      });
    },
  },
};
</script>