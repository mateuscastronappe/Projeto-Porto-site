import ServiceCard from '../../../components/Cards/ServiceCard';
import trocaOleoImage from '@/img/troca-oleo.png';
import freiosImage from '@/img/freios.png';
import revisaoImage from '@/img/revisao.png';
import fundoAzul from '@/img/fundo-azul-sobre.png'; 

export default function Sobre() {
  return (
    <div>
      <div 
        className="fundoEfeito"
        style={{ backgroundImage: `url(${fundoAzul.src})`, width: '50%' }}>
        <div className="fraseEfeito">
          <h1>
            Faça da nossa IA <br />
            o seu porto seguro
            <br />
          </h1>
        </div>
      </div>

      <div>
        <h2 className="tituloObjetivo">Nosso Objetivo</h2>
      </div>
      <div className="textoObjetivo">
        <p>
          O objetivo é claro: garantir que cada peça e cada veículo recebam a atenção e o cuidado que merecem. Serviços de reparo e manutenção <br />
          que superam expectativas. Focamos na qualidade, eficiência e satisfação total do cliente, assegurando que seu carro esteja sempre pronto para rodar <br />
          com desempenho e segurança máximos.<br />
          Pensando nesse objetivo, criamos uma IA para identificar qual é o problema e constatar uma mecânica para sua resolução.
          Assim como, também, <br /> fornecedores de peças caso a mecânica não a tenha em um prazo considerável.
        </p>
      </div>

      <section className="services">
        <h2> Nossos Serviços</h2>
        <hr/>
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
