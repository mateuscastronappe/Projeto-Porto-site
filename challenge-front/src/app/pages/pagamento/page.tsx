"use client"
import React, { useState } from 'react';
import { 
  validatePaymentForm,
  isValidCardNumber,
  isValidExpiryDate,
  isValidCVV
} from '@/utils/validadorPagamento'; 

export default function Pagamento() {
  const [nome, setNome] = useState<string>('');
  const [numeroCartao, setNumeroCartao] = useState<string>('');
  const [validade, setValidade] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [valor, setValor] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      validatePaymentForm(nome, numeroCartao, validade, cvv, valor) &&
      isValidCardNumber(numeroCartao) &&
      isValidExpiryDate(validade) &&
      isValidCVV(cvv)
    ) {
      alert('Pagamento realizado com sucesso!');
      setError(null); 
    } else {
      setError('Por favor, preencha todos os campos corretamente.');
    }
  };

  return (
    <>
      <section className="pagamento">
        <h2>Área de Pagamento</h2>
        <form id="paymentForm" onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome Completo:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label htmlFor="numeroCartao">Número do Cartão:</label>
          <input
            type="text"
            id="numeroCartao"
            name="numeroCartao"
            value={numeroCartao}
            onChange={(e) => setNumeroCartao(e.target.value)}
            required
          />

          <label htmlFor="validade">Validade:</label>
          <input
            type="text"
            id="validade"
            name="validade"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
            required
            pattern="[0-9]{2}/[0-9]{2}"
          />

          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />

          <label htmlFor="valor">Valor:</label>
          <input
            type="number"
            id="valor"
            name="valor"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            required
          />

          <button type="submit">Pagar</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </section>
    </>
  );
}