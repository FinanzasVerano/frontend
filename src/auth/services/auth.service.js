import httpInstance from '../../shared/services/http.instance'

const STORAGE_KEY = 'currentUser'

export const authService = {
  async register({ username, email, password }) {
    const { data: users } = await httpInstance.get('/users')

    const exists = users.some(u => u.username === username || u.email === email)
    if (exists) throw new Error('duplicate')

    const { data: created } = await httpInstance.post('/users', {
      username,
      email,
      password,
      activo: true,
      created_at: new Date().toISOString(),
      codigo_rol: 1
    })

    return { user: created }
  },

  async login({ emailOrUsername, password }) {
    const { data: users } = await httpInstance.get('/users')

    const user = users.find(u =>
      (u.email === emailOrUsername || u.username === emailOrUsername) &&
      u.password === password
    )

    if (!user) throw new Error('invalid')

    const session = { user, token: 'mock-token' }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    return session
  },

  logout() {
    localStorage.removeItem(STORAGE_KEY)
  },

  getCurrent() {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  }
}
