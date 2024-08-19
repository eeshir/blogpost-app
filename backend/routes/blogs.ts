import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
const app = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: any
    }
}>()
app.use('/*', async (c, next) => {

    const auth_token = c.req.header('Authorization') || "";
    const token = auth_token

    try {
        const response = await verify(token, c.env.JWT_SECRET)
        // console.log(response)
        if (response.id) {
            c.set('userId', response.id);
            await next()
        }
        else {
            c.status(403)
            return c.json({ error: 'Unauthorized' })
        }
    }
    catch (e) {
        c.status(403)
        return c.json({ error: 'Unauthorized' })
    }

})
app.get('/auth', async(c)=>{

    return c.json({message:"Authorized"})
})
app.post('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get('userId')
            }
        })
        // console.log(c.get('userId'));
        return c.json({ id: blog.id })
    }
    catch (e) {
        return c.json({ error: e })
    }
})

app.put('/', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const check = await prisma.post.findUnique({
        where: {
            id: body.id,
            authorId: userId
        }
    })
    if (!check) {
        c.status(411);
        return c.json({ message: 'Blog Not Found' })
    }
    const blog = await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({ message: 'Blog Updated', blog })
})

app.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            publishedAt:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    return c.json(blogs)
})

app.get('/profile/:user', async (c) => {
    const userName = c.req.param('user');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany({
        where:{
            author:{
                name:userName
            }
        },
        select:{
            content:true,
            title:true,
            id:true,
            publishedAt:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    return c.json(blogs)
})

app.get('/:id', async (c) => {
    const updId = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findUnique({
            where: {
                id: updId
            },
            select:{
                content:true,
                title:true,
                id:true,
                publishedAt:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json({ blog })
    }
    catch (e) {
        c.status(411);
        return c.json({ message: "Error while getting the Blog", error: e })
    }
})


export default app