import Image from "next/image";
import Menu from "../Menu/Menu";
import imgLogo from "@/img/porto-logo.png";

export default function Cabecalho() {
    return (
        <header className="cabecalho">
            <Image src={imgLogo} alt="logo" width={40} height={40} className="mr-2 mt-2 inline-flex" />
            <h1>Porto</h1>
            <Menu />
        </header>
    );
}
