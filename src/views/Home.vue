<template>
  <div id="home">
    <!-- 搜索框 -->
    <van-search v-model="value" placeholder="请输入搜索关键词" />

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" width="100%">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <!-- 这里使用了图片组件 免得写css 控制图片的宽高 封装了fit属性 -->
        <van-image fit="cover" lazy-load :src="image.image_url" />
      </van-swipe-item>
    </van-swipe>

    <!-- 4个图标 -->
    <van-grid :column-num="4">
      <van-grid-item
        v-for="(item, index) in brandList"
        :icon="item.pic_url"
        :key="index"
        :text="item.name"
      />
    </van-grid>

    <!-- 品牌制造商直供 -->
    <van-cell-group>
      <van-cell class="home-cell-center" title="品牌制造商直供" />
    </van-cell-group>
    <div class="brand-list">
      <van-grid :column-num="2">
        <van-grid-item v-for="(item, index) in brandList" :key="index">
          <van-image
            width="100%"
            height="auto"
            fit="cover"
            lazy-load
            :src="item.new_pic_url"
          />
          <h4 class="title">{{ item.name }}</h4>
          <p class="price">{{ item.floor_price }}元起</p>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 新品首发 -->
    <van-cell class="home-cell-center" title="品牌制造商直供" />
    <div class="new-list">
      <van-grid :column-num="2">
        <van-grid-item v-for="(item, index) in newGoodsList" :key="index">
          <van-image
            width="100%"
            height="auto"
            fit="cover"
            lazy-load
            :src="item.list_pic_url"
          />
          <h4 class="van-ellipsis title">{{ item.name }}</h4>
          <p class="price">{{ item.retail_price }}元起</p>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 人气面板 -->
    <div class="hotlist">
      <van-cell class="home-cell-center" title="人气推荐" />
      <van-card
        v-for="(item,index) in hotGoodsList"
        :key="index"
        :price="item.retail_price"
        :desc="item.goods_brief"
        :title="item.name"
        :thumb="item.list_pic_url"
      />
    </div>
  </div>
</template>

<script>
// 工具函数
import { request } from "network/index.js";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      value: "",
      data: {},
      images: [],
      brandList: [],
      newGoodsList: [],
      hotGoodsList: [],
    };
  },
  // async 异步
  async mounted() {
    // 发送请求获取数据
    request({
      url: "/index",
    }).then((res) => {
      console.log(res);
      if (res.data) {
        this.data = res.data;
        this.images = this.data.banner;
        this.brandList = this.data.brandList;
        this.newGoodsList = this.data.newGoodsList;
        this.hotGoodsList = this.data.hotGoodsList;
      }
    });
  },
  computed: {},
};
</script>

<style lang="less">
#home {
  .van-grid-item {
    overflow: hidden;
  }
  .home-cell-center {
    text-align: center;
  }

  .brand-list {
    .van-grid-item__content {
      padding: 0;
      .van-image {
        border: 1px solid #fff;
      }
    }
    .title {
      position: absolute;
      top: 0px;
      left: 5px;
    }
    .price {
      position: absolute;
      top: 25px;
      left: 5px;
    }
  }
  .new-list {
    .van-grid-item__content {
      padding: 0;
      .van-image {
        border: 1px solid #fff;
      }
    }
    .title,
    .price {
      font-size: 14px;
      text-align: center;
      width: 90%;
      padding: 0;
      margin: 0;
    }
  }
  .hotlist{
    .van-card__price{
      color: red;
    }
  }
  .van-card{
    .van-card__content{
      justify-content: space-evenly;
    }
  }
}
</style>
