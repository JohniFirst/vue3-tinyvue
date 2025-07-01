<template>
  <div class="login-page page-component">
    <div class="login-container">
      <div class="login-card animated-card">
        <div class="login-header">
          <div class="logo-container">
            <img src="@/assets/svg/logo.svg" alt="Logo" class="logo-animation" />
          </div>
          <h1 class="title-animation">欢迎回来</h1>
          <p class="subtitle-animation">请登录您的账户</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form animated-form">
          <div class="form-group">
            <label for="username">用户名</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              placeholder="请输入用户名"
              class="form-input animated-input"
            />
          </div>

          <div class="form-group">
            <label for="password">密码</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              placeholder="请输入密码"
              class="form-input animated-input"
            />
          </div>

          <div class="form-options">
            <label class="checkbox-container">
              <input type="checkbox" v-model="form.remember" />
              <span class="checkmark"></span>
              记住我
            </label>
            <a href="#" class="forgot-link">忘记密码？</a>
          </div>

          <button type="submit" :disabled="loading" class="login-button animated-button">
            <span v-if="loading" class="loading-spinner"></span>
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </form>

        <div class="login-footer">
          <p>还没有账号？ <a href="#" class="register-link">立即注册</a></p>
        </div>
      </div>
    </div>

    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Modal } from '@opentiny/vue'

defineOptions({ name: 'LoginView' })

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const form = reactive({
  username: '',
  password: '',
  remember: false,
})

const handleLogin = async () => {
  if (!form.username || !form.password) {
    Modal.alert('请输入用户名和密码')
    return
  }

  loading.value = true

  try {
    await authStore.login(form.username, form.password)
    router.push('/')
  } catch {
    Modal.confirm('登录失败，请检查用户名和密码')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  z-index: 10;
  position: relative;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.animated-card {
  animation: cardFloat 0.8s ease-out;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo-container {
  margin-bottom: 20px;
}

.logo-animation {
  width: 60px;
  height: 60px;
  animation: logoSpin 2s ease-in-out infinite;
}

.title-animation {
  margin: 0 0 8px 0;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  animation: titleSlideIn 0.8s ease-out 0.2s both;
}

.subtitle-animation {
  margin: 0;
  color: var(--color-text-light);
  font-size: 1rem;
  animation: subtitleFadeIn 0.8s ease-out 0.4s both;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.animated-form {
  animation: formSlideIn 0.8s ease-out 0.3s both;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.9rem;
}

.form-input {
  padding: 12px 16px;
  border: 2px solid var(--color-border-light);
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
}

.animated-input {
  animation: inputSlideIn 0.6s ease-out both;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(44, 62, 80, 0.1);
  transform: translateY(-2px);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: var(--color-text-light);
}

.checkbox-container input[type='checkbox'] {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-border);
  border-radius: 4px;
  position: relative;
  transition: all 0.3s;
}

.checkbox-container input[type='checkbox']:checked + .checkmark {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.checkbox-container input[type='checkbox']:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.forgot-link {
  color: var(--color-primary);
  text-decoration: none;
  transition: all 0.3s;
}

.forgot-link:hover {
  text-decoration: underline;
  transform: translateX(2px);
}

.login-button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.animated-button {
  animation: buttonSlideIn 0.8s ease-out 0.5s both;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(44, 62, 80, 0.3);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.login-button:hover::before {
  left: 100%;
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

.login-footer {
  text-align: center;
  margin-top: 24px;
  color: var(--color-text-light);
  font-size: 0.9rem;
}

.register-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.register-link:hover {
  text-decoration: underline;
}

/* 背景装饰 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 20%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  bottom: 10%;
  right: 10%;
  animation-delay: 1s;
}

/* 动画定义 */
@keyframes cardFloat {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes logoSpin {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

@keyframes titleSlideIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes subtitleFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes formSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes inputSlideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes buttonSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 10px;
  }

  .login-card {
    padding: 30px 20px;
  }

  .title-animation {
    font-size: 1.8rem;
  }
}
</style>
