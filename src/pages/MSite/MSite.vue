<template>
  <div>
    <section class="msite">
      <!--首页头部-->
      <TopHeader :title="address.name">
        <router-link class="header_search" slot="left" to="/search">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
        <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo':'/login'">
          <span class="header_login_text" v-if="!userInfo._id">
            登录|注册
          </span>
          <span class="header_login_text" v-else>
            <i class="iconfont icon-person"></i>
          </span>

        </router-link>
      </TopHeader>


      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container" v-if="categorys.length">

          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(categorys,index) in categorysArr ":key="index">
              <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys ":key="index">
                <div class="food_container">
                  <img :src="baseImageUrl+category.image_url">
                </div>
                <span>{{category.title}}</span>
              </a>

            </div>

          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <img src="./images/msite_back.svg" alt="back" v-else>
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i><span class="shop_header_title">附近商家</span>
        </div>
         <ShopList/>
      </div>
    </section>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import ShopList from '../../components/ShopList/ShopList'
  import TopHeader from '../../components/TopHeader/TopHeader'
  import {mapState} from 'vuex'



  export default {
    data(){
      return {
        baseImageUrl:'https://fuss10.elemecdn.com'
      }
    },
    mounted() {

      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')


    },
    components:{
      TopHeader,
      ShopList
    },
    computed:{
      ...mapState(['address','categorys','userInfo']),
      //根据获取得到的categorys生成categorysArr二维数组，
      categorysArr () {
        const {categorys} = this
        // 准备空的2维数组
        const arr = []
        // 准备一个小数组(最大长度为8)
        let minArr = []
        // 遍历categorys
        categorys.forEach(c => {
          // 如果当前小数组已经满了, 创建一个新的
          if(minArr.length===8) {
            minArr = []
          }
          // 如果minArr是空的, 将小数组保存到大数组中
          if(minArr.length===0) {
            arr.push(minArr)
          }
          // 将当前分类保存到小数组中
          minArr.push(c)
        })

        return arr
      }
  },
    watch:{
      categorys(value){ //categorys中有数据了,在异步更新界面之前执行
       //  //使用settTimeout可以实现，但是不够好
        //  setTimeout(()=>{
        //
        // },100)
        //希望界面更新立即创建swiper对象
        this.$nextTick(()=>{ //nexttick的作用一旦完成界面更新立即调用（要在数据更新后调用此方法）
          //创建一个swiper实例对象
          new Swiper('.swiper-container',{
            loop:true, //允许循环轮播
            //如果需要分页器
            pagination:{
              el:'.swiper-pagination',
            }
          })
        })
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
   @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
