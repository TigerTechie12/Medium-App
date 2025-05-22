import {Appbar} from "./Appbar"
import type {Blog} from "../hooks"
import {Avatar} from "../pages/BlogCard"
export function FullBlog({blog}:{blog:Blog}){
    return <div>
        <Appbar></Appbar>
         <div className="flex justify-center">
     <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12">
        <div className=" col-span-8 ">
            <div className="text-5xl font-extrabold">
                {blog.title}
            </div>
            <div className="text-slate-500 pt-2">Posted on 2nd Dec 2023</div>
            <div className="">{blog.content}</div>
        </div>
        <div className="col-span-4">Author
            <div className="flex"> 
                <Avatar authorName={blog.author.name || "Anonymous"}></Avatar>
                <div className="text-xl font-bold">{blog.author.name || "Anonymous"}</div>
              <div className="pt-2 text-slate-500">Random catch phrase about the author's ability</div></div>
           </div>
      
    </div></div></div>
}