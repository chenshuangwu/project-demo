/**
  * 模块接口列表
  */

 import axios from '@/utils/axios'; // 导入创建的axios实例
 
 const user = {

     getUserInfo (params) {
         return axios.get(`/api/***`, {
           params: params
         });
     },
     // 其他接口…………
 }
 
 export default user;
 