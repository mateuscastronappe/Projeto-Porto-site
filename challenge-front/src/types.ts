export type Cliente = {
    codigo: number;
    nome: string;
    cpf: string;
    email: string;
    dataDeNascimento: string;
}

export type Veiculo = {
    codigo: number;
    placa: string;
    modelo: string;
    cor: string;
    dataDeFabricacao: string;
}

export type Oficina = {
    codigo: number;
    nomeDaOficina: string;
    enderecoDaOficina: string;
}

export type Especialidade = {
    codigo: number;
    descricaoDaEspecialidade: string;
}

export type Servico = {
    codigo: number;
    descricaoDoServico: string;
    valorDoServico: number;
}

export type Orcamento = {
    codigo: number;
    quantidadeDePeca: number;
    valorDoOrcamento: number;
    horasTrabalhadas: number;
}

export type Peca = {
    codigo: number;
    nomeDaPeca: string;
    valorUnitario: number;
}

export type MaoDeObra = {
    codigo: number;
    descricaoMaoDeObra: string;
    valorHora: number;
}

export type Apolice = {
    codigo: number;
    tipoDeCobertura: string;
    valorSegurado: number;
    dataEmissao: string;
}

export type Sinistro = {
    codigo: number;
    descricaoDoSinistro: string;
    valorDoSinistro: number;
    dataDoSinistro: string;
}