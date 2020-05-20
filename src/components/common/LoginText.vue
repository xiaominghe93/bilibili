<template>
  <div>
    <van-field
      v-model="content"
      :label="label"
      :type="type"
      :placeholder="placeholder"
      :rule="rule"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  props: ["label", "type", "placeholder", "rule"],
  methods: {
    handleRule() {
      const rule = new RegExp(this.rule);
      if (rule.test(this.content)) {
        this.$emit('contentChange', this.content)  
        this.$notify({ type: "success", message: "输入格式正确" });
      } else {
        this.$notify({ type: "danger", message: "请输入6到9个字符" });
      }
    }
  },
  watch: {
    content() {
      this.handleRule();
    }
  }
};
</script>

<style scoped>
</style>