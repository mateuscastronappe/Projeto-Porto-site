const CPF_LENGTH = 11;
const CNPJ_LENGTH = 14;

const isRepeatedDigits = (num: string): boolean => /^(\d)\1{10}$/.test(num);

const calculateDigit = (numbers: string, weight: number): number => {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += parseInt(numbers.charAt(i)) * weight--;
        if (weight < 2) weight = 9;
    }
    return sum % 11 < 2 ? 0 : 11 - (sum % 11);
};

export const validarCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== CPF_LENGTH || isRepeatedDigits(cpf)) return false;

    const firstDigit = calculateDigit(cpf.substring(0, 9), 10);
    if (firstDigit !== parseInt(cpf.charAt(9))) return false;

    const secondDigit = calculateDigit(cpf.substring(0, 10), 11);
    return secondDigit === parseInt(cpf.charAt(10));
};

export const validarCNPJ = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== CNPJ_LENGTH) return false;

    const firstDigit = calculateDigit(cnpj.substring(0, 12), 5);
    if (firstDigit !== parseInt(cnpj.charAt(12))) return false;

    const secondDigit = calculateDigit(cnpj.substring(0, 13), 6);
    return secondDigit === parseInt(cnpj.charAt(13));
};

export const identificarEGuardarCPFouCNPJ = (input: string): void => {
    const cpfOuCnpj = input.replace(/[^\d]+/g, '');

    if (cpfOuCnpj.length === CPF_LENGTH && validarCPF(cpfOuCnpj)) {
        console.log('CPF válido:', cpfOuCnpj);
    } else if (cpfOuCnpj.length === CNPJ_LENGTH && validarCNPJ(cpfOuCnpj)) {
        console.log('CNPJ válido:', cpfOuCnpj);
    } else {
        console.log('Número inválido');
    }
};