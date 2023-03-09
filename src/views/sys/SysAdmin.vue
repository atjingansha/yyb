<template>
  <div>
    <div style="display: flex; justify-content: center; margin-top: 20px">
      <el-input
        placeholder="通过用户名搜索用户"
        prefix-icon="el-icon-search"
        v-model="keyword"
        style="width: 400px; margin-right: 10px"
        @keydown.enter.native="doSearch"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="doSearch"
        >搜索</el-button
      >
    </div>
    <div class="admin-container">
      <el-card class="admin-card" v-for="(admin, index) in admins">
        <div slot="header" class="clearfix">
          <span>{{ admin.name }}</span>
          <el-button
            style="float: right; padding: 3px 0; color: red"
            icon="el-icon-delete"
            type="text"
            @click="deleteRole(admin)"
          ></el-button>
        </div>
        <div>
          <div class="img-container">
            <img
              :src="admin.userface"
              :alt="admin.name"
              :title="admin.name"
              class="userFaec-img"
            />
          </div>
          <div class="userInfo-container">
            <div>姓名：{{ admin.name }}</div>
            <dic>用户名：{{ admin.username }}</dic>
            <div>手机号：{{ admin.phone }}</div>
            <div>电话号：{{ admin.telephone }}</div>
            <div>地址：{{ admin.address }}</div>
            <div>
              用户状态：
              <el-switch
                v-model="admin.enabled==1?true:false"
                @change="enabledChange(admin)"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                inactive-text="禁用"
              >
              </el-switch>
            </div>
            <div>
              用户角色：
              <el-tag
                style="margin-right: 4px"
                type="success"
                v-for="(role, index) in admin.roles"
                :key="index"
                >{{ role.namezh }}</el-tag
              >
              <el-popover
                placement="right"
                title="角色"
                width="200"
                trigger="click"
              >
                <el-select
                  v-model="selectedRoles"
                  multiple
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(r, index) in allRoles"
                    :key="index"
                    :label="r.namezh"
                    :value="r.id"
                  >
                  </el-option>
                </el-select>
                <el-button
                  slot="reference"
                  type="text"
                  icon="el-icon-more"
                ></el-button>
              </el-popover>
            </div>
            <div>备注：{{ admin.remark }}</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admins: [],
      keyword: "",
      allRoles: [],
      selectedRoles: [],
    };
  },

  mounted() {
    this.initAdmins();
    this.initAllRoles()
  },

  methods: {
    initAllRoles() {
      this.getRequest("/system/basic/permiss").then((resp) => {
        if (resp) {
          this.allRoles = resp;
        }
      });
    },
    initAdmins() {
      this.getRequest("/system/admin/?keyword=" + this.keyword).then((resp) => {
        if (resp) {

          this.admins = resp;
        }
      });
    },
    doSearch() {
      this.initAdmins();
    },
    enabledChange(admin) {
      this.putRequest("/system/admin/", admin).then((resp) => {
        if (resp) {
          this.initAdmins();
        }
      });
    },
    deleteRole(admin) {
      this.$confirm(
        "此操作将永久删除【" + admin.name + "】, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.deleteRequest("/system/admin/" + admin.id).then((resp) => {
            if (resp) {
              this.initAdmins();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.admin-card {
  margin-left: 8px;
  width: 350px;
  margin-bottom: 20px;
}

.admin-container {
  display: flex;
  margin-top: 30px;
  justify-content: left;
  flex-wrap: wrap;
}
.userFaec-img {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
.img-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.userInfo-container {
  font-size: 13px;
  color: #409eff;
}
</style>