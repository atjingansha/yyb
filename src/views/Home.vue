<template>
  <el-container>
    <el-header class="header">
      <div class="title" @click="toHome"  >云E办</div>

      <i class="el-dropdown-link" style="margin-bottom: 4px">
        <img class="img-border" :src="user.userFace" />
      </i>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link" style="margin-top: 6px">
          <span style="color: #fff; margin-right: 10px; margin-top: 2px">
            欢迎您，{{ user.name }}
          </span>
        </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
          <el-dropdown-item command="setting">设置</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu router  >
          <el-submenu
            :index="index + ''"
            v-for="(item, index) in routes"
            :key="index"
            v-show="!item.hidden"
          >
            <template slot="title"
              ><i class="el-icon-location"> </i>{{ item.name }}</template
            >

            <el-menu-item
              :index="children.path"
              v-for="(children, indexj) in item.children"
              :key="indexj"
              >{{ children.name }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$route.path != '/home'">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            this.$router.currentRoute.name
          }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div v-if="this.$route.path == '/home'" class="welcome">欢迎来到云E办系统</div>
        <router-view class="homeRouterView"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",


  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),

    };
  },

  methods: {
    handleCommand(command) {
      if (command == "logout") {
        this.$confirm("此操作将退出云E办, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.getRequest("/logout");

            window.sessionStorage.removeItem("token");
            window.sessionStorage.removeItem("user");
            this.$store.commit("initRoutes", []);
            this.$router.push("/");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消退出",
            });
          });
      }
    },

    toHome(){
      this.$router.push('/home')
    },



  },

  computed: {
    routes() {
      return this.$store.state.routes;
    },
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.header {
  background: #409eff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}

.header .title {
  font-size: 30px;
  font-family: 华文楷体;
  color: rgb(247, 245, 245);
     cursor: pointer;
}

.el-dropdown-link {
  cursor: pointer;
  color: #2e2e2e;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.welcome{
  text-align: center;
  font-size: 90px;
  font-family: 华文楷体;
  color: rgb(106, 43, 224);
  padding-top: 50px;
}
.homeRouterView {
  margin-top: 10px;
}
</style>