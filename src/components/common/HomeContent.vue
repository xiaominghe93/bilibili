<template>
  <div class="home-content" @click="pathPush">
    <div class="imgparent">
      <img :src="item2.img" alt />
      <div class="bottom">
        <span class="video">7</span>
        <span class="comment">{{item2.commentlen}}</span>
      </div>
    </div>
    <p class="title">{{item2.name}}</p>
  </div>
</template>

<script>
export default {
  props: ["item2"],
  methods: {
    pathPush() {
      if(this.$route.path != `/article/${this.item2.id}` )
      this.$router.push(`/article/${this.item2.id}`)
    }
  }
};
</script>

<style scoped>
.home-content {
  margin-bottom: 20px;
}

.imgparent {
  position: relative;
}

.imgparent img {
  width: 100%;
  height: 27.778vw;
}

.imgparent .bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5%;
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 0 10px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
}

.imgparent .video {
}

.imgparent .comment {
}

.title {
  font-size: 12px;
}
</style>