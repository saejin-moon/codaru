import * as Lucide from "lucide-preact";
import { useAuth } from "@/context/auth";
import { useState } from "preact/hooks";
import { Settings, LogOut } from "lucide-preact";
// import { Option } from "@/lib/utils";

/*
(a) reduce to:
    *pre-draft*
    + mission 
    + faq
    + shop 
    + sponsors 
    *post-draft*
    + teams
    *post-first challenge*
    + mission
    + teams
    + leaderboard
    + shop 
    + sponsors
    - faq
    elsewhere:
    - faq (join + dashboard + footer)
    - rules (join + dashboard + footer)
    - hosts (mission + sponsors)
    - discord (join + dashboard + footer)
    - positions (banners on landing + dashboard, for vols, cap'ns, and judges)
*/
const icons = [
    /*
    { Icon: Lucide.Users, label: "teams" },
    { Icon: Lucide.BadgeQuestionMark, label: "faq" },
    { Icon: Lucide.BookText, label: "rules" },
    { Icon: Lucide.Rocket, label: "mission" },
    { Icon: Lucide.Crown, label: "hosts" },
    { Icon: Lucide.Handshake, label: "sponsors" },
    { Icon: Lucide.Briefcase, label: "jobs" },
    { Icon: Lucide.Store, label: "shop" }
    */
    { Icon: Lucide.Rocket, label: "mission" },
    { Icon: Lucide.BadgeQuestionMark, label: "faq" },
    { Icon: Lucide.Store, label: "shop" },
    { Icon: Lucide.Handshake, label: "sponsors" },
    { Icon: Lucide.ArrowUpRight, label: "join"}
];



export function Navigation() {
    const [menu, setMenu] = useState<Boolean>(false);
    const { user, signOut } = useAuth();
    console.log(user);
    return (
        <div class="w-screen h-20 sticky bottom-0 flex justify-center items-center gap-5 md:gap-40 text-brand/40 z-50">
            {icons.map(({ Icon, label }) => {
                if (label !== "join") {
                    return (<a href={`/${label}`} key={label} class="group relative flex flex-col items-center">
                        <span class="absolute -top-10 px-2 py-1 rounded bg-none text-accent font-[LilGrotesk] font-bold text-lg opacity-0 translate-y-5 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-2 pointer-events-none whitespace-nowrap">{label}</span>
                        <Icon size={40} class="text-brand/40 group-hover:text-brand transition-all duration-300 cursor-pointer" />
                    </a>);
                }
                else {
                    if (user?.id) {
                        return (
                            <div class="relative flex flex-col items-center justify-center">
                                <div class={`
                                    absolute bottom-18 flex flex-col flex-nowrap gap-3 border-accent/20 border-3 p-3 rounded-sm group transition-all duration-300 hover:border-accent
                                    ${ menu ? "opacity-100 translate-y-0 scale-100"
                                            : "opacity-0 translate-y-5 scale-95"
                                    }`}>
                                    <a href="/settings" class="flex gap-4 text-nowrap cursor-pointer text-brand/40 transition-all duration-300 hover:text-brand">
                                        <Settings/>
                                        <span>settings</span>
                                    </a>
                                    <span class="h-1 w-full rounded-sm bg-accent/20 group-hover:bg-accent transition-all duration-300"></span>
                                    <div class="flex gap-4 text-nowrap cursor-pointer text-brand/40 transition-all duration-300 hover:text-brand" onClick={signOut}>
                                        <LogOut/>
                                        <span>sign out</span>
                                    </div>
                                </div>
                                <div class="group relative flex flex-col items-center cursor-pointer" onClick={() => setMenu(v => !v)}>
                                    <span class="absolute -top-10 px-2 py-1 rounded bg-none text-accent font-[LilGrotesk] font-bold text-lg opacity-0 translate-y-5 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-2 pointer-events-none whitespace-nowrap">{user.user_metadata.user_name ?? user.user_metadata.full_name}</span>
                                    <img src={user.user_metadata.avatar_url} class="w-11 rounded-full border-accent/40 opacity-40 border-3 transition-all duration-300 group-hover:border-accent group-hover:opacity-100"></img>
                                </div>
                            </div>
                        );
                    }
                    else {
                        return (<a href={`/${label}`} key={label} class="group relative flex flex-col items-center">
                            <span class="absolute -top-10 px-2 py-1 rounded bg-none text-accent font-[LilGrotesk] font-bold text-lg opacity-0 translate-y-5 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-2 pointer-events-none whitespace-nowrap">{label}</span>
                            <Icon size={40} class="text-accent/40 group-hover:text-accent transition-all duration-300 cursor-pointer" />
                        </a>)
                    }
                }
            })}
        </div>
    )
}