export default function Home() {
  return (
    <>
      <div className=" conteudoProblema">
        <h1 className=" tituloHome">
          <span className="destacada">Problema</span>{" "}no seu veículo?
        </h1>
        <div className="textosDeEfeito">
          <p>
            Na Porto, adicionamos agilidade e tecnologia <br /> no seu processo de manutenção.
          </p>
          <a href="/pages/cadastro"className="botaoCadastro">Cadastre-se</a>
        </div>
      </div>
      <div className="conteudoPlanosHome">
        <div className="textosDeEfeito">
          <p>
            Tenha na palma da sua mão a solução para os <br />
            problemas em seu veículo.
          </p>
          <p className="planosHome">
            Planos a partir de R$19,90 <span className="textoMesHome">/mês</span>
          </p>
          <a href="/pages/planos"className="botaoPlano">Escolha seu plano</a>
        </div>
      </div>
    </>
  );
}
