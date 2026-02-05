export const endpoints = {
  auth: {
    base: import.meta.env.VITE_AUTH_ENDPOINT || '/auth',
    register: '/register',
    login: '/login',
  },
}
