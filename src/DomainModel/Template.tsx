import { TypeOfTag } from "typescript";

export interface CreditItem {
    creditInfo: string;
    creditAmount: number;
    creditDuration: number;
    creditMonthlyPayment: number;
    rateOfInterest: number;
    wiborRate: number;
    additionalInterestRate: number,
    totalRateOfInterest: number,
    id?: number;
}
