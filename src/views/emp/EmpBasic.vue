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
        <el-button type="primary" @click="searchByName" icon="el-icon-search"
          >搜索</el-button
        >
        <el-button type="primary" icon="el-icon-more"> 高级搜索 </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-button type="success" icon="el-icon-upload2"> 导入数据 </el-button>
        <el-button type="success" icon="el-icon-download"> 导出数据 </el-button>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addEmp"
        >
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
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
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
        <el-table-column
          prop="politicsStatus.name"
          label="政治面貌"
          width="110"
        >
        </el-table-column>
        <el-table-column align="left" prop="email" label="邮箱" width="200">
        </el-table-column>
        <el-table-column align="left" prop="phone" label="电话号码" width="115">
        </el-table-column>
        <el-table-column
          align="left"
          prop="address"
          label="联系地址"
          width="300"
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
          width="120"
        >
        </el-table-column>
        <el-table-column prop="position.name" label="职位" width="100">
        </el-table-column>

        <el-table-column prop="engageForm" label="聘用形式" width="100">
        </el-table-column>

        <el-table-column prop="tiptopDegree" label="最高学历" width="80">
        </el-table-column>

        <el-table-column
          align="left"
          prop="specialty"
          label="所学专业"
          width="150"
        >
        </el-table-column>

        <el-table-column
          align="left"
          prop="school"
          label="毕业院校"
          width="150"
        >
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
      <div>
        <el-dialog title="添加员工" :visible.sync="dialogVisible" width="80%">
          <div>
            <el-form ref="form" :model="emp" label-width="80px">
              <el-row :gutter="0">
                <el-col :span="6">
                  <el-form-item label="姓名: " prop="name">
                    <el-input
                      size="mini"
                      style="width: 150px"
                      prefix-icon="el-icon-edit"
                      v-model="emp.name"
                      placeholder="请输入员工姓名..."
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="性别: " prop="gender">
                    <el-radio-group
                      v-model="emp.gender"
                      style="margin-top: 13px"
                    >
                      <el-radio label="男">男</el-radio>
                      <el-radio label="女">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="出生日期" prop="birthday">
                    <el-date-picker
                      v-model="emp.birthday"
                      type="date"
                      size="mini"
                      style="width: 150px"
                      value-format="yyyy-MM-dd"
                      placeholder="出生日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="政治面貌" prop="politicId">
                    <el-select
                      size="mini"
                      style="width: 200px"
                      v-model="emp.politicId"
                      placeholder="政治面貌"
                    >
                      <el-option
                        v-for="item in politicsStatus"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="民族" prop="nationId">
                    <el-select
                      size="mini"
                      style="width: 150px"
                      v-model="emp.nationId"
                      placeholder="民族"
                    >
                      <el-option
                        v-for="item in nations"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="籍贯" prop="nativePlace">
                    <el-input
                      v-model="emp.nativePlace"
                      plaveholder="请输入籍贯..."
                      size="mini"
                      style="width: 150px"
                      prefix-icon="el-icon-edit"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="电子邮箱" prop="email">
                    <el-input
                      v-model="emp.email"
                      placeholder="请输入电子邮箱..."
                      size="mini"
                      style="width: 150px"
                      prefix-icon="el-icon-message"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="联系地址" prop="address">
                    <el-input
                      v-model="emp.address"
                      placeholder="请输入通讯地址"
                      size="mini"
                      style="width: 200px"
                      prefix-icon="el-icon-edit"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="职位" prop="posId">
                    <el-select
                      size="mini"
                      style="width: 150px"
                      v-model="emp.posId"
                      placeholder="职位"
                    >
                      <el-option
                        v-for="item in positions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="职称" prop="jobLevelId">
                    <el-select
                      size="mini"
                      style="width: 150px"
                      v-model="emp.jobLevelId"
                      placeholder="职称"
                    >
                      <el-option
                        v-for="item in joblevels"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="所属部门" prop="departmentId">
                    <el-popover
                      placement="right"
                      title="请选择部门"
                      width="200"
                      trigger="manual"
                      v-model="visible"
                    >
                      <el-tree
                        :data="allDeps"
                        default-expand-all
                        :props="defaultProps"
                      ></el-tree>
                      <div
                        slot="reference"
                        style="
                          width: 150px;
                          display: inline-flex;
                          border: 1px solid #dedede;
                          height: 24px;
                          border-radius: 5px;
                          cursor: pointer;
                          align-items: center;
                          font-size: 13px;
                          padding-left: 8px;
                          box-sizing: border-box;
                        "
                      >
                        {{ inputDepName }}
                      </div>
                    </el-popover>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="电话号码" prop="phone">
                    <el-input
                      v-model="emp.phone"
                      placeholder="请输入电话号码..."
                      size="mini"
                      style="width: 200px"
                      prefix-icon="el-icon-phone"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="工号" prop="workID">
                    <el-input
                      disabled
                      v-model="emp.workID"
                      placeholder="请输入工号..."
                      size="mini"
                      style="width: 150px"
                      prefix-icon="el-icon-edit"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="学历" prop="tiptopDegree">
                    <el-select
                      size="mini"
                      style="width: 150px"
                      v-model="emp.tiptopDegree"
                      placeholder="学历"
                    >
                      <el-option
                        v-for="item in tiptopDegrees"
                        :key="item"
                        :label="item"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="毕业院校" prop="school">
                    <el-input
                      v-model="emp.school"
                      placeholder="请输入学校..."
                      size="mini"
                      style="width: 150px"
                      prefix-icon="el-icon-edit"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="毕业院校" prop="specialty">
                    <el-input
                      v-model="emp.specialty"
                      placeholder="请输入专业名称..."
                      size="mini"
                      style="width: 200px"
                      prefix-icon="el-icon-edit"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="入职日期" prop="beginDate">
                    <el-date-picker
                      v-model="emp.beginDate"
                      type="date"
                      size="mini"
                      style="width: 165px"
                      value-format="yyyy-MM-dd"
                      placeholder="入职日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="转正日期" prop="conversionTime">
                    <el-date-picker
                      v-model="emp.conversionTime"
                      type="date"
                      size="mini"
                      style="width: 165px"
                      value-format="yyyy-MM-dd"
                      placeholder="转正日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="合同开始" prop="beginContract">
                    <el-date-picker
                      v-model="emp.beginContract"
                      type="date"
                      size="mini"
                      style="width: 170px"
                      value-format="yyyy-MM-dd"
                      placeholder="合同开始日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="合同截止" prop="endContract">
                    <el-date-picker
                      v-model="emp.endContract"
                      type="date"
                      size="mini"
                      style="width: 170px"
                      value-format="yyyy-MM-dd"
                      placeholder="合同截止日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="身份证号" prop="idCard">
                    <el-input
                      v-model="emp.idCard"
                      placeholder="请输入身份证号码..."
                      size="mini"
                      style="width: 200px"
                      prefix-icon="el-icon-edit"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="聘用形式" prop="engageForm">
                    <el-radio-group
                      v-model="emp.engageForm"
                      style="margin-top: 13px"
                    >
                      <el-radio label="劳动合同">劳动合同</el-radio>
                      <el-radio label="劳务合同">劳务合同</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="婚姻状况" prop="wedlock">
                    <el-radio-group
                      v-model="emp.wedlock"
                      style="margin-top: 13px"
                    >
                      <el-radio label="已婚">已婚</el-radio>
                      <el-radio label="未婚">未婚</el-radio>
                      <el-radio label="离异">离异</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
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
      empName: "",
      dialogVisible: false,
      politicsStatus: [],
      nations: [],
      joblevels: [],
      allDeps: [],
      positions: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      inputDepName: "",
      tiptopDegrees: [
        "博士",
        "硕士",
        "本科",
        "大专",
        "高中",
        "初中",
        "小学",
        "其他",
      ],
      visible: false,
      visible2: false,
      emp: {
        id: null,
        name: "",
        gender: "",
        birthday: "",
        idCard: "",
        wedlock: "",
        nationId: null,
        nativePlace: "",
        politicId: null,
        email: "",
        phone: "",
        address: "",
        departmentId: null,
        jobLevelId: null,
        posId: null,
        engageForm: "",
        tiptopDegree: "",
        specialty: "",
        school: "",
        beginDate: "",
        workID: "",
        contractTerm: null,
        conversionTime: "",
        notWorkDate: null,
        beginContract: "",
        endContract: "",
        workAge: null,
        salaryId: null,
      },
    };
  },
  mounted() {
    this.getAllEmp();
  },

  methods: {
    addEmp() {
      this.dialogVisible = true;

      this.getSelectData();
      this.initPositions();
      this.getMaxWorkId();
    },
    getMaxWorkId() {
      this.getRequest("/system/employee/maxWorkId").then((resp) => {
        if (resp) {
          this.emp.workID = resp.obj;
        }
      });
    },
    getSelectData() {
      if (!window.sessionStorage.getItem("nations")) {
        this.getRequest("system/employee/nation").then((resp) => {
          this.nations = resp;
          window.sessionStorage.setItem("nations", JSON.stringify(resp));
        });
      } else {
        this.nations = JSON.parse(window.sessionStorage.getItem("nations"));
      }

      if (!window.sessionStorage.getItem("joblevels")) {
        this.getRequest("system/employee/joblevels").then((resp) => {
          this.joblevels = resp;
          window.sessionStorage.setItem("joblevels", JSON.stringify(resp));
        });
      } else {
        this.joblevels = JSON.parse(window.sessionStorage.getItem("joblevels"));
      }

      if (!window.sessionStorage.getItem("politicsStatus")) {
        this.getRequest("system/employee/politicsStatus").then((resp) => {
          this.politicsStatus = resp;
          window.sessionStorage.setItem("politicsStatus", JSON.stringify(resp));
        });
      } else {
        this.politicsStatus = JSON.parse(
          window.sessionStorage.getItem("politicsStatus")
        );
      }
    },
    getAllEmp() {
      this.loading = true;
      this.getRequest(
        "/system/employee?pageNum=" +
          this.pageNum +
          "&pageSize=" +
          this.pageSize +
          "&name=" +
          this.empName
      ).then((resp) => {
        if (resp) {
          this.emps = resp.data;
          this.total = resp.total;
          this.loading = false;
        }
      });
    },

    initPositions() {
      this.getRequest("/system/employee/positions").then((resp) => {
        this.positions = resp;
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
    searchByName() {
      if (this.empName) {
        this.getAllEmp();
      } else {
        this.$message({
          type: "info",
          message: "搜索内容不能为空",
        });
      }
    },

    clear() {
      this.getAllEmp();
    },
  },
};
</script>

<style></style>