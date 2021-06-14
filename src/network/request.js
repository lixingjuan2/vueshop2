import axios from 'axios'

export function request(config) {

  // 1. 创建 axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  // 2.1 axios 的拦截器 来检查配置
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  });
  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    // 记得要返回数据
    return res.data
  }, err => {
    console.log(err);
  })
  // 发送真正的网络请求 默认返回promise
  return instance(config)
}

