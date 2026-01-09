import { AuthForm } from "@/components/Auth";
import { Navigation } from "@/components/Navigation";
import type { RoutableProps } from "preact-iso";
import { useLocation } from "preact-iso";
import { useAuth } from "@/context/auth";

export function Join(_props: RoutableProps){
    const { route } = useLocation();
    const { user } = useAuth();
    
    if (user?.id) route("/");
    
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