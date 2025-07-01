import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export interface User {
  id: string
  username: string
  avatar?: string
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  // 状态
  const token = ref<string>('')
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // 模拟登录API
  const login = async (
    username: string,
    password: string,
  ): Promise<{ success: boolean; message: string }> => {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 简单的模拟验证逻辑
    if (username === 'admin' && password === '123456') {
      const mockToken = 'mock-jwt-token-' + Date.now()
      const mockUser: User = {
        id: '1',
        username: username,
        avatar: 'https://via.placeholder.com/40',
      }

      token.value = mockToken
      user.value = mockUser

      // 保存到localStorage
      localStorage.setItem('token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))

      return { success: true, message: '登录成功' }
    } else {
      return { success: false, message: '用户名或密码错误' }
    }
  }

  // 登出
  const logout = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  // 初始化认证状态
  const initAuth = () => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (savedToken && savedUser) {
      try {
        token.value = savedToken
        user.value = JSON.parse(savedUser)
      } catch (error) {
        console.error('Failed to parse saved user data:', error)
        logout()
      }
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    initAuth,
  }
})
