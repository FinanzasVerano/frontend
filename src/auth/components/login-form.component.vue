<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])
const emailOrUsername = ref('')
const password = ref('')

function onSubmit() {
  emit('submit', { emailOrUsername: emailOrUsername.value.trim(), password: password.value })
}
</script>

<template>
  <form @submit.prevent="onSubmit" style="display: grid; gap: 12px; max-width: 360px;">
    <h2>Iniciar sesión</h2>

    <label>
      Usuario o correo
      <input v-model="emailOrUsername" type="text" required />
    </label>

    <label>
      Contraseña
      <input v-model="password" type="password" required />
    </label>

    <button type="submit">Entrar</button>
  </form>
</template>
