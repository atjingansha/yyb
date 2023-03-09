<template>
  <div>
    <div class="permissionMana">
      <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
        <template slot="prepend">ROLE</template>
      </el-input>
      <el-input
        size="small"
        placeholder="请输入角色中文名"
        v-model="role.nameZh"
      >
      </el-input>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="addRole"
        >添加角色</el-button
      >
    </div>
    <div>
      <el-collapse
        v-model="activeName"
        accordion
        style="margin-top: 20px; width: 800px"
        @change="change"
      >
        <el-collapse-item
          :title="R.namezh"
          :name="R.id"
          v-for="(R, index) in roles"
          :key="index"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问资源</span>
              <el-button
                style="float: right; padding: 3px 0; color: red"
                icon="el-icon-delete"
                type="text"
              ></el-button>
            </div>
            <div>
              <el-tree
                :default-checked-keys="selectMunes"
                node-key="id"
                show-checkbox
                ref="tree"
                :data="allMenus"
                :props="defaultProps"
              ></el-tree>

              <div style="display: flex; justify-content: flex-end">
                <el-button size="mini" type="text" @click="cancelUpdate"
                  >关闭</el-button
                >
                <el-button
                  size="mini"
                  type="text"
                  @click="doUpdate(R.id, index)"
                  >确认修改</el-button
                >
              </div>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: {
        name: "",
        nameZh: "",
      },
      roles: [],

      activeName: "1",
      allMenus: [],
      defaultProps: {
        children: "children",
        label: "name",
      },

      selectMunes: [],
    };
  },

  mounted() {
    this.getRoles();
  },

  methods: {
    addRole() {
      if (!this.role.name || !this.role.nameZh) {
        this.$message({
          type: "error",
          message: "请补全信息",
        });
      }
      let name='Role'+this.role.name
    },

    doUpdate(rid, index) {
      let tree = this.$refs.tree[index];
      let selectedKeys = tree.getCheckedKeys(true);
      let url = "/system/basic/permiss/?rid=" + rid;

      if (selectedKeys) {
        selectedKeys.forEach((key) => {
          url += "&mids=" + key;
        });
      }
      url += "&mids=";

      this.putRequest(url).then((resp) => {
        if (resp) {
          this.activeName = -1;
        }
      });
    },
    cancelUpdate() {
      this.activeName = -1;
    },

    getMenuIdByRid(rid) {
      this.getRequest("/system/basic/permiss/mid/" + rid).then((resp) => {
        if (resp) {
          this.selectMunes = resp;
        }
      });
    },

    getRoles() {
      this.getRequest("/system/basic/permiss").then((resp) => {
        if (resp) {
          this.roles = resp;
        }
      });
    },

    change(rid) {
      if (rid) {
        this.getMenuIdByRid(rid);
        this.initRoleMenus();
      }
    },

    initRoleMenus() {
      this.getRequest("/system/basic/permiss/menus").then((resp) => {
        if (resp) {
          this.allMenus = resp;
        }
      });
    },
  },
};
</script>

<style>
.permissionMana {
  display: flex;
  justify-content: flex-start;
}

.permissionMana .el-input {
  width: 300px;
  margin-right: 8px;
}
</style>