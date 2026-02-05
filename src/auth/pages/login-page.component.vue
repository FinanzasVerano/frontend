<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from '../components/login-form.component.vue'
import { useAuthStore } from '../services/auth.store'

const router = useRouter()
const auth = useAuthStore()
const error = ref('')

async function handleSubmit({ emailOrUsername, password }) {
  error.value = ''
  try {
    await auth.login(emailOrUsername, password)
    //lo lleva a la pagina dashboard
    await router.push({ name: 'dashboard' })
  } catch (error) {
    error.value = 'Credenciales inválidas o API no disponible.'
  }
}
</script>

<template>
  <div style="padding: 24px;">
    <LoginForm @submit="handleSubmit" />
    <p v-if="error" style="color: crimson; margin-top: 12px;">{{ error }}</p>

    <p style="margin-top: 12px;">
      ¿No tienes cuenta?
      <RouterLink to="/register">Regístrate</RouterLink>
    </p>
  </div>
</template>
