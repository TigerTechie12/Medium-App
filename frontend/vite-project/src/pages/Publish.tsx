import {Appbar} from "../components/Appbar"
import axios from "axios"
import {BACKEND_URL} from "../config"
import type {ChangeEvent} from "react"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
export function Publish(){ 
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
const navigate=useNavigate()
return <div><Appbar></Appbar><div className="flex justify-center w-screen pt-8">
       
        <div className="w-full max-w-screen-lg">

<input onChange={(e)=>{setTitle(e.target.value)}} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  w-full rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5" placeholder="Title" />
<div className="w-full"><TextEditor  onChange={(e)=>{setDescription(e.target.value)}}></TextEditor></div>
  <div className="flex justify-center">
  <button onClick={async()=>{ const res=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
    title,
    description
  },{
    headers:{
        Authorization:localStorage.getItem("token")
    }
  })

}}
    type="submit"
    className="flex justify-center items-center pt-2 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
  >
    Publish 
  </button></div>
</div></div>

</div>
}
 function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) 
{
    return <div className="mt-2"><div className="w-full mb-4 border">
  <div className="flex items-center justify-between ">
    <div className="py-2.5  bg-white rounded-lg w-full">
      <label htmlFor="editor" className="sr-only">Publish post</label>
      <textarea onChange={onChange}
        id="editor"
        rows={8}
        className="block w-full px-0 text-sm text-gray-900  bg-white border-0 pl-2"
        placeholder="Write an article..." 
        required
      />
    </div>
  </div>

</div>
</div>
}