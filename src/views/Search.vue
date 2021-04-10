<template>
    <div>
        <div style="width: 1300px;margin: auto;margin-top: 10px">
            <el-card style="display: flex;justify-content: center;width: 1300px">
                <h3 sty>搜索结果：</h3>
                <div v-if="searchResult.length == 0">
                    <h3>未查询到数据</h3>
                </div>
                <div style="display: flex;margin-left: 20px;margin-bottom: 10px;" v-for="(lost,index) in searchResult" :key="index" v-if="searchResult.length != 0">
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
<!--                <div style="display: flex;justify-content: flex-end">-->
<!--                    <el-pagination-->
<!--                        background-->
<!--                        @current-change="currentChange"-->
<!--                        @size-change="sizeChange"-->
<!--                        layout="sizes, prev, pager, next, jumper, ->, total, slot"-->
<!--                        :total="total">-->
<!--                    </el-pagination>-->
<!--                </div>-->
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "Search",
    data() {
        return {
            searchResult: JSON.parse(window.sessionStorage.getItem("searchResult")),
            page:1,
            size:5,
            total:0
        }
    },
    methods:{
        imgUrl(src) {
            if(src == null){
                src = 'default.png';
            }
            return require("@/assets/" + src);
        },
        showLostDetail(detail){
            this.dialogVisible = true;
            this.detail = detail;
        },
        currentChange(currentPage) {
            this.page = currentPage;
        },
        sizeChange(currentSize) {
            this.size = currentSize;
        },
    }
}
</script>

<style scoped>

</style>