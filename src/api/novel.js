/**
  * 模块接口列表
  */

 import axios from '@utils/axios'; // 导入创建的axios实例
 
 const novel = {

     getData (params) {
         return axios.get(`/api/***`, {
           params: params
         });
     },
     // 其他接口…………
 }
 
 export default novel;
 