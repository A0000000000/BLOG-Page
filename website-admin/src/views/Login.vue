<template>
  <div id="app">
    <div class="input">
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
</style>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      let params = {
        username: this.username,
        password: this.password,
      };
      this.$axios.post('/admin/login', params).then(res => {
          let data = res.data;
          console.log(data);
      });
    },
  },
};
</script>