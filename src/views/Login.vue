<template>
    <div class="logo">
            <el-form
                :rules="rules"
                v-loading="loading"
                element-loading-text="登陆中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                ref="loginForm"
                :model="loginForm"
                class="loginContainer">
                <h3 class="loginTitle">失物招领系统</h3>

                <el-form-item prop="username">
                    <el-input size="normal" type="text" v-model="loginForm.username" auto-complete="off"
                              aria-placeholder="请输入用户名"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input size="normal" type="password" v-model="loginForm.password" auto-complete="off"
                              aria-placeholder="请输入密码" @keydown.enter.native="submitLogin"></el-input>
                </el-form-item>

                <el-checkbox size="normal" class="loginRemember" v-model="checked">记住我</el-checkbox>
                <div style="display: flex;justify-content: space-between">

                    <el-button size="normal" type="primary" style="width: 50%" @click="submitLogin">登录</el-button>
                    <el-button size="normal" type="success" style="width: 50%" @click="doRegister">注册</el-button>
                </div>
            </el-form>

    </div>
</template>

<script>


export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                username: 'admin',
                password: '123'
            },
            loading:false,
            checked: true,
            rules: {
                username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}]
            },
        }
    },
    mounted() {
        this.isExitUser();
        this.initData();
        this.initLostArticles();
    },
    methods: {
        submitLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.postKeyValueRequest('doLogin', this.loginForm).then(resp => {
                        this.loading = false
                        if (resp) {
                            window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
                            let path = this.$route.query.redirect;
                            this.$router.replace((path == '/login'|| path == undefined) ? '/' : path);
                        }
                    })
                } else {
                    this.$message.error('请输入所有字段');
                    return false;
                }
            })
        },
        doRegister(){
            this.$router.replace('/register');
        }
    }
}
</script>

<style>
.loginContainer {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 300px auto;
    width: 300px;
    padding: 35px 35px 15px 35px;
    background: #ffffff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
    margin: 15px auto 20px auto;
    text-align: center;
    color: #505458;
}

.loginRemember {
    text-align: left;
    margin: 0 0 15px 0;
}

.logo{
    background: url("../assets/login.jpg");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    width: 100%
}
</style>