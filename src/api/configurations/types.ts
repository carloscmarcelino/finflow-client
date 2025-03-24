export type PaymentMethod = {
  id: string;
  name: string;
};

export type CreatePaymentMethodBody = {
  name: string;
};

export type CreateInvestmentTypeBody = {
  name: string;
};

export type InvestmentType = {
  id: string;
  name: string;
};

export type Bank = {
  id: string;
  name: string;
};

export type CreateBankBody = {
  name: string;
};
