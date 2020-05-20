<template>
  <div class="artile-detail" v-if="model">
    <Navbar />
    <div class="content">
      <video controls="controls" :src="model.content"></video>
      <div class="article-info">
        <span class="title">{{model.category.title}}</span>
        <span>{{model.name}}</span>
        <div class="user">
          <span>{{model.userinfo.name}}</span>
          <span>145.3万次播放</span>
          <span>54646弹幕</span>
          <span>{{model.date}}</span>
        </div>
        <div class="handle">
          <p @click="storeClick" :class="{active:activeStore}">
            <span class="iconfont icon-danseshixintubiao-"></span>
            <span>收藏</span>
          </p>
          <p @click="attentionClick" :class="{active:activeAttention}">
            <span class="iconfont icon-31guanzhu1xuanzhong"></span>
            <span>关注</span>
          </p>
          <p>
            <span class="iconfont icon-arrow-"></span>
            <span>分享</span>
          </p>
        </div>
      </div>
    </div>
    <div class="recommend">
      <HomeContent
        style="width: 45%;"
        v-for="(item2 , index) in item1"
        :key="index"
        :item2="item2"
      />
    </div>
    <ArticleComent />
  </div>
</template>

<script>
import Navbar from "../components/common/Navbar";
import HomeContent from "../components/common/HomeContent";
import ArticleComent from "../components/article/artileComent";

export default {
  data() {
    return {
      model: null,
      item1: null,
      activeStore: null,
      activeAttention: null
    };
  },
  components: {
    Navbar,
    HomeContent,
    ArticleComent
  },
  methods: {
    //获取文章信息
    async getArticle() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
      this.getIfAttention();
    },
    //获取推荐文章
    async getRecommend() {
      const res = await this.$http.get("/commend");
      this.item1 = res.data;
    },
    //点击收藏与取消
    async storeClick() {
      if (localStorage.getItem("id") && localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/collection/" + localStorage.getItem("id"),
          { article_id: this.$route.params.id }
        );
        if (!res) return;
        if (res.data.msg == "收藏成功") {
          this.activeStore = true;
          this.$msg.success(res.data.msg);
        } else {
          this.activeStore = false;
          this.$msg.success(res.data.msg);
        }
      }
    },
    //进入页面获取用户是否收藏该文章
    async getIfStore() {
      if (localStorage.getItem("id") && localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/collection/" + localStorage.getItem("id"),
          {
            params: { article_id: this.$route.params.id }
          }
        );
        this.activeStore = res.data.success;
      }
    },
    //点击关注该作者
    async attentionClick() {
      if (localStorage.getItem("id") && localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/sub_scription/" + localStorage.getItem("id"),
          { sub_id: this.model.userid }
        );
        if (!res) return;
        if (res.data.msg == "关注成功") {
          this.activeAttention = true;
          this.$msg.success(res.data.msg);
        } else {
          this.activeAttention = false;
          this.$msg.success(res.data.msg);
        }
      }
    },
    //刷新页面获取改用户是否关注该文章作者
    async getIfAttention() {
      if (
        localStorage.getItem("id") &&
        localStorage.getItem("token") &&
        this.model.userid
      ) {
        const res = await this.$http.get(
          "/sub_scription/" + localStorage.getItem("id"),
          {
            params: { sub_id: this.model.userid }
          }
        );
        console.log(res);
        this.activeAttention = res.data.success;
      }
    }
  },
  watch: {
    $route() {
      this.getArticle();
      this.getRecommend();
    }
  },
  created() {
    this.getArticle();
    this.getRecommend();
    this.getIfStore();
  }
};
</script>

<style scoped>
.artile-detail {
  background: #fff;
}

.content video {
  width: 100vw;
}

.content .article-info {
  padding: 15px 15px;
}

.article-info .title {
  background: #f4f4f4;
  color: #fb7299;
  padding: 5px 10px;
  border-radius: 10px;
  margin-right: 5px;
}

.article-info .user {
  margin-top: 15px;
  padding-left: 5px;
}

.article-info .user span {
  color: #aaaaaa;
  font-size: 13px;
  margin-right: 15px;
}

.article-info .user span:first-child {
  color: #000;
  font-size: 20px;
}

.article-info .handle {
  padding-left: 5px;
  display: flex;
  color: #757575;
}

.article-info .handle p {
  margin-right: 15px;
  display: flex;
  align-items: center;
}

.article-info .handle p.active {
  color: #fb7299;
}

.article-info .handle p .iconfont {
  font-size: 24px;
}

.recommend {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 5px;
}
</style>