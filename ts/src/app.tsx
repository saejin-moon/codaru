import "@/assets/css/app.css";
import { Navigation } from "@/components/Nav";
import Slogan from "@/assets/img/svg/slogan.svg?react";

export function App() {
    return (
        <div class="bg-main-bg text-brand font-[LilGrotesk] font-bold">
            <Navigation/>
            <div class="w-full h-screen flex flex-col justify-center items-center overflow-y-hidden">
                <Slogan width="40rem" class="fill-brand"/>
                <span class="text-4xl z-2 mt-8 mb-10"><span class="text-accent">codaru</span> is a non-profit competitive coding league.</span>
                <div class="bg-[#d76744] text-brand text-2xl p-2 px-8 cursor-pointer z-2 select-none rounded-sm -translate-x-2 font-black -rotate-2">join the league</div>
            </div>
                {/* all sites should mostly not have to scroll. might put hosts on landing, not sure. for landing we should have a canvas with the slogan + doodles on the right side and then on the left side have the cta. */}
        </div>
    );
}

export default App;
