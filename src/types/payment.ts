export type PaymentStep = 1 | 2 | 3 | 4 | 5;

export type MobileCarrier = 'M-PESA' | 'MTN MOMO' | 'Orange Money' | 'Airtel Money';

export type TransactionStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED';

export interface PaymentDetails {
  amount: number;
  cryptoAmount: number;
  phoneNumber: string;
  carrier: MobileCarrier | null;
  networkFee: number;
  orderId?: string;
  transactionDate?: Date;
  status?: TransactionStatus;
  errorMessage?: string;
  exchangeRate?: number;
  walletAddress?: string;
  businessName?: string;
  paymentReference?: string;
} 