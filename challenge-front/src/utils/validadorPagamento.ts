export const validatePaymentForm = (
    nome: string,
    numeroCartao: string,
    validade: string,
    cvv: string,
    valor: number
  ): boolean => {
    
    return (
      nome.trim() !== '' &&
      numeroCartao.trim() !== '' &&
      validade.trim() !== '' &&
      cvv.trim() !== '' &&
      valor > 0
    );
  };
  
  export const isValidCardNumber = (cardNumber: string): boolean => {
   
    return /^[0-9]{16}$/.test(cardNumber.replace(/\s+/g, ''));
  };
  
  export const isValidExpiryDate = (expiryDate: string): boolean => {
    
    return /^[0-9]{2}\/[0-9]{2}$/.test(expiryDate);
  };
  
  export const isValidCVV = (cvv: string): boolean => {
    
    return /^[0-9]{3,4}$/.test(cvv);
  };