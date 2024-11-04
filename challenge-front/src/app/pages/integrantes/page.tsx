import Image from "next/image";
import gabrielaImage from '@/img/integrante-gabriela.png';
import mateusImage from '@/img/integrante-mateus.png';
import anaImage from '@/img/integrante-ana.png';
import githubLogo from '@/img/logo-github.png';

export default function Integrantes() {
  return (
    <section className="text-center">
      <div className="tituloIntegrantes">
        <h2>Integrantes</h2>
        <hr/>
      </div>
      <div className="containerIntegrantes">
        <div className="integrante">
          <p className="nome">Ana Carolina de Castro Gonçalves</p>
          <Image src={anaImage} alt="Ana Carolina de Castro Gonçalves" className="imagens" />
          <p className="rm">RM: 554669</p>
        </div>
        <div className="integrante">
          <p className="nome">Gabriela Gomes Cezar</p>
          <Image src={gabrielaImage} alt="Gabriela Gomes Cezar" className="imagens" />
          <p className="rm">RM: 556941</p>
        </div>
        <div className="integrante">
          <p className="nome">Mateus De Castro Nappe</p>
          <Image src={mateusImage} alt="Mateus De Castro Nappe" className="imagens" />
          <p className="rm">RM: 556474</p>
        </div>
        <div className="repositorio">
          <p className="nome">Touch the cat!</p>
          <a href="https://github.com/mateuscastronappe/sprint4.git" target="_blank" rel="noopener noreferrer">
            <Image src={githubLogo} alt="GitHub Logo" className="imagens" />
          </a>
          <p className="rm">Veja nosso repositório</p>
        </div>
      </div>
    </section>
  );
}
