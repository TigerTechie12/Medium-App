import {useState} from "react"
import type {ChangeEvent} from "react"
import {Link, useNavigate} from "react-router-dom"
import type {SignupInput} from "@shreyash_iitr/medium1-common"
import {BACKEND_URL} from "../config"
import axios from "axios"

export function Auth({type}:{type: "signup" | "signin"}){
    const navigate=useNavigate()
    const [postInputs,setPostInputs]=useState<SignupInput>({name:"",
        username:"",
        password:"",
    })
    async function sendRequest(){
        try{const res= await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signup"? "signup" : "signin"}`,postInputs)
    const jwt=res.data
localStorage.setItem("token",jwt)
navigate("/blogs")
}
        catch(e){alert("Error while signing in")}
    }

    return <div className="flex  h-screen flex-col  justify-center items-center">
        <div className="font-bold text-3xl ">Create an account</div>
        <div className="flex flex-row">
           
            <div className="font-light " > {type=="signin" ? "Dont have an account" : "Already have an account"} </div>
            <Link className="font-light pl-2 underline" to={type=="signin"?"/signup":"/signin"}>{type=="signin"?"Sign up":"Sign in"}</Link>
        </div>
        { type=="signup" ? <LabelledInput 
            label="name" 
            placeholder="Shazz Shiv..." 
            onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name:e.target.value
                })
            }}
        
        /> : null }
        <LabelledInput 
            label="username" 
            placeholder="xyz@gmail.com"  
            onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    username:e.target.value
                })
            }} 
        />
        <LabelledInput label="Password" placeholder="xxxxxxx" onChange={(e)=>{setPostInputs({...postInputs,password:e.target.value})}}></LabelledInput>
<button type="button"onClick={sendRequest} className="text-white pt-4 mt-4 w-1/4 bg-gray-800  hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type=="signup" ? "Sign up" : "Sign in"}</button>
    </div>
}
interface LabelledInputType{
    label:string;
    placeholder:string;
    onChange:(e: ChangeEvent<HTMLInputElement>)=>void;
    type?:string;
}
function LabelledInput({label,placeholder,onChange, type}:LabelledInputType){
return <div>
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
<input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder}
></input>
</div>
}