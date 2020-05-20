<template>
  <div>
    <login-top middleTop="注册bilibili">
      <div slot="right" style="font-size: 3.133vw;" @click="$router.push('/login')">登录</div>
    </login-top>
    <login-text
      label="姓名"
      style="margin:2.667vw 0;"
      placeholder="请输入姓名"
      rule="^.{6,16}$"
      @contentChange="res => model.name = res"
    />
    <login-text
      label="用户名"
      placeholder="请输入用户名"
      rule="^.{6,16}$"
      @contentChange="res => model.username = res"
    />
    <login-text
      label="密码"
      type="password"
      placeholder="请输入密码"
      rule="^.{6,16}$"
      @contentChange="res => model.password = res"
    />
    <login-btn btnText="注册" @registerSubmit="registerSubmit" />
  </div>
</template>

<script>
import LoginTop from "../components/common/LoginTop.vue";
import LoginText from "../components/common/LoginText.vue";
import LoginBtn from "../components/common/LoginBtn.vue";

export default {
  data() {
    return {
      model: {
        name: "",
        username: "",
        password: ""
      }
    };
  },
  components: {
    LoginTop,
    LoginText,
    LoginBtn
  },
  methods: {
    async registerSubmit() {
      //axios 返回的是一个promise 是异步执行 使用.then回导致后面的代码先执行 需要使用异步请求
      let rulg = /^.{6,16}$/;
      if (
        rulg.test(this.model.name) &&
        rulg.test(this.model.username) &&
        rulg.test(this.model.password)
      ) {
        const res = await this.$http.post("register", this.model);
        if (res.status == 200 && res.data.code == 200) {
          this.$msg.success(res.data.msg);
          localStorage.setItem('id', res.data.id)
          localStorage.setItem('token', res.data.token)
          setTimeout(() => {
            this.$router.push('/userinfo')
          },1000)
        } else {
          this.$msg.fail(res.data.msg);
        }
      } else {
        this.$msg.fail("格式不正确 请重新输入");
      }
    }
  }
};
</script>

<style scoped>
</style>