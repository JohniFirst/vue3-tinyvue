<template>
  <section>
    <label for="name">姓名：</label>
    <input type="text" id="name" v-model="form!.name" />
  </section>

  <section>
    <label for="name">年龄：</label>
    <input type="text" id="age" v-model="form!.age" />
  </section>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { FormData } from '../seperate-form.vue'

// const form = defineModel<FormData>('form')

defineProps({
  form: {
    type: Object as PropType<FormData>,
    required: true,
    default: () => {},
  },
})
</script>
