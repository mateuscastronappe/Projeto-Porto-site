"use client"
import Link from 'next/link';
import { validarCPF, validarCNPJ } from '@/utils/validador'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cpfOuCnpj = username.replace(/[^\d]+/g, '');

    const storedCpf = localStorage.getItem('cpf');
    const storedCnpj = localStorage.getItem('cnpj');

    
    const isValidCPF = validarCPF(cpfOuCnpj);
    const isValidCNPJ = validarCNPJ(cpfOuCnpj);

    if ((cpfOuCnpj === storedCpf && isValidCPF) || (cpfOuCnpj === storedCnpj && isValidCNPJ)) {
      setSuccessMessage('Login bem-sucedido!');
      setError(null);
      
      setUsername('');
      setTimeout(() => {
        router.push('/'); 
      }, 2000);
    } else {
      setError('Número inválido ou não cadastrado');
      setSuccessMessage(null);
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
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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