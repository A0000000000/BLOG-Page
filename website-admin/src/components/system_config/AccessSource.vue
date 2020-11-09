<template>
  <div id="app">
    <div class="block">
      <el-table :data="accessSourceData" border style="width: 100%">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
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
    <el-dialog title="新增访问来源" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-form :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.name" auto-complete="off"></el-input>
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
      accessSourceData: [],
      dialogFormVisible: false,
      form: {
        name: null,
      },
    };
  },
  methods: {
    currentChange(page) {
      let params = {
        page,
        count: this.pageSize,
      };
      this.$store.dispatch("getAccessSource", {
        params,
        callback: (data) => {
          console.log(data);
        },
      });
    },
    handleDelete(row) {
      console.log(row);
    },
    showDialog() {
      this.dialogFormVisible = true;
    },
    handleAdd() {
      console.log("add");
    },
  },
};
</script>