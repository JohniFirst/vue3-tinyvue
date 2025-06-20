import axios from 'axios';

// 创建 axios 实例
const http = axios.create({
  baseURL: '/', // 可以根据需要修改
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
http.interceptors.request.use(
  config => {
    // 可以在这里添加 token 或其他自定义内容
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // 可以统一处理错误
    return Promise.reject(error);
  }
);

export default http;
