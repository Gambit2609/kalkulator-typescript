export interface CreditItem {
    [index: string]: number| string | undefined;
    creditInfo: string;
    creditAmount: number;
    creditDuration: number;
    creditMonthlyPayment: number;
    creditMonthlyPaymentAfterRateIncrease: number;
    rateOfInterest: number;
    totalRateOfInterest: number,
    id?: number;
}

export interface Validation {
    success: boolean;
}
