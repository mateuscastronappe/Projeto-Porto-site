import Link from "next/link";

export default function Menu() {
    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/pages/ajuda">Ajuda</Link></li>
                <li><Link href="/pages/sobre-nos">Sobre nós</Link></li>
                <li><Link href="/pages/planos">Planos</Link></li>
                <li><Link href="/pages/consultoria">Consultoria</Link></li>
                <li><Link href="/pages/integrantes">Integrantes</Link></li>
            </ul>
        </nav>
    )
}