import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinSchema, signupSchema } from '@eeshir/blogpost-common'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

app.post('/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const {success} = signinSchema.safeParse(body)
  if(!success){
    c.status(411)
    return c.json({error: 'Invalid input'})
  }  

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      }
    })
    const token = await sign({ id:user.id  }, c.env.JWT_SECRET)
    return c.json({ jwt: token })
  }
  catch (e) {
    return c.json({ error :e })
  }
})

app.post('/signin', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const {success} = signupSchema.safeParse(body)
  if(!success){
    c.status(411)
    return c.json({error: 'Invalid input'})
  }  
  try{
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    })
    if (!user) {
      return c.json({ message: 'User not found' })
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt: token })
  }
  catch(e){
    c.status(500)
    return c.json({ error: e })
  }
})

export default app