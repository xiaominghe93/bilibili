<template>
  <div class="edit">
    <div class="nav">
      <Navbar />
    </div>
    <div class="head-img">
      <EditText left="头像">
        <img :src="model.user_img" alt v-if="model.user_img" slot="right" />
        <img src="@/assets/default_img.jpg" alt v-else slot="right" />
      </EditText>
      <van-uploader :after-read="afterRead" class="upload" preview-size="100vw" />
    </div>
    <EditText left="昵称" @editClick="show = !show">
      <a href="javascript:void(0)" slot="right">{{model.name}}</a>
    </EditText>
    <EditText left="账号">
      <a href slot="right">{{model.username}}</a>
    </EditText>
    <EditText left="性别" @editClick="gendershow = !gendershow">
      <a href="javascript:void(0)" slot="right">{{model.gender ? '男' : '女'}}</a>
    </EditText>
    <EditText left="个签" @editClick="descShow = !descShow">
      <a href="javascript:void(0)" slot="right">{{model.desc}}</a>
    </EditText>

    <!-- 返回个人中心 -->
    <div class="backUserinfo" @click="$router.back()">返回个人中心</div>

    <!-- 昵称修改弹出框 -->
    <van-dialog
      v-model="show"
      title="昵称"
      show-cancel-button
      width="288px"
      height="108px"
      @confirm="nameVonfirm"
      @cancle="content = ''"
    >
      <van-field v-model="content" autofocus />
    </van-dialog>

    <!-- 个签修改弹出框 -->
    <van-dialog
      v-model="descShow"
      title="个签"
      show-cancel-button
      width="288px"
      height="108px"
      @confirm="descVonfirm"
      @cancle="content = ''"
    >
      <van-field v-model="content" type="textarea" autofocus />
    </van-dialog>
    
    <!-- 性别选择 -->
    <van-action-sheet v-model="gendershow" :actions="actions" @select="onSelect" cancel-text="取消" />
  </div>
</template>
itle
<script>
import Navbar from "../components/common/Navbar";
import EditText from "../components/common/EditText";
export default {
  data() {
    return {
      model: {},
      show: false,
      descShow: false,
      gendershow: false,
      content: "",
      actions: [
        { name: "男", val: 1 },
        { name: "女", val: 0 }
      ]
    };
  },
  components: {
    Navbar,
    EditText
  },
  methods: {
    //获取用户信息
    async getUserinfo() {
      this.id = localStorage.getItem("id");
      this.token = localStorage.getItem("token");
      const res = await this.$http.get("/user/" + this.id);

      if (res.status == 200) {
        this.model = res.data[0];
      }
    },
    //头像上传
    async afterRead(file) {
      const formdata = new FormData();
      formdata.append("file", file.file);
      const res = await this.$http.post("/upload", formdata);
      if (res.status == 200) {
        this.$msg.success("头像上传成功");
        this.model.user_img = res.data.url;
      }
      this.updateUser();
      this.getUserinfo();
    },
    //数据刷新
    async updateUser() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      if (res.data.code == 200) {
        this.$msg.success("修改成功");
      }
    },
    //昵称修完成提交
    nameVonfirm() {
      this.model.name = this.content;
      this.updateUser();
      this.content = "";
    },
    //个签修改
    descVonfirm() {
      this.model.desc = this.content;
      this.updateUser();
      this.content = "";
    },
    //性别选择
    onSelect(sex) {
      this.model.gender = sex.val;
      this.gendershow = false;
      this.updateUser();
    }
  },
  created() {
    this.getUserinfo();
  }
};
</script>

<style scoped>
.nav {
  margin-bottom: 15.001px;
}

.head-img {
  position: relative;
  overflow: hidden;
}

.head-img .upload {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.head-img img {
  width: 47.999px;
  height: 47.999px;
  border-radius: 50%;
}

.edit a {
  color: #999;
}

.backUserinfo {
  margin-top: 6.944vw;
  height: 8.333vw;
  background: #fff;
  padding: 4.167vw;
  text-align: center;
  line-height: 8.333vw;
  color: #999;
}
</style>