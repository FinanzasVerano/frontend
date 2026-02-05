<script setup>
import { useAuthStore } from '@/auth/services/auth.store'
const auth = useAuthStore()
</script>

<template>
  <div style="padding: 24px;">
    <h1>Dashboard</h1>
    <p>Usuario: {{ auth.currentUser?.email || auth.currentUser?.username }}</p>
    <button @click="auth.logout()">Cerrar sesión</button>
  </div>
</template>
