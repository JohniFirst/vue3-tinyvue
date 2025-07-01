import http from '@/utils/http'

// 定义 login 接口的返回值类型
export interface LoginResponse {
  token: string
  user: {
    id: number
    username: string
    // 其他字段可根据实际接口补充
  }
  // 其他字段可根据实际接口补充
}

// 测试登录请求
export function testLogin(data: { username: string; password: string }): Promise<LoginResponse> {
  // http 响应已被拦截器处理为 response.data，这里直接返回 Promise<LoginResponse>
  return http.post('/api/login', data)
}
