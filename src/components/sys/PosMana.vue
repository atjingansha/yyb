<template>
  <div>
    <div>
      <el-input
        size="small"
        class="addInput"
        placeholder="添加职位"
        suffix-icon="el-icon-circle-plus"
        v-model="position.name"
        @keydown.enter.native="addPos"
      >
      </el-input>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-circle-plus"
        @click="addPos"
        >添加</el-button
      >
    </div>

    <div class="positionMain">
      <el-table
        :data="positionList"
        border
        style="width: 70%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="编号" width="55"> </el-table-column>
        <el-table-column prop="name" label="职位" width="120">
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button
      size="small"
      style="margin-top: 8px"
      type="danger"
    :disabled="this.multipleSelection.length==0"
      @click="deleteMany"
      >批量删除</el-button
    >
    <div>
      <el-dialog title="修改职位信息" :visible.sync="dialogVisible" width="30%">
        <div>
          <el-tag style="margin-left: 8px">职位名称</el-tag>
          <el-input
            v-model="updatePos.name"
            size="small"
            class="updatePosInput"
          ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="doupdate">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      position: {
        name: "",
      },

      positionList: [],
      dialogVisible: false,
      updatePos: {
        name: "",
      },
      multipleSelection:[]
    };
  },

  mounted() {
    this.getPosition();
  },

  methods: {
    addPos() {
      if (this.position.name) {
        this.postRequest("/system/basic/pos", this.position).then((resp) => {
          if (resp.code == 200) {
            this.getPosition();
            this.position.name = "";
          } else {
            this.$message({
              type: "error",
              message: "添加失败",
            });
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "内容不能为空",
        });
      }
    },

    getPosition() {
      this.getRequest("/system/basic/pos").then((resp) => {
        this.positionList = resp;
      });
    },

    handleEdit(index, data) {
      Object.assign(this.updatePos, data);
      this.updatePos.createDate = "";
      this.dialogVisible = true;
    },

    handleDelete(index, data) {
      this.$confirm('此操作将永久删除"' + data.name + '", 是否继续?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 调用接口后更新
          this.deleteRequest("/system/basic/pos/" + data.id).then((resp) => {
            if (resp) {
              this.getPosition();
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    doupdate() {
      this.putRequest("/system/basic/pos", this.updatePos).then((resp) => {
        if (resp) {
          this.getPosition();
          this.dialogVisible = false;
        }
      });
    },

      deleteMany(){
      this.$confirm('此操作将永久删除'+this.multipleSelection.length+'条职位, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '?';
        this.multipleSelection.forEach(item=>{
          ids += 'ids='+item.id+'&';
        });
        // 调用接口后更新
        this.deleteRequest('/system/basic/pos/'+ids).then(resp=>{
          if(resp){
            this.getPosition();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  },
};
</script>

<style>
.addInput {
  width: 300px;
  margin-right: 10px;
}
.positionMain {
  margin-top: 20px;
  text-align: center;
}

.updatePosInput {
  width: 200px;
  margin-left: 8px;
}
</style>