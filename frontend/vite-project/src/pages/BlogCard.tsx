import {Appbar} from "../components/Appbar"
import {Link} from "react-router-dom"
interface BlogCardProps{
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
    id:number;
}
interface AvatarProps{
    authorName:string;
    
}

export function BlogCard({authorName,title,content,publishedDate,id}:BlogCardProps){
   
   return <div>
    <Link to={`/blog/${id}`}>
    <div className=" mb-4"><Appbar></Appbar></div>
    <div className="border border-slate-200 pb-4 ml-2 w-screen max-w-screen-md cursor-pointer">
<div className="flex flex-row">
  <div className="mr-2"><Avatar authorName={authorName}></Avatar> </div><div className="font-semibold">{authorName}</div>  <div className=" text-gray-500">{publishedDate}</div>
</div>
<div className="font-bold mb-1">{title}</div>
<div className="mb-5 text-gray-400">{content.slice(0,100)+"..."}</div>
<div>{`${Math.ceil(content.length/100)} minutes`}</div>
    </div></Link></div> 
   
}

export function Avatar({authorName}:AvatarProps){
   return <div><div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden  bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-xs text-gray-600 dark:text-gray-300">{authorName[0]}</span></div></div>
    
}