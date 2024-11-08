import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign} from 'hono/jwt'
import { signinSchema,signupSchema } from '@eeshir/blogpost-common'
import {z} from 'zod'
import { fromError } from 'zod-validation-error';


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
  try{
      signupSchema.parse(body)
  }
  catch(e){
    c.status(411)
    const validationError = fromError(e);
    return c.json({error: validationError.toString() })
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
    return c.json({ jwt: token ,name: user.name, Id: user.id })
  }
  catch (e) {
    return c.json({ message:"Error while signing up" })
  }
})

app.post('/signin', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  try{
    signinSchema.parse(body)
}
catch(e){
  c.status(411)
  const validationError = fromError(e);
  return c.json({error: validationError.toString() })
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
    return c.json({ jwt: token , name: user.name , Id: user.id })
  }
  catch(e){
    c.status(500)
    return c.json({ error: e })
  }
})

export default app