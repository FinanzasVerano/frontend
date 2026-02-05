import jsonServer from 'json-server'
import path from 'path'
import { fileURLToPath } from 'url'
import { nanoid } from 'nanoid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)


function getUsers() {
  return router.db.get('users').value()
}

function findUserByEmailOrUsername(value) {
  const users = getUsers()
  return users.find(u => u.email === value || u.username === value)
}


server.post('/auth/register', (req, res) => {
  const { username, email, password } = req.body || {}

  const exists = router.db.get('users')
    .value()
    .some(u => u.username === username || u.email === email)

  if (exists) {
    return res.status(409).json({ message: 'User already exists' })
  }

  const newUser = {
    username,
    email,
    password,
    activo: true,
    created_at: new Date().toISOString(),
    codigo_rol: 1
  }

  const created = router.db.get('users').insert(newUser).write()

  return res.status(201).json({ user: created })
})


server.post('/auth/login', (req, res) => {
  const { emailOrUsername, password } = req.body || {}
  if (!emailOrUsername || !password) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  const user = findUserByEmailOrUsername(emailOrUsername)
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  return res.status(200).json({ user, token: 'mock-token' })
})

server.use(router)

const port = 3001
server.listen(port, () => {
  console.log(`Mock API running on http://localhost:${port}`)
})
