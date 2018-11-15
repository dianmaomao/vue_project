//通过mutations间接更新state的多个方法对象
import  {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERInfo,
  RESET_USERInfo,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
  ClEAR_CART

} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopRatings,
  reqShopGoods,
  reqShopInfo,
} from '../api'

export default {
  //异步获取地址
  async getAddress ({commit, state}) {
    //发送ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) { //提交一个mutation
      const address = result.data
      commit(RECEIVE_ADDRESS,{address})
    }

  },
  //异步获取食品
  async getCategorys ({commit}) {
    //发送ajax请求
    const result = await reqFoodCategorys()
    if (result.code === 0) { //提交一个mutation
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  //异步获取商家
  async getShops ({commit, state}) {
    //发送ajax请求
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    if (result.code === 0) { //提交一个mutation
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  //同步记录用户信息
  recorduserInfo({commit},userInfo){
    commit(RECEIVE_USERInfo, {userInfo})
  },
  //异步获取用户信息
  async getUserInfo ({commit}){
    const result=await  reqUserInfo()
    if(result.code===0){
      const userInfo=result.data
      commit(RECEIVE_USERInfo,{userInfo})
    }
  },
  //异步登出
  async logout({commit}){
    const result=await  reqLogout()
    if(result.code===0){
      commit(RESET_USERInfo)
    }
  },
  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit},callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      //数据更新了 通知组件
      callback&&callback()

    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit},callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      //数据更新了 通知组件
      callback&&callback()
    }
  },
//同步更新food中的count数量
  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){
      commit (INCREMENT_FOOD_COUNT,{food})
    }else{
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },
  //同步清空购物车
  clearCart({commit}){
    commit(ClEAR_CART)
  }

}
