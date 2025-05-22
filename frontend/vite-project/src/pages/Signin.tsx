import {Quote} from "../components/Quote"
import {Auth} from "../components/Auth"
export function Signin(){
    return <div><div className="flex h-screen">
     <div className="w-1/2"><Auth type="signin"></Auth></div>
    <div className="w-1/2 invisible lg:visible"><Quote></Quote></div>
    </div>
</div>}