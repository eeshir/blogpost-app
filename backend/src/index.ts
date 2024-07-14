import { Hono } from 'hono'
import roorRouter from '../routes/index'
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1', roorRouter)

export default app
