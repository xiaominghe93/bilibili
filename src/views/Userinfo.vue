<template>
  <div class="userinfo">
    <Navbar />
    <img src="@/assets/bannerTop_new.png" alt />
    <UserInfoEdit :model="model" />
  </div>
</template>

<script>
import Navbar from "../components/common/Navbar";
import UserInfoEdit from "../components/usercomponent/UserInfoEdit";
export default {
  data() {
    return {
      model: {},
      id: "",
      token: ""
    };
  },
  components: {
    Navbar,
    UserInfoEdit
  },
  methods: {
    async getUserinfo() {
      this.id = localStorage.getItem("id");
      this.token = localStorage.getItem("token");
      const res = await this.$http.get("/user/" + this.id);
      if(res.status == 200) {
          this.model = res.data[0]
      }
    }
  },
  created() {
    this.getUserinfo();
  }
};
</script>

<style scoped>
.userinfo img {
  width: 100%;
  height: 100px;
}
</style>>
