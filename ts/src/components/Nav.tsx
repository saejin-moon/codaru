import * as Lucide from "lucide-preact";
import { Logo } from "@/assets/img/tsx/Logo";

const icons = [
    { Icon: Lucide.Users, label: "teams" },
    { Icon: Lucide.BookText, label: "rules" },
    { Icon: Lucide.Rocket, label: "mission" },
    { Icon: Lucide.Crown, label: "hosts" },
    { Icon: Lucide.Handshake, label: "sponsors" },
    { Icon: Lucide.Briefcase, label: "jobs" },
    { Icon: Lucide.Store, label: "shop" }
];

export function Navigation() {
    return (
        <div class="w-full h-screen flex items-center justify-between flex-col fixed top-0 left-0 overflow-hidden z-1">
            <nav class="w-full h-20 mt-5 relative flex justify-around items-center">
                <Logo size="4rem"/>
            </nav>
            <div class="w-full h-20 relative flex justify-center items-center mb-5">
                <nav class="w-300 h-full flex justify-between items-center text-brand/40">
                    {icons.map(({ Icon, label }) => (
                        <div key={label} class="group relative flex flex-col items-center">
                            <span class="absolute -top-10 px-2 py-1 rounded bg-none text-accent font-[LilGrotesk] font-bold text-lg opacity-0 translate-y-5 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-2 pointer-events-none whitespace-nowrap">{label}</span>
                            <Icon size={40} class="text-brand/40 transition-all duration-300 group-hover:text-brand/100"/>
                        </div>
                    ))}
                </nav>
                {/* add shadcn avatar for the future */}
            </div>
        </div>
    )
}