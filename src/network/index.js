import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: "http://120.53.120.229:8360",
    timeout: 15000
  })

  // 2.axios的拦截器

  // 2.1 请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log(config)
    return config
  }, err => {
    console.log(err);
  });

  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求 axios本身返回Promise
  return instance(config)
}
