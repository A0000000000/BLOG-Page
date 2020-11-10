<template>
  <div id="app">
    <div class="block">
      <el-table :data="userData" border style="width: 100%">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="message" label="签名"></el-table-column>
        <el-table-column fixed="right" label="全部信息">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleClick(scope.row)" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div id="footer">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="currentChange"
          :current-page="page"
        ></el-pagination>
        <div>
          <el-button type="primary" @click="addUser">新增用户</el-button>
        </div>
      </div>
    </div>

    <el-dialog
      title="详细信息"
      :visible.sync="dialogVisible"
      width="30%"
      center
      :modal-append-to-body="false"
    >
      <div>
        <div class="item">id: {{showData.id}}</div>
        <div class="item">用户名: {{ showData.username }}</div>
        <div class="item">创建时间: {{ showData.createTime }}</div>
        <div class="item">邮箱: {{ showData.email }}</div>
        <div class="item">签名: {{ showData.message }}</div>
        <div class="item">文件夹: {{ showData.fileDirectory }}</div>
        <div class="item">
          状态: {{ showData.status }}
          <el-button type="primary" size="mini" @click="changeStatus(showData)">修改状态</el-button>
        </div>
        <div class="item">生日: {{ showData.birthday }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新增用户" :visible.sync="userFormVisible" :modal-append-to-body="false">
      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" auto-complete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="签名">
          <el-input v-model="form.message" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" v-model="form.birthday" auto-complete="off"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
#footer {
  display: flex;
  justify-content: space-around;
  padding: 10px 0px;
}
.item {
  font-size: 15px;
  height: 50px;
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
        } else {
          this.currentChange(1);
        }
      },
    });
  },
  data() {
    return {
      page: 1,
      total: 0,
      pageSize: 5,
      userData: [],
      dialogVisible: false,
      userFormVisible: false,
      showData: {},
      form: {
        username: null,
        password: null,
        email: null,
        message: null,
        birthday: null,
      },
    };
  },
  methods: {
    currentChange(page) {
      let params = {
        page,
        count: this.pageSize,
      };
      this.$store.dispatch("getUserView", {
        params,
        callback: (data) => {
          if (data.code === 0) {
            this.userData = data.data.data;
            this.total = data.data.sum;
            this.page = data.data.page;
          } else {
            this.$message.error(data.message);
          }
        },
      });
    },
    handleClick(row) {
      this.showData = row;
      this.dialogVisible = true;
    },
    changeStatus(data) {
      this.$store.dispatch("changeUserStatus", {
        params: {
          id: data.id,
          status: data.status === 0 ? 1 : 0,
        },
        callback: (res) => {
          if (res.code === 0) {
            this.$message({
              message: "更新成功.",
              type: "success",
            });
            this.dialogVisible = false;
            this.currentChange(1);
          } else {
            this.$message.error(res.message);
          }
        },
      });
    },
    addUser() {
      this.userFormVisible = true;
    },
    handleSure() {
      this.$store.dispatch("addUser", {
        params: this.form,
        callback: (data) => {
          console.log(data);
          if (data.code === 0) {
            this.currentChange(1);
            this.form.username = null;
            this.form.password = null;
            this.form.email = null;
            this.form.message = null;
            this.form.birthday = null;
            this.userFormVisible = false;
          } else {
            this.$message.error(data.message);
          }
        },
      });
    },
  },
};
</script>