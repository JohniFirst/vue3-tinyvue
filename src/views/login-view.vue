<template>
  <div class="login-page page-component">
    <div class="login-container">
      <section class="login-card animated-card">
        <div class="login-header">
          <div class="logo-container">
            <img src="@/assets/svg/logo.svg" alt="Logo" class="logo-animation" />
          </div>
          <h1 class="title-animation">欢迎回来</h1>
          <p class="subtitle-animation">请登录您的账户</p>

          <tiny-form class="login-form-wp" ref="loginFormRef" :rules="rules" :model="createData">
            <tiny-form-item label="用户名" prop="username">
              <tiny-input v-model="createData.username" />
            </tiny-form-item>
            <tiny-form-item label="密码" prop="password">
              <tiny-input v-model="createData.password" type="password" show-password />
            </tiny-form-item>

            <tiny-form-item>
              <tiny-button type="primary" size="large" @click="handleSubmit">登 录</tiny-button>
            </tiny-form-item>
          </tiny-form>
        </div>
      </section>
    </div>

    <!-- 背景装饰 -->
    <section class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import { TinyForm } from '@opentiny/vue'

const loginFormRef = useTemplateRef<typeof TinyForm>('loginFormRef')
const router = useRouter()

const createData = reactive({
  username: 'admin',
  password: '123456',
})

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
}

const handleSubmit = () => {
  loginFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      try {
        // const res = await loginApi()

        router.push('/')
      } catch (error) {
        throw new Error(error as string)
      }
    }
  })
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

.login-form-wp {
  margin-top: 20px;
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
