import {Avatar} from "../pages/BlogCard"
import {Link} from "react-router-dom"
export function Appbar(){
    return <div className="  py-4 flex flex-row justify-between m-3 px-10">
        <Link to={'/blogs'}>
        <div className="font-semibold">
            Medium
        </div></Link>
<div>
<div className="flex flex-row">
    <Link to={'/publish'}>
    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-0.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New</button></Link>


    <Avatar authorName="Shazz"></Avatar>
</div></div></div>
}