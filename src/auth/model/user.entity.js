export class User {
  constructor({ codigo, username, email, activo, rol } = {}) {
    this.codigo = codigo ?? null
    this.username = username ?? ''
    this.email = email ?? ''
    this.activo = activo ?? true
    this.rol = rol ?? null
  }
}
