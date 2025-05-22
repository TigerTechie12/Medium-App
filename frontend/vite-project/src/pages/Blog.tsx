import {useBlog} from "../hooks"
import {useParams} from "react-router-dom"
import{FullBlog} from "../components/FullBlog"
export function Blog(){
    const {id}=useParams()
    const {loading,blog}=useBlog({
        id:id || ""
    })
   if(loading){  return <div>
    loading...
</div>}
return <div><FullBlog blog={blog[0]}></FullBlog></div>

 }