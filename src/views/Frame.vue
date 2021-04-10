<template>
    <div>
        <el-menu
            :default-active="activeIndex"
            class="homeHeader"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <div class="title">失物招领系统</div>
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">失物中心</el-menu-item>
            <el-menu-item index="3">寻物中心</el-menu-item>
            <el-menu-item index="4">发布启事</el-menu-item>
            <el-menu-item index="5" style="margin-right: 400px">关于我们</el-menu-item>
            <el-menu-item index="6" v-show="noExitUser">登录</el-menu-item>
            <el-menu-item index="7" v-show="noExitUser">注册</el-menu-item>
            <el-submenu index="8" v-show="!this.noExitUser">
                <template slot="title">个人中心</template>
                <el-menu-item index="8-1">选项1</el-menu-item>
                <el-menu-item index="8-2">选项2</el-menu-item>
                <el-menu-item index="8-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="9" v-show="!this.noExitUser">注销</el-menu-item>
        </el-menu>
        <router-view/>
        <div>

        </div>
    </div>
</template>

<script>
export default {
    name: "Frame",
    data() {
        return {
            user: JSON.parse(window.sessionStorage.getItem("user")),
            activeIndex: '1',
            noExitUser: true,
        }
    },
    mounted() {
        this.initHome();
    },

    methods: {
        handleSelect(key, keyPath) {
            console.log("key:" + key);
            console.log("keyPath:" + keyPath);
            if (key == '1') {
                this.$router.replace('/home')
            }else if (key == '6') {
                this.$router.replace('/login')
            } else if (key == '7'){
                this.$router.replace('/register')
            } else if (key == '9') {
                if (this.user != null) {
                    this.$confirm('确认注销?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout");
                        window.sessionStorage.removeItem("user");
                        this.user = null;
                        this.isExitUser();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
            }
        },
        initHome(){
            this.$router.replace('/home');
        },
    }
}
</script>

<style>
.homeHeader {
    display: flex;
    align-items: center;
    justify-content: center;
}

.homeHeader .title {
    font-size: 30px;
    font-family: 华文行楷;
    margin-right: 300px;
    color: white;
}

.homeHeader .userInfo {
    cursor: pointer;
}

.el-dropdown-link img {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-left: 8px;
}

.el-dropdown-link {
    display: flex;
    align-items: center;
    color: #ffffff;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
    transition: all .8s ease;
}

.slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
{
    transform: translateX(10px);
    opacity: 0;
}
</style>