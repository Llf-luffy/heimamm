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
              <img class="captcha" @click="changeCaptcha" src="../../assets/captcha.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-checkbox class="checkbox">
          我已阅读同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-checkbox>
        <!-- 登录 注册按钮 -->
        <el-button class="login-btn" type="primary">登录</el-button>
        <el-button class="reg-btn" type="primary">注册</el-button>
      </el-form>
    </div>
    <!-- 右侧 图片 -->
    <img src="../../assets/login_bg.png" alt />
  </div>
</template>

<script>
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
      captchaSrc: ""
    };
  },
  // 方法
  methods: {
    // 点击刷新验证码
    changeCaptcha() {
      this.captchaSrc = `http://183.237.67.218:3002/captcha?type=login&${Date.now()}`;
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
</style>