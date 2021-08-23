export interface CreditItem {
    creditInfo: string;
    creditAmount: number;
    creditDuration: number;
    creditMonthlyPayment: number;
    creditMonthlyPaymentAfterRateIncrease: number;
    rateOfInterest: number;
    wiborRate: number;
    totalRateOfInterest: number,
    id?: number;
}

export interface Validation {
    success: boolean;
}
