import Link from 'next/link';

export default function Consultoria() {
  const cards = [
    { id: 1, title: 'Cliente', route: '/pages/cliente' },
    { id: 2, title: 'Veículo', route: '/pages/veiculo' },
    { id: 3, title: 'Oficina', route: '/pages/oficina' },
    { id: 4, title: 'Especialidade', route: '/pages/especialidade' },
    { id: 5, title: 'Serviço', route: '/pages/servico' },
    { id: 6, title: 'Orçamento', route: '/pages/orcamento' },
    { id: 7, title: 'Peça', route: '/pages/peca' },
    { id: 8, title: 'Mão de Obra', route: '/pages/mao-de-obra' },
    { id: 9, title: 'Apólice', route: '/pages/apolice' },
    { id: 10, title: 'Sinistro', route: '/pages/sinistro' },
  ];
  return (
    <div className="consultoria-container">
      <h1 className="consultoria-title">Consultoria</h1>
      <div className="consultoria-grid">
        {cards.map((card) => (
          <div key={card.id} className="consultoria-card">
            <h2 className="consultoria-card-title">{card.title}</h2>
            <Link href={card.route} className="consultoria-card-link">Consultar</Link>
          </div>
        ))}
      </div>
    </div>
  );
}