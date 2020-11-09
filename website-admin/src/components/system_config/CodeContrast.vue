<template>
  <div id="app">
    <div class="block">
      <el-table :data="codeContrastData" border style="width: 100%">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="value" label="值"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleDelete(scope.row)" size="small">删除</el-button>
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
          <el-button type="primary" @click="showDialog">新增</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="新增错误对照表" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-form :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="值">
          <el-input v-model="form.value" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
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
      codeContrastData: [],
      dialogFormVisible: false,
      form: {
        name: null,
        value: null,
      },
    };
  },
  methods: {
    currentChange(page) {
      this.$store.dispatch("getCodeContrasts", {
        params: {
          page,
          count: this.pageSize,
        },
        callback: (data) => {
          if (data.code === 0) {
            this.codeContrastData = data.data.data;
            this.pageSize = data.data.count;
            this.total = data.data.sum;
            this.page = page;
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
          this.$store.dispatch("deleteCodeContrasts", {
            params: row,
            callback: (data) => {
              if (data.code === 0) {
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
    showDialog() {
      this.dialogFormVisible = true;
    },
    handleAdd() {
      let params = {
        name: this.form.name,
        value: this.form.value,
      };
      this.$store.dispatch("addCodeContrasts", {
        params,
        callback: (data) => {
          if (data.code !== 0) {
            this.$message.error(data.message);
          } else {
            this.form.name = null;
            this.form.value = null;
            this.dialogFormVisible = false;
            this.$message({
              message: "添加成功.",
              type: "success",
            });
            this.currentChange(1);
          }
        },
      });
    },
  },
};
</script>