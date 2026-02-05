<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RegisterForm from '../components/register-form.component.vue'
import { useAuthStore } from '../services/auth.store'

const router = useRouter()
const auth = useAuthStore()
const error = ref('')
const ok = ref(false)

async function handleSubmit({ username, email, password }) {
  error.value = ''
  ok.value = false
  try {
    await auth.register(username, email, password)
    ok.value = true
    setTimeout(() => router.push({ name: 'login' }), 600)
  } catch (error) {
    error.value = 'No se pudo registrar (email/username duplicado o API no disponible).'
  }
}
</script>

<template>
  <div style="padding: 24px;">
    <RegisterForm @submit="handleSubmit" />
    <p v-if="ok" style="color: green; margin-top: 12px;">Registro exitoso. Redirigiendo...</p>
    <p v-if="error" style="color: crimson; margin-top: 12px;">{{ error }}</p>

    <p style="margin-top: 12px;">
      ¿Ya tienes cuenta?
      <RouterLink to="/login">Inicia sesión</RouterLink>
    </p>
  </div>
</template>
