<template>
  <div class="login-container">
    <!-- 左侧 form -->
    <div class="form-wrapper">
      <!-- 标题 -->
      <div class="title-box">
        <img class="login-logo" src="../../assets/login_icon.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" status-icon>
        <!-- 手机号 -->
        <el-form-item label prop="phone">
          <el-input
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
            class="phone-input"
            v-model="loginForm.phone"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            class="password-input"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label prop="captcha">
          <el-row class="captcha-row">
            <el-col :span="17">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="loginForm.captcha"></el-input>
            </el-col>
            <el-col :span="7">
              <img class="captcha" @click="changeCaptcha" :src="captchaSrc" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-checkbox class="checkbox" v-model="checked">
          我已阅读同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-checkbox>
        <!-- 登录 注册按钮 -->
        <el-button class="login-btn" @click="submitForm('loginForm')" type="primary">登录</el-button>
        <el-button class="reg-btn" @click="showReg=true" type="primary">注册</el-button>
      </el-form>
    </div>
    <!-- 右侧 图片 -->
    <img src="../../assets/login_bg.png" alt />
    <!-- 注册对话框 -->
    <el-dialog title="用户注册" class="reg-dialog" :visible.sync="showReg">
      <!-- 菜单 -->
      <el-form :model="registerForm">
        <!-- 头像 -->
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://183.237.67.218:3002/uploads"
            :show-file-list="false"
            name="image"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="registerForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="registerForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.code" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <!-- 图形验证码 -->
              <img class="captcha" @click="changeRegCaptcha" :src="regCaptcha" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <!-- 获取手机验证码 -->
              <el-button
                class="captcha-btn"
                @click="getMessage"
                type="primary"
                :disabled="isDisabled"
              >{{ btnTxt }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showReg">取 消</el-button>
        <el-button type="primary" @click="registerUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入 axios
import axios from "axios";
export default {
  name: "login",
  data() {
    // 自定义手机号验证函数
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      setTimeout(() => {
        if (reg.test(value)) {
          callback();
        } else {
          // 不符合
          callback(new Error("手机号错了"));
        }
      }, 1000);
    };
    return {
      // 登录表单数据
      loginForm: {
        phone: "",
        password: "",
        captcha: ""
      },
      // 登录验证规则
      loginRules: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 3,
            max: 8,
            message: "长度在 3 到 8 个字符",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "验证码只有4位",
            trigger: "blur"
          }
        ]
      },
      // 验证码地址
      captchaSrc: "http://183.237.67.218:3002/captcha?type=login",
      // 协议勾选
      checked: true,
      // 是否显示注册框
      showReg: false,
      // 注册表单数据
      registerForm: {},
      // 注册表单右面文字宽度
      formLabelWidth: "67px",
      // 头像图片地址
      imageUrl: "",
      // 注册图形验证码 地址
      regCaptcha: "http://183.237.67.218:3002/captcha?type=sendsms",
      // 注册 获取验证码
      btnTxt: "获取短信验证码",
      // 按钮禁用
      isDisabled: false
    };
  },
  // 方法
  methods: {
    // 点击刷新验证码
    changeCaptcha() {
      this.captchaSrc = `http://183.237.67.218:3002/captcha?type=login&${Date.now()}`;
    },
    // 点击登录按钮
    submitForm(formName) {
      // 判断协议是否勾选值
      if (!this.checked) {
        return this.$message.warning("未勾选用户协议");
      }
      // this.$refs['ruleForm']==> 获取饿了么的表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证成功 调用接口
          axios({
            url: "http://183.237.67.218:3002/login",
            method: "post",
            data: {
              phone: this.loginForm.phone,
              password: this.loginForm.password,
              code: this.loginForm.captcha
            },
            withCredentials: true // 跨域axios请求显示验证码错误(默认为false)
            // with
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("你可算回来了!");
            } else {
              this.$message.warning("登录失败了!");
            }
          });
        } else {
          // 验证失败
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    // 图片上传的方法
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 文件上传之前对文件做的一些限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 重新获取注册 图形验证码
    changeRegCaptcha() {
      // 修改地址
      this.regCaptcha = `http://183.237.67.218:3002/captcha?type=sendsms&${Date.now()}`;
    },
    // 获取短信验证码
    getMessage() {
      // 非空判断
      if (this.registerForm.phone.trim() == "") {
        this.$message.warning("手机号没输");
        return;
      }
      // 格式判断
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.registerForm.phone)) {
        return this.$message.warning("手机号格式不对");
      }
      // axios请求
      axios({
        url: "http://183.237.67.218:3002/sendsms",
        method: "post",
        data: {
          code: this.registerForm.code,
          phone: this.registerForm.phone
        },
        // 跨域携带cookie
        withCredentials: true
      }).then(res => {
        //成功回调
        window.console.log(res);
      });

      let time = 60;
      // 禁用按钮 开启定时器
      this.isDisabled = true;
      const interId = setInterval(() => {
        // 递减
        time--;
        // 修改页面
        this.btnTxt = `${time}S后再次获取`;
        if (time == 0) {
          clearInterval(interId);
          // 重新启用按钮
          this.isDisabled = false;
          // 还原文本
          this.btnTxt = "获取短信验证码";
        }
      }, 100);
    },
    // 用户注册
    registerUser() {
      axios({
        url: "http://183.237.67.218:3002/register",
        method: "post",
        data: {
          avatar: this.registerForm.avatar,
          email: this.registerForm.email,
          name: this.registerForm.name,
          password: this.registerForm.password,
          phone: this.registerForm.phone,
          rcode: this.registerForm.rcode
        },
        withCredentials: true
      }).then(res => {
        //成功回调
        window.console.log(res);
      });
    }
  }
};
</script>

<style lang="less">
// 登录盒子
.login-container {
  height: 100%;
  display: flex;
  align-items: center; // 上下居中
  justify-content: space-around; // 水平对齐
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .form-wrapper {
    width: 478px;
    height: 550px;
    padding: 48px 41px 0 43px;
    box-sizing: border-box;
    background-color: #f5f5f5;
    .title-box {
      display: flex;
      align-items: center;
      .login-logo {
        width: 22px;
        height: 17px;
        margin-right: 14px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background-color: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .phone-input {
      margin-top: 30px;
    }
    .password-input {
      margin-top: 25px;
    }
    .captcha-row {
      margin-top: 25px;
      .captcha {
        width: 100%;
        height: 42px;
      }
    }
    // 协议
    .checkbox {
      color: #999;
      font-size: 14px;
      margin-top: 32px;
      display: flex;
      align-items: center;
      .el-checkbox__label {
        display: flex;
        align-items: center;
      }
    }
    .login-btn,
    .reg-btn {
      width: 100%;
      margin-left: 0;
      margin-top: 27px;
    }
  }
}
// 头像组件样式
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
// 对话框中的样式
.reg-dialog .el-dialog {
  width: 602px;
}
.reg-dialog {
  // 头部样式
  .el-dialog__header {
    text-align: center;
    background: linear-gradient(to right, #01c5fa, #1394fa);
    .el-dialog__title {
      color: white;
    }
  }
  // 注册 验证码样式
  .captcha {
    height: 41px;
    width: 100%;
  }

  .captcha-btn {
    width: 100%;
    height: 41px;
  }
  // 底部
  .dialog-footer {
    text-align: center;
  }
}
</style>