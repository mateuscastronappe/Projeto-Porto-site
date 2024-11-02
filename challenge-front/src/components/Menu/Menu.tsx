import Link from "next/link";

export default function Menu() {
    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/">Ajuda</Link></li>
                <li><Link href="/">Sobre nós</Link></li>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/">Integrantes</Link></li>
            </ul>
        </nav>
    )
}