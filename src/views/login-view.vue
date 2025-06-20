<template>
  <div class="login-container">
    <tiny-card title="登录" class="login-card">
      <tiny-form
        :model="form"
        :rules="rules"
        ref="formRef"
        label-width="80px"
        @submit.prevent="handleLogin"
      >
        <tiny-form-item label="用户名" prop="username">
          <tiny-input v-model="form.username" placeholder="请输入用户名" />
        </tiny-form-item>

        <tiny-form-item label="密码" prop="password">
          <tiny-input v-model="form.password" type="password" placeholder="请输入密码" />
        </tiny-form-item>

        <tiny-button type="primary" native-type="submit" :loading="loading" style="width: 100%"
          >登录</tiny-button
        >
      </tiny-form>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="token" class="success">登录成功，Token: {{ token }}</div>
    </tiny-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { testLogin } from '@/api/login'
import { TinyForm, TinyFormItem, TinyInput, TinyButton, TinyCard } from '@opentiny/vue'

const form = ref({
  username: '',
  password: '',
})
const loading = ref(false)
const error = ref('')
const token = ref('')
const formRef = ref()

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const handleLogin = async () => {
  error.value = ''
  token.value = ''
  if (!formRef.value) return
  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    loading.value = true
    try {
      const res = await testLogin(form.value)
      token.value = res.token
    } catch (e) {
      error.value = (e as Error)?.message || '登录失败'
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
  background: var(--color-bg);
}
.login-card {
  width: 360px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  padding: 32px 24px 16px 24px;
  background: #fff;
}
.error {
  color: #e74c3c;
  margin-top: 12px;
  text-align: center;
}
.success {
  color: #2ecc71;
  margin-top: 12px;
  text-align: center;
}
</style>
