import Link from 'next/link';

interface PlanoCardProps {
  id: string;
  title: string;
  benefits: string[];
  price: string;
  onSelectPlan:() => void;
}

const PlanoCard = ({ id, title, benefits, price, onSelectPlan }: PlanoCardProps) => {
  return (
    <div className=" planosCard" id={id}>
      <h1 className=' tituloPlano'>{title}</h1>
      <div className=" beneficios">
        <ul>
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
      <div className="preco">
        <p>R$ {price} <span className="mes">/mês</span></p>
      </div>
      <Link href="/pages/pagamento" onClick={onSelectPlan} className='assinar'>
      Assinar</Link>
    </div>
  );
};

export default PlanoCard;