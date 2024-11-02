import Image from "next/image";
import gabrielaImage from '../../../img/integrante-gabriela.png';
import mateusImage from '../../../img/integrante-mateus.png';
import anaImage from '../../../img/integrante-ana.png';
import githubLogo from '../../../img/github.png';

export default function Integrantes() {
  return (
    <section className="text-center">
      <div className="titulo-integrantes mb-4">
        <h2 className="bg-gradient-to-r from-blue-800 via-blue-400 to-blue-800 text-transparent bg-clip-text text-4xl font-bold pb-2 pt-0">
          Integrantes
        </h2>
        <hr className="mt-1 mb-0 mx-auto w-[20%] border-t-2 border-gray-300" />
      </div>
      <div className="containerIntegrantes grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 p-5 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:grid-cols-1">
        <div className="integrante text-center p-5 border border-gray-300 shadow-md rounded-md transition-transform duration-200 transform hover:translate-y-[-10px] mx-5">
          <p className="mt-4 text-lg text-gray-800 font-bold">Ana Carolina de Castro Gonçalves</p>
          <Image src={anaImage} alt="Ana Carolina de Castro Gonçalves" className="w-full h-auto mb-2 rounded-full" />
          <p className="text-lg font-bold text-gray-600">RM: 554669</p>
        </div>
        <div className="integrante text-center p-5 border border-gray-300 shadow-md rounded-md transition-transform duration-200 transform hover:translate-y-[-10px] mx-5">
          <p className="mt-4 text-lg text-gray-800 font-bold">Gabriela Gomes Cezar</p>
          <Image src={gabrielaImage} alt="Gabriela Gomes Cezar" className="w-full h-auto mb-2 rounded-full" />
          <p className="text-lg font-bold text-gray-600">RM: 556941</p>
        </div>
        <div className="integrante text-center p-5 border border-gray-300 shadow-md rounded-md transition-transform duration-200 transform hover:translate-y-[-10px] mx-5">
          <p className="mt-4 text-lg text-gray-800 font-bold">Mateus De Castro Nappe</p>
          <Image src={mateusImage} alt="Mateus De Castro Nappe" className="w-full h-auto mb-2 rounded-full" />
          <p className="text-lg font-bold text-gray-600">RM: 556474</p>
        </div>
        <div className="repositorio text-center p-5 border border-gray-300 shadow-md rounded-md transition-transform duration-200 transform hover:translate-y-[-10px] mx-5">
          <p className="mt-4 text-lg text-gray-800 font-bold">Touch the cat!</p>
          <a href="https://github.com/mateuscastronappe/sprint4.git" target="_blank" rel="noopener noreferrer">
            <Image src={githubLogo} alt="GitHub Logo" className="w-full h-auto mb-2 rounded-full" />
          </a>
          <p className="text-lg font-bold text-gray-600">Veja nosso repositório</p>
        </div>
      </div>
    </section>
  );
}
