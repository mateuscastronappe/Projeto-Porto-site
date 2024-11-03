"use client"
import PlanoCard from '@/components/Cards/Plano'; 
import { selectPlan } from '@/utils/pagamentoPlanosUtils';
import { useState } from 'react';

const PlanosEPrecos = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPaymentSection, setShowPaymentSection] = useState<boolean>(false);

  const handleSelectPlan = (plan: string) => {
    selectPlan(plan, setSelectedPlan, setShowPaymentSection);
  };
  return (
    <>
      <div>
        <div className="containerPlanos">
          <div className="planos">
            <h1 className="titulo-escolha">Escolha o Plano Ideal Para Você</h1>
            {/* Silver Plan */}
            <PlanoCard
              id="silver-plan"
              title="Silver"
              benefits={[
                'Anúncios',
                'Acesso aos Mecânicos',
                'Consultoria em dias úteis'
              ]}
              price="19,90"
              onSelectPlan={() => handleSelectPlan('silver')}
            />
            
            {/* Gold Plan */}
            <PlanoCard
              id="gold-plan"
              title="Gold"
              benefits={[
                'Sem Anúncios',
                'Acesso aos Mecânicos',
                'Consultoria 24h',
                'Desconto em peças'
              ]}
              price="29,90"
              onSelectPlan={() => handleSelectPlan('gold')}
            />
            
            {/* Diamond Plan */}
            <PlanoCard
              id="diamond-plan"
              title="Diamond"
              benefits={[
                'Sem Anúncios',
                'Acesso aos Mecânicos',
                'Consultoria 24h',
                'Fale com Fornecedores'
              ]}
              price="39,90"
              onSelectPlan={() => handleSelectPlan('diamond')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanosEPrecos;
