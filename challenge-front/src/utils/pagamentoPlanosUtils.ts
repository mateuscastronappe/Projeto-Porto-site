
export const selectPlan = (
  plan: string,
  setSelectedPlan: (plan: string) => void,
  setShowPaymentSection: (show: boolean) => void
) => {
  const planNames: { [key: string]: string } = {
    silver: 'Silver',
    gold: 'Gold',
    diamond: 'Diamond'
  };

  
  setSelectedPlan(planNames[plan]);

  
  setShowPaymentSection(true);
};