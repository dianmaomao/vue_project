//直接更新state的多个方法
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS, RECEIVE_GOODS, RECEIVE_INFO, RECEIVE_RATINGS,
  RECEIVE_SHOPS,
  RECEIVE_USERInfo,
  RESET_USERInfo,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
  ClEAR_CART

} from './mutation-types'
import Vue from 'vue'


export default {
  [RECEIVE_ADDRESS] (state,{address}){
    state.address=address
  },
  [RECEIVE_CATEGORYS] (state,{categorys}){
    state.categorys=categorys
  },
  [RECEIVE_SHOPS] (state,{shops}){
    state.shops=shops
  },
  [RECEIVE_USERInfo] (state,{userInfo}){
    state.userInfo=userInfo
  },
  [RESET_USERInfo] (state){
    state.userInfo={}
  },
  [RECEIVE_GOODS] (state,{goods}){
    state.goods=goods
  },
  [RECEIVE_RATINGS] (state,{ratings}){
    state.ratings=ratings
  },
  [RECEIVE_INFO] (state,{info}){
    state.info=info
  },
  [INCREMENT_FOOD_COUNT] (state,{food}){
    if(!food.count){
      // food.count=1 新增一个属性（无数据绑定效果）
     Vue.set(food,'count',1)
      //将food添加到cartfood中
      state.cartFoods.push(food)
    }else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state,{food}){
     if(food.count){
       food.count--
       if(food.count===0){
         //将food从cartfoods中移除
         state.cartFoods.splice(state.cartFoods.indexOf(food),1)
       }
     }
  },
  [ClEAR_CART](state){
    //清除food中的count
    state.cartFoods.forEach(food=>food.count=0)
    //移除购物车中的食品
    state.cartFoods=[]
  }
}
