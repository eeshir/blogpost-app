import { Hono } from 'hono'
import userRouter from './users'
import blogRouter from './blogs'
const app = new Hono()

app.route('/users', userRouter)
app.route('/blogs', blogRouter)

export default app