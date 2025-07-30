<template>
  <BaseFormList v-model:form="form" />

  <pre>{{ JSON.stringify(form, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { reactive, type Reactive } from 'vue'
import BaseFormList from './components/base-form-list.vue'

export type FormData = {
  name: string
  age: number
}

const form = reactive({}) as Reactive<FormData>
</script>
