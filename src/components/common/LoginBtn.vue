<template>
  <div>
    <div class="loginBtnParents">
      <van-button type="primary" @click="registerClick">{{btnText}}</van-button>
    </div>
  </div>
</template>

<script>
export default {
    props: ["btnText"],
    methods: {
        registerClick() {
            this.$emit('registerSubmit')
        }
    }
};
</script>

<style scoped>
.loginBtnParents {
    padding: 12vw 10vw;
}

button {
  width: 80vw;
  height: 12.5vw;
  background: #fb7299;
  border-radius: 2vw;
  border: none;
  outline: none;
}
</style>