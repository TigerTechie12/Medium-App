import { Hono } from "hono"
import{PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import{sign,verify,decode} from 'hono/jwt'
import {signupInput,signinInput} from "@shreyash_iitr/medium1-common"
export const userRouter=new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    }
  }>()
  

  userRouter.post("/signup",async(c)=>{
    const body=await c.req.json()
    const {success} =signupInput.safeParse(body)
    if(!success){
        c.status(411)
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  try{
    const userBody=await prisma.user.create({
        data:{
            email:body.email,
            password:body.password,
            name:body.name,
            username:body.username
        }
  })
const jwt=await sign({
    id:userBody.id
},c.env.JWT_SECRET)

    return c.text(jwt)}
  
    catch(e){
        c.status(411)
        return c.text('Invalid')  
        }  
})
  
userRouter.post('/api/v1/user/signin',async(c)=>{
    const body=await c.req.json()
    const {success}=signinInput.safeParse(body)
    if(!success){
        c.status(411)
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const userBody=await prisma.user.findFirst({
            where:{username:body.username}})
    if(userBody){
        const jwt=await sign({
            id:userBody.id},c.env.JWT_SECRET)
return c.text(jwt)
        }
        }
catch(e){c.status(411)
return c.text('Invalid')}

})

