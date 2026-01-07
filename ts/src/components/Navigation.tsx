import * as Lucide from "lucide-preact";

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
    return (
        <div class="w-screen h-20 sticky bottom-0 flex justify-center items-center gap-5 md:gap-40 text-brand/40 z-50">
            {icons.map(({ Icon, label }) => (
                <a href={`/${label}`} key={label} class="group relative flex flex-col items-center">
                    <span class="absolute -top-10 px-2 py-1 rounded bg-none text-accent font-[LilGrotesk] font-bold text-lg opacity-0 translate-y-5 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-2 pointer-events-none whitespace-nowrap">{label}</span>
                    <Icon size={40} class={label === "join" ? "text-accent/40 group-hover:text-accent transition-all duration-300 cursor-pointer" : "text-brand/40 group-hover:text-brand transition-all duration-300 cursor-pointer"}/>
                </a>
            ))}
            {/* add shadcn avatar for the future */}
        </div>
    )
}