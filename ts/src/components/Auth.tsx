// import { Input } from "@/components/ui/input";
// import { ArrowBigRight } from "lucide-react";
// import { Turnstile } from "@marsidev/react-turnstile";
import JoinHeader from "@/assets/img/svg/join.svg?react";
import discord from "@/assets/img/svg/discord.svg";
import github_mark from "@/assets/img/svg/github.svg";
import { supabase } from "@/lib/supabase";

export function AuthForm(){
    return (<div class="flex gap-40 justify-center items-center">
        <JoinHeader class="fill-brand h-50"/>
        <div class="justify-center items-center flex flex-col gap-4 px-2">
            
            {/*<span class="font-[LeagueSpartan] text-brand text-2xl font-bold">email</span>
            <Input id="email" type="email" placeholder="example@email.com" required className="font-[LilGrotesk] font-xl placeholder:text-brand/40 text-brand border-3 border-brand/75 focus:outline-none focus:shadow-none focus:ring-0 focus-visible:outline-none focus-visible:shadow-none focus-visible:ring-0 my-4"/>
            <div class="bg-accent-dark text-brand text-lg p-1 px-4 cursor-pointer z-2 select-none rounded-sm font-black group flex justify-center items-center relative w-25 h-8 overflow-hidden transition-colors duration-300 active:bg-accent-dark/75">
                <span class="transition-transform duration-300 absolute translate-x-0 group-hover:translate-x-4/2">continue</span>
                <ArrowBigRight className="absolute transition-transform duration-300 -translate-x-5/2 group-hover:translate-x-0"/>
            </div>
            <div class="flex justify-center items-center my-6">
                <span class="h-0.5 w-20 bg-brand/50 rounded-lg"></span>
                <span class="font-[LilGrotesk] text-brand/50 text-xl pl-1 pr-1">OR</span>
                <span class="h-0.5 w-20 bg-brand/50 rounded-lg"></span>
            </div>*/}
            <span class="font-[LeagueSpartan] text-accent/60 text-6xl font-bold text-nowrap">login with</span>
            <div class="flex gap-4 justify-center items-center">
                <div class="w-15 h-15 flex justify-center items-center bg-[#5865f2] rounded-sm cursor-pointer" onClick={async () => await supabase.auth.signInWithOAuth({
                    provider: "discord"
                })}>
                    <img class="w-11" src={discord}></img>
                </div>
                <div class="w-15 h-15 bg-[#f6f8fa] rounded-sm flex justify-center items-center gap-2 cursor-pointer" onClick={async () => await supabase.auth.signInWithOAuth({
                    provider: "github"
                })}>
                    <img class="w-11" src={github_mark}></img>
                </div>
            </div>
        </div>
        {/* <Turnstile siteKey={import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY}/> */}
    </div>);
}