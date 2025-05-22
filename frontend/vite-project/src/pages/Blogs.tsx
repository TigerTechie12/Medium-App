import {BlogCard} from "../pages/BlogCard"
import {useBlogs} from "../hooks"
import {Appbar} from "../components/Appbar"
import { BlogSkeleton } from "../components/BlogSkeleton"
export function Blogs(){
    const {loading,blogs}=useBlogs()
    if(loading){
        return <div><BlogSkeleton></BlogSkeleton>
        <BlogSkeleton></BlogSkeleton>
        <BlogSkeleton></BlogSkeleton>
        <BlogSkeleton></BlogSkeleton>
        <BlogSkeleton></BlogSkeleton></div>
    }
    return <div>
        <Appbar></Appbar>
        <div className="flex justify-center">
            <div className="max-w-xl">
                {blogs.map(blog => <BlogCard 
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Oct 2023"}
                    id={blog.id}
                ></BlogCard>)}
            </div>
        </div>
       
    </div>
}

