import { Hono } from 'hono'

import {userRouter} from './routes/user'
import {blogsRouter} from './routes/blogs'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECRET:string}
}>()


app.route("/api/v1/user", userRouter)
app.route("/api/v1/blogs",blogsRouter)
export default app

