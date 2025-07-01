<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-header">
        <h1>欢迎使用</h1>
        <p>请登录您的账户</p>
      </div>

      <tiny-card class="login-card">
        <tiny-form
          :model="form"
          :rules="rules"
          ref="formRef"
          label-width="80px"
          @submit.prevent="handleLogin"
        >
          <tiny-form-item label="用户名" prop="username">
            <tiny-input
              v-model="form.username"
              placeholder="请输入用户名"
              size="large"
              :prefix-icon="UserIcon"
            />
          </tiny-form-item>

          <tiny-form-item label="密码" prop="password">
            <tiny-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              :prefix-icon="LockIcon"
              show-password
            />
          </tiny-form-item>

          <div class="login-tips">
            <p>测试账号：admin / 123456</p>
          </div>

          <tiny-button
            type="primary"
            native-type="submit"
            :loading="loading"
            size="large"
            style="width: 100%; margin-top: 16px"
          >
            登录
          </tiny-button>
        </tiny-form>

        <div v-if="error" class="error-message">
          <tiny-alert type="error" :closable="false">
            {{ error }}
          </tiny-alert>
        </div>
      </tiny-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { TinyForm, TinyFormItem, TinyInput, TinyButton, TinyCard, TinyAlert } from '@opentiny/vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  username: '',
  password: '',
})
const loading = ref(false)
const error = ref('')
const formRef = ref()

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

// 图标
const UserIcon = 'User'
const LockIcon = 'Lock'

const handleLogin = async () => {
  error.value = ''
  if (!formRef.value) return

  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    loading.value = true
    try {
      const result = await authStore.login(form.value.username, form.value.password)

      if (result.success) {
        // 登录成功，跳转到仪表盘
        router.push('/')
      } else {
        error.value = result.message
      }
    } catch (e) {
      error.value = (e as Error)?.message || '登录失败，请稍后重试'
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-content {
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
  color: white;
}

.login-header h1 {
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 600;
}

.login-header p {
  margin: 0;
  font-size: 16px;
  opacity: 0.9;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 32px;
}

.login-tips {
  margin: 16px 0;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #007bff;
}

.login-tips p {
  margin: 0;
  font-size: 14px;
  color: #6c757d;
}

.error-message {
  margin-top: 16px;
}

@media (max-width: 480px) {
  .login-container {
    padding: 16px;
  }

  .login-card {
    padding: 24px;
  }

  .login-header h1 {
    font-size: 28px;
  }
}
</style>
