<template>
    <div class="home">
        <el-card style="display: flex;justify-content: center;width: 1300px;margin: auto;margin-top: 10px">
            <div>
                <el-input placeholder="请输入物品名进行搜素..." prefix-icon="el-icon-search"
                          clearable
                          @clear=""
                          style="width: 300px;margin-right: 10px" v-model="keywords"
                          @keydown.enter.native="" :disabled="showAdvanceSearchView"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="searchLostArticles" :disabled="showAdvanceSearchView">
                    搜索
                </el-button>
                <el-button type="primary" @click="showAdvanceSearchView = !showAdvanceSearchView">
                    <i :class="showAdvanceSearchView ? 'fa fa-angle-double-up' : 'fa fa-angle-double-down'"
                       aria-hidden="true" style="margin-right: 5px"></i>高级搜索
                </el-button>
            </div>
        </el-card>
        <transition name="slide-fade">
            <el-card v-show="showAdvanceSearchView"
                     style="display: flex;justify-content: center;width: 1300px;margin: auto;margin-top: 10px">
                <div>
                    <el-tag style="margin-right: 10px">启事类型</el-tag>
                    <el-select style="width: 150px" v-model="searchValue.noticeId" placeholder="请选择" size="small">
                        <el-option
                            v-for="notice in noticeTypes"
                            :key="notice.id"
                            :label="notice.noticeType"
                            :value="notice.id">
                        </el-option>
                    </el-select>
                    <el-tag style="margin-right: 10px;margin-left: 10px">失物类别</el-tag>
                    <el-select style="width: 150px" v-model="searchValue.typeId" placeholder="请选择" size="small">
                        <el-option
                            v-for="type in lostTypes"
                            :key="type.id"
                            :label="type.typeName"
                            :value="type.id">
                        </el-option>
                    </el-select>
                    <el-tag style="margin-right: 10px;margin-left: 10px">丢失时间</el-tag>
                    <el-date-picker
                        v-model="searchValue.lostTime"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                    <el-tag style="margin-right: 10px;margin-left: 10px">关键字</el-tag>
                    <el-input size="small" placeholder="请输入物品名进行搜素..." prefix-icon="el-icon-search"
                              clearable
                              @clear=""
                              style="width: 300px;margin-right: 10px" v-model="searchValue.keywords"
                              @keydown.enter.native="" :disabled="!showAdvanceSearchView"></el-input>
                    <el-button size="small" type="primary" icon="el-icon-search" @click="searchLostArticles('advanced')">搜索
                    </el-button>
                </div>
            </el-card>
        </transition>
        <div style="display: flex;justify-content: center;width: 1300px;margin: auto;margin-top: 10px">
            <el-card style="width: 645px;margin-right: 10px">
                <h3>最新招领：</h3>
                <div style="display: flex;margin-left: 20px;margin-bottom: 10px;" v-for="(lost,index) in lostArticles" :key="index">
                    <img :src="imgUrl(lost.img)" style="width: 300px;height: 250px;border-radius: 10px;margin-right: 20px">
                    <table style="margin-top: 20px;">
                        <tr>
                            <td ><el-tag size="small" style="margin-right: 10px">物品名称：</el-tag></td>
                            <td >{{lost.name}}</td>
                        </tr>
                        <tr>
                            <td><el-tag size="small">物品名称：</el-tag></td>
                            <td>{{lost.lostPlace}}</td>
                        </tr>
                        <tr>
                            <td><el-tag size="small">丢失时间：</el-tag></td>
                            <td>{{lost.lostTime}}</td>
                        </tr>
                        <tr>
                            <td><el-tag size="small">丢失人：</el-tag></td>
                            <td>{{lost.user.nickName}}</td>
                        </tr>
                        <tr>
                            <td><el-tag size="small">联系电话：</el-tag></td>
                            <td>{{lost.user.phone}}</td>
                        </tr>
                        <tr>
                            <td><el-tag size="small">找回状态：</el-tag></td>
                            <td :style="lost.state ? 'color : red' : 'color:#50D690'">{{lost.state ? '已认领' : '未认领'}}</td>
                        </tr>
                        <tr>
                            <td ><el-link type="primary"></el-link></td>
                            <td ><el-link type="primary"></el-link></td>
                            <td ><el-link  type="primary" @click="showLostDetail(lost.detail)">更多信息</el-link></td>
                        </tr>
                    </table>
                </div>
            </el-card>
            <el-card style="width: 645px;">
                <h3>最新寻物</h3>
            </el-card>
        </div>
        <el-dialog
            title="物品详细信息"
            :visible.sync="dialogVisible"
            width="30%">
            <span>{{detail}}</span>
            <span slot="footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            user: JSON.parse(window.sessionStorage.getItem("user")),
            // activeIndex: '1',
            noExitUser: true,
            keywords:'',
            showAdvanceSearchView: false,
            noticeTypes: [],
            lostTypes: [],
            detail:'',
            dialogVisible:false,
            searchValue: {
                noticeId: null,
                typeId: null,
                lostTime: null,
                keywords: null,
            },
            lostArticles:[],
            page:1,
            size:5,

            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
        }
    },
    mounted() {
        this.isExitUser();
        this.initData();
        this.initLostArticles();
    },
    methods:{
        searchLostArticles(type){
            let url = '/all/lostArticles/?page=' + this.page + "&size=" + this.size
            console.log('url:' + url);
            if (type && type == 'advanced') {
                if (this.searchValue.typeId){
                    url += '&typeId=' + this.searchValue.typeId
                }
                if (this.searchValue.noticeId){
                    url += '&noticeId=' + this.searchValue.noticeId
                }
                if(this.searchValue.lostTime){
                    url += '&lostTime=' + this.searchValue.lostTime
                }
                if(this.searchValue.keywords){
                    url += '&name=' + this.searchValue.keywords
                }
            } else {
                if(this.keywords) {
                    url += '&name=' + this.keywords;
                }
            }
            this.getRequest(url).then(resp => {
                if (resp){
                    this.lostArticles = resp.data;
                    window.sessionStorage.setItem("searchResult", JSON.stringify(resp.data));
                    console.log("resp.data ::" + resp.data)
                    let path = this.$route.fullPath;
                    console.log(this.$route);
                    if (path != '/search'){
                        this.$router.replace('/search');
                    }else {
                        window.sessionStorage.setItem("currentPath", JSON.stringify("/search"));
                        this.$router.replace('/skip');
                    }
                }
            })
        },
        showLostDetail(detail){
            this.dialogVisible = true;
            this.detail = detail;
        },

        imgUrl(src) {
            if(src == null){
                src = 'default.png';
            }
            return require("@/assets" + src);
        },
        isExitUser() {
            if (this.user == null) {
                this.noExitUser = true;
            } else {
                this.noExitUser = false;
            }
        },
        initLostArticles() {
            this.getRequest("/all/lostArticles").then(resp => {
                if (resp){
                    this.lostArticles = resp.data;
                }
            })
        },
        initData(){
            if (!window.sessionStorage.getItem("notices")) {
                this.getRequest("/all/notices").then(resp => {
                    if (resp) {
                        this.noticeTypes = resp;
                        window.sessionStorage.setItem("notices", JSON.stringify(resp));
                    }
                })
            } else {
                this.noticeTypes = JSON.parse(window.sessionStorage.getItem("notices"))
            }
            if (!window.sessionStorage.getItem("types")) {
                this.getRequest("/all/types").then(resp => {
                    if (resp) {
                        this.lostTypes = resp;
                        window.sessionStorage.setItem("types", JSON.stringify(resp));
                    }
                })
            } else {
                this.lostTypes = JSON.parse(window.sessionStorage.getItem("types"))
            }
        }
    }
}
</script>

<style scoped>
.home{
    background: url("../assets/login.jpg");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    width: 100%
}
</style>