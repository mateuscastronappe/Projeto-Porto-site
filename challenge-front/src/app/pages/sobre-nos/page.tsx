import ServiceCard from '../../../components/Cards/ServiceCard';
import trocaOleoImage from '@/img/troca-oleo.png';
import freiosImage from '@/img/freios.png';
import revisaoImage from '@/img/revisao.png';
import fundoAzul from '@/img/fundo-azul-sobre.png'; 

export default function Sobre() {
  return (
    <div>
      <div 
        className="grid grid-cols-2 row-start-1 shadow-lg mx-auto my-0 rounded-[30px] bg-center bg-no-repeat bg-cover min-h-[290px]"
        style={{ backgroundImage: `url(${fundoAzul.src})`, width: '50%' }} 
      >
        <div className="pt-[30%] pl-[3%] pr-0 pb-0 inline-flex text-[40px] text-left bg-gradient-to-l from-[#0060a0] via-[#b3b3b3] to-[#2e6f9b] bg-clip-text text-transparent">
          <h1>
            Faça da nossa IA <br />
            o seu porto seguro
            <br />
          </h1>
        </div>
      </div>

      <div>
        <h2 className="text-custom-gray pl-[21%] pt-[2%] text-[30px]">Nosso Objetivo</h2>
      </div>
      <div className="text-[19px] pl-[21%] mt-10">
        <p>
          O objetivo é claro: garantir que cada peça e cada veículo recebam a atenção e o cuidado que merecem. Serviços de reparo e manutenção <br />
          que superam expectativas. Focamos na qualidade, eficiência e satisfação total do cliente, assegurando que seu carro esteja sempre pronto para rodar <br />
          com desempenho e segurança máximos.<br />
          Pensando nesse objetivo, criamos uma IA para identificar qual é o problema e constatar uma mecânica para sua resolução.
          Assim como, também, <br /> fornecedores de peças caso a mecânica não a tenha em um prazo considerável.
        </p>
      </div>

      <section className="p-5 text-center">
        <h2 className="mt-[3%] text-[2em] bg-gradient-to-b from-[#67caf8] via-[#1a5ec5] to-[#67caf8] bg-clip-text text-transparent">
          Nossos Serviços
        </h2>
        <hr className="mt-0 mb-0 mx-auto w-[20%]" />
        <ServiceCard
          imageSrc={trocaOleoImage}
          altText="Troca de Óleo"
          title="Troca de Óleo"
          description="Manutenção essencial para o bom funcionamento do motor."
        />
        <ServiceCard
          imageSrc={freiosImage} 
          altText="Reparo de Freios"
          title="Reparo de Freios"
          description="Segurança em primeiro lugar. Verificamos e substituímos as pastilhas de freio."
        />
        <ServiceCard
          imageSrc={revisaoImage}
          altText="Revisão Completa"
          title="Revisão Completa"
          description="Verificação completa para garantir que seu carro está em perfeitas condições."
        />
      </section>
    </div>
  );
}
