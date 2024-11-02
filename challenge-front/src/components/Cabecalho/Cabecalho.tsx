import Image from "next/image";
import Menu from "../Menu/Menu";
import imgLogo from "@/img/porto-logo.png";

export default function Cabecalho() {
    return (
        <header className="cabecalho text-black inline-flex items-center mx-auto pl-[20%] h-36 w-full max-w-screen-xl">
            <Image src={imgLogo} alt="logo" width={40} height={40} className="mr-2 mt-2 inline-flex" />
            <h1 className="mr-10 text-3xl font-bold">Porto</h1>
            <Menu />
        </header>
    );
}
