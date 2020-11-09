<template>
  <div id="app">
    <div class="block">
      <el-table :data="logData" border style="width: 100%">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="logTime" label="日期"></el-table-column>
        <el-table-column prop="level" label="等级"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleClick(scope.row)" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="currentChange"
      ></el-pagination>
    </div>

    <el-dialog
      title="日志内容"
      :visible.sync="dialogVisible"
      width="30%"
      center
      :modal-append-to-body="false"
    >
      <span>{{ logMessage }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
#app {
  display: block;
  margin: 0px;
  padding: 0px;
  width: 100%;
}
#block {
  width: 100%;
  margin: 0px;
  padding: 0px;
}
</style>

<script>
export default {
  mounted() {
    let token = this.$store.getters.getToken;
    if (!token || token === "" || token === "null") {
      this.$router.push({ path: "/websiteInfo/" });
    } else {
      this.currentChange(1);
    }
  },
  data() {
    return {
      total: 0,
      pageSize: 5,
      logData: [],
      dialogVisible: false,
      logMessage: null,
    };
  },
  methods: {
    currentChange(page) {
      let params = {
        page,
        count: this.pageSize,
      };
      this.$store.dispatch("getLogs", {
        params,
        callback: (data) => {
          if (data.code === 0) {
            let tmp = data.data;
            this.pageSize = tmp.count;
            this.logData = tmp.data;
            this.total = tmp.sum;
          } else {
            this.$message.error(data.message);
          }
        },
      });
    },
    handleClick(row) {
      this.logMessage = row.message;
      this.dialogVisible = true;
    },
  },
};
</script>