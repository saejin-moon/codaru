import Logo from "@/assets/img/svg/logo.svg?react";

export function Header() {
    return (
        <div class="w-screen fixed top-0 flex justify-center items-center pt-10">
            <Logo class="w-10 md:w-[4rem]"/>
        </div>
    );
}