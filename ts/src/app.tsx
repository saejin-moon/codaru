import "@/assets/css/app.css";
import { Logo } from "./assets/img/tsx/Logo";
import { Slogan } from "./assets/img/tsx/Slogan";
import { Rocket, Briefcase, Handshake, UserRoundPlus, Trophy, CircleUserRound, Store } from "lucide-preact";

export function App() {
    return (
        <div>
            <div className="w-full h-full flex items-center justify-between flex-col fixed top-0 left-0">
                <nav class="w-full h-15 relative flex justify-around items-center">
                    <Logo color="#000"/>
                </nav>
                <Slogan/>
                <div class="w-full h-15 relative flex justify-center items-center">
                    <nav class="w-90 h-full flex justify-between items-center text-black">
                    <Rocket size={30} />
                    <Briefcase size={30} />
                    <Handshake size={30}  />
                    <UserRoundPlus size={30} />
                    <Trophy size={30} />
                    <Store size={30} />
                    </nav>
                    <CircleUserRound size={30} class="absolute right-3 bottom-3"/>
                </div>
            </div>
            <div className="w-full h-screen flex justify-center items-center">
                {/* ... */}
            </div>
        </div>
    );
}

export default App;
