<template>
  <div class="user-content">
    <div class="user-show">
      <div class="user-img">
        <img :src="model.user_img" alt="" v-if="model.user_img">
        <img src="../../assets/default_img.jpg" alt v-else />
      </div>
      <div class="user-edit">
        <div class="edit-top">
          <p>
            <span>0</span>
            <span>粉丝</span>
          </p>
          <p>
            <span>54</span>
            <span>关注</span>
          </p>
          <p>
            <span>102</span>
            <span>获赞</span>
          </p>
        </div>
        <div>
            <div class="edit-btn" @click="$router.push('/edit')">编辑资料</div>
        </div>
      </div>
    </div>
    <div class="user-descri">
      <h2>{{model.name}}</h2>
      <p v-if="model.user_desc">{{model.user_desc}}</p>
      <p v-else>这个人很懒，什么也没写</p>
      <span>动态</span>
      <span>视频</span>
    </div>
  </div>
</template>

<script>
export default {
    props: ['model']
};
</script>

<style scoped>
.user-content {
  padding: 1.389vw 4.167vw;
  background: #fff;
}

.user-show {
  display: flex;
}

.user-img img {
  width: 24.444vw;
  height: 24.444vw;
  border-radius: 50%;
}

.user-edit {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.user-show .user-edit .edit-top {
  display: flex;
}

.edit-top p {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 3.611vw;
  color: #ccc;
}

.edit-top p:nth-child(1),
.edit-top p:nth-child(2) {
    border-right: 0.278vw solid #ccc;
}

.edit-top p span:first-child {
  color: #000;
}

.user-edit div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
}

.edit-btn {
    border: 0.278vw solid #fb7299;
    border-radius: 1.389vw;
    color: #fb7299;
    width: 55.556vw;
    height: 9.722vw;
    line-height: 9.722vw;
    font-size: 4.444vw;
}

.user-descri {
    color: #ccc;
    font-size: 4.444vw;
}

.user-descri h2 {
    color: #000;
    font-size: 6.667vw;
}

.user-descri p {
    color: #ccc;
    position: relative;  
}

.user-descri p::after {
    display: block;
    content: '';
    width: 124%;
    height: 0.278vw;
    background: #ccc;
    position: absolute;
    left: -20%;
    bottom: -2.778vw;
}

.user-descri span {
    display: inline-block;
    color: #777;
    margin-right: 4.167vw;
    padding: 2.778vw 0;
}
</style>