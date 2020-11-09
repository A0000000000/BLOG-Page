<template>
  <div id="app">
    <div class="block">
      <el-table :data="accessInfoData" border style="width: 100%">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="url" label="请求地址"></el-table-column>
        <el-table-column prop="ip" label="请求ip"></el-table-column>
        <el-table-column prop="accessTime" label="请求时间"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="currentChange"
      ></el-pagination>
    </div>
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
      accessInfoData: [],
    };
  },
  methods: {
    currentChange(page) {
      this.$store.dispatch("getAccessInfos", {
        params: { page, count: this.pageSize },
        callback: (data) => {
          if (data.code === 0) {
            let tmp = data.data;
            this.pageSize = tmp.count;
            this.accessInfoData = tmp.data;
            this.total = tmp.sum;
          } else {
            this.$message.error(data.message);
          }
        },
      });
    },
  },
};
</script>
