<template>
  <div class="home"  v-if="category">
    <Navbar></Navbar>
    <div class="fix-nav">
      <van-tabs v-model="active">
        <span class="set-category iconfont icon-shezhi" @click="setCategory"></span>
        <van-tab
          v-for="(item1, index) in category"
          :title="item1.title"
          :key="index"
          swipeable
          title-style="margin-right: 1.389vw;"
        >
          <van-list
            v-model="item1.loading"
            :finished="item1.finished"
            :immediate-check="false"
            finished-text="我是有底线的"
            @load="onLoad"
          >
            <div class="home-content">
              <HomeContent
                style="width: 45%;"
                v-for="(item2, index) in item1.list"
                :key="index"
                :item2="item2"
              ></HomeContent>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/common/Navbar";
import HomeContent from "../components/common/HomeContent";
export default {
  data() {
    return {
      active: 0,
      category: [],
      page: 0,
      pagesize: 10
    };
  },
  activated() {
    if (localStorage.getItem("newCategory")) {
      this.category = this.changeCategory(
        JSON.parse(localStorage.getItem("newCategory"))
      );
      this.getArticle();
    }
  },
  methods: {
    //获取去栏目
    async getCategory() {
      if (localStorage.getItem("newCategory")) {
        return;
      }
      const res = await this.$http.get("/category");
      this.category = this.changeCategory(res.data);
      console.log(res);
      this.getArticle();
    },
    //改造栏目数据
    changeCategory(data) {
      data.map((item, index) => {
        item.list = [];
        item.page = this.page;
        item.pagesize = this.pagesize;
        item.loading = false;
        item.finshed = false;
      });
      return data;
    },
    //获取该栏目所有文章
    async getArticle() {
      const categoryItem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryItem._id, {
        params: {
          page: categoryItem.page,
          pagesize: categoryItem.pagesize
        }
      });
      categoryItem.list.push(...res.data);
      categoryItem.loading = false;
      if (res.data.length < categoryItem.pagesize) {
        categoryItem.finshed = true;
      }
    },
    //获取对应索引下的栏目
    categoryItem() {
      const categoryItem = this.category[this.active];
      return categoryItem;
    },
    //滑倒底部加载
    onLoad() {
      const categoryItem = this.categoryItem();
      categoryItem.page++;
      setTimeout(() => {
        this.getArticle();
      }, 1000);
    },
    //自定义导航栏目
    setCategory() {
      this.$router.push("/setCategory");
    }
  },
  watch: {
    active() {
      const categoryitem = this.categoryItem();
      if (!categoryitem.list.length) {
        this.getArticle();
      }
    }
  },
  created() {
    this.getCategory();
  },
  components: {
    Navbar,
    HomeContent
  }
};
</script>

<style scoped>
.home {
  background: #fff;
}

.fix-nav {
  position: relative;
}

.set-category {
  position: absolute;
  right: 4.167vw;
  top: 3.889vw;
  font-weight: bolder;
}

.home-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 1.389vw;
}
</style>