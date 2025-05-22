import {Quote} from "../components/Quote"
import {Auth} from "../components/Auth"
export function Signup(){
    return <div><div className="flex h-screen">
     <div className="w-1/2"><Auth type="signup"></Auth></div>
    <div className="w-1/2 invisible lg:visible"><Quote></Quote></div>
    </div>
</div>}