"use client"
import Link from 'next/link';
import { validarCPF, validarCNPJ } from '@/utils/validador'; 
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cpfOuCnpj = username.replace(/[^\d]+/g, '');

    if (cpfOuCnpj.length === 11 && validarCPF(cpfOuCnpj)) {
      console.log('CPF válido:', cpfOuCnpj);
    } else if (cpfOuCnpj.length === 14 && validarCNPJ(cpfOuCnpj)) {
      console.log('CNPJ válido:', cpfOuCnpj);
    } else {
      setError('Número inválido');
    }
  };

  return (
    <>
      <div className="form-cadastro">
        <div className="textoCadastroLogin">
          <h1>Acesso à Conta</h1>
          <p>Preencha seus dados de acesso</p>
          <form id="loginForm" onSubmit={handleSubmit}>
            <label htmlFor="username">CPF ou CNPJ</label><br />
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /><br />
            <button type="submit">Entrar</button>
            <div>
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                value="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe">Lembrar-me</label>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
              Não tem uma conta?{' '}
              <Link href="/pages/cadastro">
                <span className="facaLoginCadastro">Cadastre-se</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}