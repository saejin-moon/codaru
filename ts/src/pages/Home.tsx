// svg
import Slogan from "@/assets/img/svg/slogan.svg?react";
// components
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function Home() {
    return (
        <div>
            <Header />
            <div class="overflow-visible">
                {/* keep it simple. let each piece speak for itself */}
                <div class="w-screen h-screen flex flex-col justify-center items-center gap-8">
                    <Slogan class="fill-brand w-4/5 md:w-[50rem]" />
                    <span class="text-center text-xl md:text-4xl z-2 w-3/4"><span class="text-accent">codaru</span> is a non-profit competitive coding league.</span>
                    <div class="bg-[#d76744] text-brand text-2xl p-2 px-8 cursor-pointer z-2 select-none rounded-sm -translate-x-2 font-black -rotate-2 hover:bg-[#b74724] duration-300 transition-all">join the league</div>
                </div>
                <Navigation />
            </div>
            <Footer />
        </div>
    );
}

export default Home;