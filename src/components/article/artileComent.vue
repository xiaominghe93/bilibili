<template>
  <div class="article-comment">
    <div class="coment-title">
      <p class="coment-head">
        <span>评论</span>
        <span>({{length}})</span>
      </p>
      <div class="coment-user">
        <img :src="user.user_img" alt v-if="user" />
        <img src="@/assets/default_img.jpg" alt v-else />
        <input type="text" ref="commentInput" v-model="postComment.comment_content" placeholder="说点什么" />
        <button @click="publishComment">发表</button>
      </div>
    </div>

    <!-- 评论区 -->
    <Comment @commentListLen="len => length = len" ref="commentPub" @pushiComment="focusInput" />
  </div>
</template>

<script>
import Comment from "./Comment";
export default {
  data() {
    return {
      user: null,
      length: null,
      postComment: {
        comment_content: null,
        comment_date: null,
        article_id: null,
        parent_id: null
      }
    };
  },
  methods: {
    async getUser() {
      if (
        !this.user &&
        !localStorage.getItem("token") &&
        !localStorage.getItem("id")
      ) {
        const res = await this.$http.get("/user/" + localStorage.getItem("id"));
        this.user = res.data[0];
      }
    },
    //发表评论
    async publishComment() {
      if (
        localStorage.getItem("id") &&
        localStorage.getItem("token") &&
        this.postComment.comment_content
      ) {
        this.postComment.comment_date = this.getPublisTime();
        this.postComment.article_id = this.$route.params.id;
        const res = await this.$http.post(
          "/comment_post/" + localStorage.getItem("id"),
          this.postComment
        );
        this.$msg.success("发表评论成功");
        this.postComment.comment_content = null
        //这样可以使用子组建的方法
        this.$refs.commentPub.getComment()
        console.log(res);
      } else {
        this.$msg.fail("请先登录");
      }
    },
    //获得发表评论的时间
    getPublisTime() {
      let now = new Date();
      let result = {};
      result.day = now.getDate() > 10 ? now.getDate() : "0" + now.getDate();
      result.month =
        now.getMonth() > 10 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1);
      let time = result.month + "-" + result.day;
      return time;
    },
    //回复二级评论
    focusInput(res) {
      console.log(this.$refs.commentInput);
      this.$refs.commentInput.focus()
      this.postComment.parent_id = res
    }
  },
  components: {
    Comment
  },
  created() {
    this.getUser();
  }
};
</script>

<style scoped>
.article-comment {
  padding: 0 15px;
}

.coment-head span {
  color: #000;
  margin-right: 16px;
}

.coment-head span:last-child {
  color: #666;
}
.coment-user {
  display: flex;
  padding: 5px 0;
}

.coment-user img {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}

.coment-user input {
  outline: none;
  border: none;
  background: rgb(214, 212, 212);
  border-radius: 10px;
  height: 30px;
  color: #666;
  padding: 0 15px 0 20px;
  margin-right: 15px;
  font-size: 13px;
}

.coment-user button {
  flex: 1;
  padding: 5px 15px;
  outline: none;
  border: none;
  border-radius: 15px;
  background: #fb7299;
  color: #fff;
}
</style>