<template>
  <div>
    <div style="display: flex; justify-content: space-between">
      <div>
        <el-input
          prefix-icon="el-icon-search"
          style="width: 300px; margin-right: 10px"
          placeholder="请输入员工名进行搜索"
          v-model="empName"
          @keydown.enter.native="searchByName"
          clearable
          @clear="clear"
        ></el-input>
        <el-button type="primary"     @click="searchByName" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" icon="el-icon-more"> 高级搜索 </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-button type="success" icon="el-icon-upload2"> 导入数据 </el-button>
        <el-button type="success" icon="el-icon-download"> 导出数据 </el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline">
          添加员工
        </el-button>
      </div>
    </div>
    <div>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="emps"
        border
        stripe
        style="width: 100%; margin-top: 5px"
      >
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column align="left" fixed prop="name" label="姓名" width="65">
        </el-table-column>
        <el-table-column align="left" prop="workID" label="工号" width="90">
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="50">
        </el-table-column>
        <el-table-column
          align="left"
          prop="birthday"
          label="出生日期"
          width="100"
        >
        </el-table-column>
        <el-table-column
          align="left"
          prop="idCard"
          label="身份证号"
          width="170"
        >
        </el-table-column>
        <el-table-column prop="wedlock" label="婚姻状况" width="80">
        </el-table-column>
        <el-table-column prop="nation.name" label="民族" width="50">
        </el-table-column>
        <el-table-column prop="nativePlace" label="籍贯" width="65">
        </el-table-column>
        <el-table-column prop="politicsStatus.name" label="政治面貌" width="80">
        </el-table-column>
        <el-table-column align="left" prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column align="left" prop="phone" label="电话号码" width="115">
        </el-table-column>
        <el-table-column
          align="left"
          prop="address"
          label="联系地址"
          width="260"
        >
        </el-table-column>

        <el-table-column
          align="left"
          prop="department.name"
          label="所属部门"
          width="100"
        >
        </el-table-column>
        <el-table-column
          align="left"
          prop="joblevel.name"
          label="职称"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="position.name" label="职位" width="100">
        </el-table-column>

        <el-table-column prop="engageForm" label="聘用形式" width="100">
        </el-table-column>

        <el-table-column prop="tiptopDegree" label="最高学历" width="80">
        </el-table-column>

        <el-table-column prop="specialty" label="所学专业" width="100">
        </el-table-column>

        <el-table-column prop="school" label="毕业院校" width="100">
        </el-table-column>

        <el-table-column prop="beginDate" label="入职日期" width="100">
        </el-table-column>

        <el-table-column prop="workState" label="在职状态" width="100">
        </el-table-column>

        <el-table-column prop="conversionTime" label="转正日期" width="100">
        </el-table-column>

        <el-table-column prop="beginContract" label="合同起始日期" width="105">
        </el-table-column>

        <el-table-column prop="endContract" label="合同结束日期" width="105">
        </el-table-column>
        <el-table-column label="合同期限" width="100">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.contractTerm }}</el-tag
            >年
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button style="padding: 3px" size="mini">编辑</el-button>
            <el-button style="padding: 3px" size="mini" type="primary"
              >查看高级资料</el-button
            >
            <el-button style="padding: 3px" size="mini" type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end">
        <el-pagination
          background
          @current-change="current"
          @size-change="sizeChange"
          @prev-click="prev"
          @next-click="next"
          layout="sizes,prev, pager, next, jumper, ->, total"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emps: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      loading: false,
      empName:''
    };
  },
  mounted() {
    this.getAllEmp();
  },

  methods: {
    getAllEmp() {
      this.loading = true;
      this.getRequest(
        "/system/employee?pageNum=" +
          this.pageNum +
          "&pageSize=" +
          this.pageSize
          +'&name='+this.empName
      ).then((resp) => {
        if (resp) {
          this.emps = resp.data;
          this.total = resp.total;
          this.loading = false;
        }
      });
    },

    current(currentPage) {
      this.pageNum = currentPage;
      this.getAllEmp();
    },

    sizeChange(size) {
      this.pageSize = size;
      this.getAllEmp();
    },

    prev(currentPage) {
      if (currentPage > 1) {
       this.pageNum = currentPage - 1;
       this.getAllEmp();
      }
    },

    next(currentPage) {
             if (currentPage < this.total) {
       this.pageNum = currentPage + 1;
       this.getAllEmp();
      }
    },
    searchByName(){
        if(this.empName){
            this.getAllEmp();
            
        }else{
            this.$message({
                type:"info",
                message:"搜索内容不能为空"
            })
        }
    },

    clear(){
            this.getAllEmp();
    }
  },
};
</script>

<style>
</style>