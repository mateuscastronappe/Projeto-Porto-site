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
    <div className=" planosCard text-center p-5 border border-gray-300 rounded-md shadow-md my-[3%] mx-[10%]" id={id}>
      <h1 className=' titulo text-[30px]'>{title}</h1>
      <div className=" beneficios text-left pl-[38%] font-normal text-[20px]">
        <ul>
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
      <div className="preco text-[30px] font-medium">
        <p>R$ {price} <span className="mes font-normal text-[rgb(92,92,92)]">/mês</span></p>
      </div>
      <Link href="/pages/pagamento" onClick={onSelectPlan} className='assinar'>
      Assinar</Link>
    </div>
  );
};

export default PlanoCard;