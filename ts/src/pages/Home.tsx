// svg
import Slogan from "@/assets/img/svg/slogan.svg?react";
// components
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArrowBigRight } from "lucide-preact";
import type { RoutableProps } from "preact-iso";
import { useAuth } from "@/context/auth";
import { useEffect } from "preact/hooks";
import { api } from "@/lib/api";

export function Home(_props: RoutableProps) {
    const { user } = useAuth();
    
    useEffect(() => {
        if(user?.id) api.token.then(res => res.json()).then(data => console.log(data))
    }, [])
    
    return (
        <div>
            <Header />
            <div class="overflow-hidden h-screen">
                <div class="w-screen h-screen flex flex-col justify-center items-center gap-8">
                    <Slogan class="fill-brand w-4/5 md:w-200" />
                    <span class="text-center text-xl md:text-4xl z-2 w-3/4"><span class="text-accent">codaru</span> is a non-profit competitive coding league.</span>
                    {!user?.id && <a href="/join">
                        <div class="bg-[#d76744] w-55 h-12 text-brand text-2xl p-2 px-8 cursor-pointer z-2 select-none rounded-sm -translate-x-2 font-black -rotate-2 hover:bg-[#b74724] duration-300 transition-all group overflow-hidden">
                            <span class="absolute translate-x-0 transition-transform duration-300 group-hover:translate-x-3/2">join the league</span>
                            <ArrowBigRight size={30} className="absolute -translate-x-6/2 transition-transform duration-300 group-hover:translate-x-4/2" />
                        </div>
                    </a>}
                </div>
                <Navigation />
            </div>
            <Footer />
        </div>
    );
}

export default Home;