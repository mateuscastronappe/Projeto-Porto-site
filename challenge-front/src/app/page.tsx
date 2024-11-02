export default function Home() {
  return (
    <>
      <div className="bg-[#fcfeff] shadow-md text-center mx-[20%] py-5 rounded-lg mt-2">
        <h1 className="text-[26px]">
          <span className="bg-gradient-to-r from-[#0261ab] to-[#0099ff] bg-clip-text text-transparent">
            Problema
          </span>{" "}
          no seu veículo?
        </h1>
        <div className="mt-2 font-normal text-[30px] inline-block">
          <p>
            Na Porto, adicionamos agilidade e tecnologia <br /> no seu processo de manutenção.
          </p>
          <a
            href="/cadastro"
            className="border-none text-white py-[16px] px-[24px] text-[30px] mt-1 mb-4 inline-block rounded-[18px] bg-gradient-to-r from-[#0261ab] to-[#0099ff] cursor-pointer"
          >
            Cadastre-se
          </a>
        </div>
      </div>
      <div className="bg-[#fcfeff] shadow-md text-center mx-[20%] mt-1 mb-2 py-5 rounded-lg">
        <div className="mt-2 font-normal text-[20px]">
          <p>
            Tenha na palma da sua mão a solução para os <br />
            problemas em seu veículo.
          </p>
          <p className="text-[40px] text-[#0064FF] font-bold mt-5">
            Planos a partir de R$19,90 <span className="font-light text-[#0064FF]">/mês</span>
          </p>
          <a
            href="/pages/planos"
            className="border-none text-white py-[15px] px-[20px] text-[30px] rounded-[18px] bg-[#00AEEF] cursor-pointer inline-block text-center transition duration-300 hover:bg-[#0099cc] mt-4"
          >
            Escolha seu plano
          </a>
        </div>
      </div>
    </>
  );
}
