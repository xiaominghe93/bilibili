<template>
  <div>
    <div
      style="border-bottom: 1px solid #eee; padding-bottom: 10px;"
      class="first-comment"
      v-for="(item , index) in  commentList"
      :key="index"
    >
      <div>
        <div class="userinfo" v-if="item.userinfo">
          <img :src="item.userinfo.user_img" v-if="item.userinfo" alt />
          <img src="@/assets/default_img.jpg" v-else alt />
        </div>
        <div class="comment-text">
          <p>
            <span>{{item.userinfo.name}}</span>
            <span>{{item.comment_date}}</span>
          </p>
          <div style="position:relative;">
            {{item.comment_content}}
            <span style="color: red;position: absolute;right: 0;" @click="pushiComment(item.comment_id)">回复</span>
          </div>
        </div>
      </div>
      <div style="padding-left: 20px;">
        <CommentItem :commentChild="item.child" />
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from "./CommentItem";
export default {
  data() {
    return {
      commentList: null
    };
  },
  methods: {
    //获得文章的评论数据
    async getComment() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      if (res.data) {
        this.$emit("commentListLen", res.data.length);
        this.commentList = this.changeComment(res.data);
      }
    },
    //改造评论数据的格式，变成层级的样式
    changeComment(data) {
      function fn(temp) {
        let arr1 = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr1.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return arr1;
      }
      return fn(null);
    },
    //点击回复评论
    pushiComment(id) {
        this.$emit('pushiComment', id)        
    }
  },
  created() {
    this.getComment();
  },
  components: {
    CommentItem
  }
};
</script>

<style scoped>
.first-comment div:first-child {
  display: flex;
  margin: 20px 0 0;
}

.first-comment .userinfo {
  display: flex;
}

.first-comment img {
  width: 40px;
  height: 40px;
}

.comment-text {
  flex: 1;
  padding: 0 10px;
}

.comment-text p {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 13px;
}
</style>