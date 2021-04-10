<template>
    <div class="Register">
        <el-form
            :rules="rules"
            ref="RegisterForm"
            :model="RegisterForm"
            label-width="110px" class="RegisterContainer">
            <el-form-item label="用户名：" prop="username">
                <el-input style="width: 300px;" placeholder="请输入用户名" v-model="RegisterForm.username" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input style="width: 300px;" placeholder="请输入密码" v-model="RegisterForm.password"></el-input>
            </el-form-item>
            <el-form-item label="头像：" prop="userFace">
                <el-upload
                    class="avatar-uploader"
                    action="/all/uploadUserFace"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="昵称：" prop="nickName">
                <el-input style="width: 300px;" v-model="RegisterForm.nickName" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="gender">
                <el-radio-group v-model="RegisterForm.gender">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="身份证号码：" prop="idCard">
                <el-input placeholder="身份证号码" style="width: 300px;" prefix-icon="el-icon-edit"
                          v-model="RegisterForm.idCard"></el-input>
            </el-form-item>
            <el-form-item label="电话号码：" prop="phone">
                <el-input placeholder="电话号码" style="width: 300px;" prefix-icon="el-icon-phone"
                          v-model="RegisterForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件：" prop="email">
                <el-input placeholder="请输入电子邮件" style="width: 300px;" prefix-icon="el-icon-message"
                          v-model="RegisterForm.email"></el-input>
            </el-form-item>
            <div style="display: flex;justify-content: center">
                <el-button size="normal" type="primary" style="width: 100%" @click="submitRegister">注册</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            RegisterForm: {
                username: '',
                password: '',
                userFace: '',
                nickName: '',
                gender: '',
                idCard: '',
                phone: '',
                email: '',
            },
            imageUrl: '',
            rules:{
                username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
                password: [{required: true, message: '密码不能为空', trigger: 'blur'},{min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}],
                nickName: [{required: true, message: '昵称不能为空', trigger: 'blur'}],
                gender: [{required: true, message: '请选择性别', trigger: 'blur'}],
                idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur'}, {
                    pattern: /(^[1-9]\d{5}(18|19|[23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9]|10|20|30|31|)\d{3}[0-9Xx]$)|(^[1-9]]d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                    message: '身份证号码格式不正确',
                    trigger: 'blur'
                }],
                phone: [{required: true, message: '请输入手机号', trigger: 'blur'}],
                email: [{required: true, message: '请输入邮箱', trigger: 'blur'}, {
                    type: 'email',
                    message: '邮箱格式不正确',
                    trigger: 'blur'
                }],
            }
        }
    },
    methods: {
        submitRegister() {
            this.$refs.RegisterForm.validate((valid) => {
                if (valid) {
                    this.postKeyValueRequest('/all/addUser', this.RegisterForm).then(resp => {
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
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.RegisterForm.userFace = "/user/" + res.obj;
            console.log("this.userFace：" + this.userFace)
        },
        beforeAvatarUpload(file) {
            console.log('调用上传前的方法');
            console.log(file);
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
    }
}
</script>

<style >
.RegisterContainer {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 150px auto;
    width: 500px;
    padding: 35px 35px 15px 35px;
    background: #ffffff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.Register{
    background: url("../assets/login.jpg");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    width: 100%
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
</style>