<template>
  <div class="login">
    <el-form ref="form" :rules="rules" :model="form" class="container">
      <el-for-item>
        <div class="avatar">
          <img src="../assets/avatar.jpg" alt="">
        </div>
      </el-for-item>
      <el-form-item prop="username">
        <el-input v-model="form.username" prefix-icon="el-icon-search" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" show-password prefix-icon="el-icon-search" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
         <el-button type="primary" class="login-btn"  @click="submit('form')">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {checkUser} from '../api/index'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        // 必须先进行验证，判断是否输入账号密码，然后才发送post请求
        if (valid) {
          checkUser(this.form).then(res => {
            // 对请求结果进行判断，
            if (res.meta.status === 200) {
              // 如果成功就进行跳转，并保存服务端返回的token值到localstorage中
              localStorage.setItem('myToken', res.data.token)
              this.$router.push({name: 'home'})
            } else {
              // 如果失败则弹出提示
              this.$message({
                message: '登陆失败，请重新输入账号或密码',
                type: 'error'
              })
            }
          })
        } else {
          alert('请确认是否已经输入账号或密码')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
