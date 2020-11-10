<template>
  <div id="app">
    <div class="block">
      <el-table :data="configData" border style="width: 100%">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="value" label="值"></el-table-column>
        <el-table-column prop="info" label="信息"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleUpdate(scope.row)"
              size="small"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.row)"
              size="small"
            ></el-button>
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
          <el-button type="primary" @click="showDialog(0)">新增</el-button>
        </div>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-form :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="值">
          <el-input v-model="form.value" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="信息">
          <el-input v-model="form.info" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
</style>
<script>
export default {
  mounted() {
    let token = this.$store.getters.getToken;
    if (!token || token === "" || token === "null") {
      this.$router.push({ path: "/systemConfig/" });
    } else {
      this.currentChange(1);
    }
  },
  data() {
    return {
      page: 1,
      total: 0,
      pageSize: 5,
      configData: [],
      dialogFormVisible: false,
      title: "",
      form: {
        id: null,
        name: null,
        value: null,
        info: null,
        status: 0,
      },
    };
  },
  methods: {
    currentChange(page) {
      let params = {
        page,
        count: this.pageSize,
      };
      this.$store.dispatch("getConfig", {
        params,
        callback: (data) => {
          if (data.code === 0) {
            this.configData = data.data.data;
            this.page = data.data.page;
            this.total = data.data.sum;
          } else {
            this.$message.error(data.message);
          }
        },
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("deleteConfig", {
            params: row,
            callback: (data) => {
              if (data.code === 0) {
                console.log(data);
                this.$message({
                  message: "删除成功.",
                  type: "success",
                });
                this.currentChange(1);
              } else {
                this.$message.error(data.message);
              }
            },
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleUpdate(row) {
      this.showDialog(1, row);
    },
    showDialog(status, params) {
      this.status = status;
      if (status === 1) {
        this.title = "更新配置";
        this.form.id = params.id;
        this.form.name = params.name;
        this.form.value = params.value;
        this.form.info = params.info;
      } else {
        this.title = "新增配置";
      }
      this.dialogFormVisible = true;
    },
    handleSure() {
      let url = this.status === 0 ? "addConfig" : "updateConfig";
      this.$store.dispatch(url, {
        params: this.form,
        callback: (data) => {
          if (data.code === 0) {
            this.form.id = null;
            this.form.name = null;
            this.form.value = null;
            this.form.info = null;
            this.dialogFormVisible = false;
            this.$message({
              message: "更新成功.",
              type: "success",
            });
            this.currentChange(1);
          } else {
            this.$message.error(data.message);
          }
        },
      });
    },
  },
};
</script>