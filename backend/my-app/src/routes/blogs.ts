import { Hono } from "hono"
import{PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import{sign,verify,decode} from 'hono/jwt'
import{createBody,updateBlogInput} from "@shreyash_iitr/medium1-common"
export const blogsRouter=new Hono<{
    Bindings:{
      DATABASE_URL:string;
      JWT_SECRET:string;
    },
    Variables:{
        userId:string;
    }
  }>()
  
blogsRouter.use("/*",async(c,next)=>{
    const authHeader=c.req.header("authorization") || ""
    const user=await verify(authHeader,c.env.JWT_SECRET) as {id:string}
  if(user){
    c.set("userId",user.id)
    await next()
  }
  else{
    c.status(403)
    return c.json({
        msg:"You are not logged in"
    })
  }
    
})

blogsRouter.post("/",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json()
    const {success}=createBody.safeParse(body)
    if(!success){c.status(411)}
    const userId=c.get("userId")
try{const userBody=await prisma.post.create({
    data:{title:body.title,
        content:body.content,
        authorId:body.authorId

    }
})
return c.json({id:userBody.id})
}
catch(e){return c.status(411)
}})

blogsRouter.put("/blog",async(c)=>{ const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
const body=await c.req.json()
const {success}=updateBlogInput.safeParse(body)
if(!success){c.status(411)}
try{const userBody=await prisma.post.update({
    where:{id:body.id},
    data:{title:body.title,
    content:body.content}
})
return c.text('updated post')
}
 catch(e){return c.status(411)}
})

blogsRouter.get("/:id",async(c)=>{const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
const id=c.req.param("id")

try{const findBody=await prisma.post.findFirst({ 
      where:{id:Number(id)},
      select:{
        id:true,
        title:true,
        content:true,
        author:{
            select:{name:true}
        }
      }
})
return c.json(findBody)
}
catch(e){return c.status(411)}})

blogsRouter.get("/bulk",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
try{const findBody=await prisma.post.findMany({
    select:{
        id:true,
        content:true,
        author:{
            select:{name:true}
        }
    }
})

return c.json({findBody})
}
catch(e){
    return c.status(411)
}})