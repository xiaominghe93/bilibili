<template>
  <div>
    <Navbar />
    <van-divider
      dashed
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >现有栏目</van-divider>

    <!-- 现有栏目渲染 -->
    <div class="catrgory now-catrgory">
      <p
        v-for="(item , index) in nowCategory"
        :key="index"
        @click="delClick(index)"
        ref="categoryItem"
      >{{item.title}}</p>
    </div>

    <van-divider
      dashed
      :style="{ color: '#EE0A24', borderColor: '#EE0A24', padding: '0 16px' }"
    >已删除栏目</van-divider>

    <!-- 已删除栏目渲染 -->
    <div class="catrgory del-catrgory">
      <p v-for="(item , index) in delCategory" :key="index" @click="addClick(index)">{{item.title}}</p>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/common/Navbar";
export default {
  data() {
    return {
      nowCategory: [],
      delCategory: []
    };
  },
  methods: {
    //获取现有栏目
    async getNowCtegory() {
      if (localStorage.getItem("newCategory")) {
        this.nowCategory = JSON.parse(localStorage.getItem("newCategory"));
        return;
      }
      const res = await this.$http.get("/category");
      if (res.data) {
        this.nowCategory = res.data;
      }
    },
    //获取已删除栏目
    getCancleCategory() {
      if (localStorage.getItem("cancleCategory")) {
        this.delCategory = JSON.parse(localStorage.getItem("cancleCategory"));
      }
    },
    //点击删除现有栏目，并将剩余的保存的localstorage
    delClick(index) {
      if(this.nowCategory.length < 4) {
        this.$msg.fail('栏目数最少要有三个')
        return
      }
      this.delCategory.push(this.nowCategory[index]);
      this.nowCategory.splice(index, 1);
      let newCategory = JSON.stringify(this.nowCategory);
      let cancleCategory = JSON.stringify(this.delCategory);
      localStorage.setItem("newCategory", newCategory);
      localStorage.setItem("cancleCategory", cancleCategory);
    },
    //点击将删除的栏目保存到先有栏目，并将剩余已删除保存到localStorage
    addClick(index) {
      this.nowCategory.unshift(this.delCategory[index]);
      this.delCategory.splice(index, 1);
      let newCategory = JSON.stringify(this.nowCategory);
      let cancleCategory = JSON.stringify(this.delCategory);
      localStorage.setItem("newCategory", newCategory);
      localStorage.setItem("cancleCategory", cancleCategory);
    }
  },
  created() {
    this.getNowCtegory();
    this.getCancleCategory();
  },
  components: {
    Navbar
  }
};
</script>

<style scoped>
.catrgory {
  display: flex;
  padding: 16px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.catrgory p {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid blue;
}

.del-catrgory p {
  border: 1px solid #ee0a24;
}
</style>