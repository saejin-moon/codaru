import { AuthForm } from "@/components/Auth";
import { Navigation } from "@/components/Navigation";

export function Join(){
    return (<div>
        <div class="overflow-hidden h-screen">
            <div class="flex flex-col w-full h-full justify-center items-center">
                <AuthForm/>
            </div>
            <Navigation/>
        </div>
    </div>);
};
export default Join;