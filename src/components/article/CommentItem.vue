<template>
  <div class="comment-parent">
    <div class="comment-item" v-for="(item , index) in  commentChild" :key="index">
      <div>
        <div class="userinfo" v-if="item.userinfo">
          <img :src="item.userinfo.user_img" v-if="item.userinfo" alt />
          <img src="@/assets/default_img.jpg" v-else alt />
        </div>
        <div class="comment-text">
          <p>
            <span>{{item.userinfo.name}}</span>
            <span>{{item.comment_date}} </span>
          </p>
          <div>回复<span style="color: #708EF1;padding: 0 10px;">{{item.parent_user_info.name}}</span> {{item.comment_content}}</div>
        </div>
      </div>
      <commentchild-item :commentChild="item.child" :temp="true"></commentchild-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentchildItem",
  props: ["commentChild", "temp"]
};
</script>

<style scoped>
.comment-parent {
  display: flex;
  flex-direction: column;
}

.comment-item {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.comment-item div:first-child {
  display: flex;
}

.comment-item img {
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