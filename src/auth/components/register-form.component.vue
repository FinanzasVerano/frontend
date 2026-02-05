<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])
const username = ref('')
const email = ref('')
const password = ref('')

function onSubmit() {
  emit('submit', {
    username: username.value.trim(),
    email: email.value.trim(),
    password: password.value,
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit" style="display: grid; gap: 12px; max-width: 360px;">
    <h2>Crear cuenta</h2>

    <label>
      Username
      <input v-model="username" type="text" minlength="3" required />
    </label>

    <label>
      Email
      <input v-model="email" type="email" required />
    </label>

    <label>
      Contraseña
      <input v-model="password" type="password" minlength="6" required />
    </label>

    <button type="submit">Registrarme</button>
  </form>
</template>
