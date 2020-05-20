<template>
  <div class="navbar">
    <div class="logo" @click="$router.push('/home')">
      <img src="@/assets/logo.png" alt />
    </div>
    <div>
      <p>
        <van-icon class="icon-search" name="search" />请输入内容
      </p>
    </div>
    <div>
      <img :src="imgurl" alt v-if="imgurl" @click="$router.push('/edit')" />
      <img src="@/assets/default_img.jpg" alt v-else @click="$router.push('/login')" />
      <p>下载APP</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgurl: ""
    };
  },
  methods: {
    async getUserImg() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get("/user/" + localStorage.getItem("id"));
        this.imgurl = res.data[0].user_img;
      }
    }
  },
  mounted() {
    this.getUserImg();
  }
};
</script>

<style scoped>
.navbar {
  height: 12.5vw;
  background-color: #fff;
  display: flex;
}

.navbar div {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 4.444vw;
}

.navbar .logo {
  width: 27.778vw;
  height: 100%;
}

.navbar .logo img {
  width: 22vw;
}

.navbar div:nth-child(2) {
  width: 45vw;
  padding: 5px 5px;
}

.navbar div:nth-child(2) p {
  width: 90%;
  height: 35px;
  padding-left: 40px;
  line-height: 35px;
  color: #565656;
  font-size: 16px;
  background-color: #f4f4f4;
  border-radius: 15px;
  position: relative;
}

.navbar div:nth-child(2) p .icon-search {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  color: #565656;
}

.navbar div:nth-child(3) {
  width: 33.333vw;
  padding: 0 10px;
}

.navbar div:nth-child(3) img {
  width: 6.667vw;
  height: 6.667vw;
  margin-right: 10px;
  border-radius: 50%;
}

.navbar div:nth-child(3) p {
  width: 16.667vw;
  height: 25px;
  line-height: 25px;
  text-align: center;
  padding: 5px 5px;
  background: #fb7299;
  font-size: 14px;
  color: #fff;
  border-radius: 5px;
}
</style>>
