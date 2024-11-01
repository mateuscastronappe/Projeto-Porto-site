import Image from "next/image";
import Menu from "../Menu/Menu";
import imgLogo from "@/img/porto-logo.png";

export default function Cabecalho() {
    return (
        <header className="text-black inline-flex items-center mx-auto pl-[20%] h-36 w-full max-w-screen-xl">
            <Image src={imgLogo} alt="logo" width={100} height={100} />
            <Menu />
        </header>
    );
}
