<template>
  <div class="edit-text" @click="editClick">
      <span>{{left}}</span>
      <span><slot name="right"></slot></span>
  </div>
</template>

<script>
export default {
    props: ['left'],
    methods: {
        editClick() {
            this.$emit('editClick')
        }
    }

}
</script>

<style scoped>
.edit-text {
    background: #fff;
    padding: 4.167vw 4.167vw;
    border-bottom: 0.278vw solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>