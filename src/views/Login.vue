<template>
  <div>
    <el-form
      :rules="rules"
      ref="Loginform"
      :model="Loginform"
      class="loginClass"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="Loginform.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="Loginform.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          type="text"
          v-model="Loginform.code"
          placeholder="点击图片更换验证码"
          style="width: 250px; margin-right: 5px"
        ></el-input>
        <img :src="imageUrl" @click="updateImage" />
      </el-form-item>
      <el-checkbox v-model="checked" class="remember">记住我</el-checkbox>
      <el-button type="primary" style="width: 100%" @click="submitLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      checked: false,
      imageUrl: "/captcha?time=" + new Date(),
      Loginform: {
        username: "admin",
        password: "123",
        code: "",
      },
      //校验规则
      rules: {
        username: { required: true, message: "请输入用户名", trigger: "blur" },
        password: { required: true, message: "请输入密码", trigger: "blur" },
        code: { required: true, message: "请输入验证码", trigger: "blur" },
      },
    };
  },
  methods: {
    submitLogin() {
      this.$refs.Loginform.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.postRequest("/login", this.Loginform).then((resp) => {
            if (resp) {
              if (resp.code == 200) {
                const token = resp.obj.tokenHead + resp.obj.token;
                this.loading = false;
                window.sessionStorage.setItem("token", token);

                let path = this.$route.query.redirect;
                this.$router.replace((path=='/' || path==undefined)?'/home':path);
              }
            } else {
              this.$router.replace("/");
              this.loading = false;
            }
          });
        } else {
          this.$message.error("请输入所有字段");
          return false;
        }
      });
    },

    //更换验证码
    updateImage() {
      this.imageUrl = "/captcha?time=" + new Date();
    },
  },
};
</script>

<style>
.loginClass {
  border-radius: 15px;
  background-clip: border-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: white;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle {
  margin: 0px auto 40px auto;
  text-align: center;
}
.remember {
  text-align: left;
  margin: 0px 0px 15px;
}
.el-form-item__content {
  display: flex;
  align-items: center;
}
</style>