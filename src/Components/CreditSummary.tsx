import React from 'react';
import { CreditItem } from "../DomainModel/Template";

interface CreditSummaryData {
    totalCreditAmount: number;
    totalCreditMonthlyPayment: number;
    averageRateOfIntereset: number;
}

export function CreditSummary({ creditItems }: { creditItems: CreditItem[] }) {

    let creditSummary = getCreditSummary(creditItems);
    
    function getCreditSummary(creditItems: CreditItem[]) : CreditSummaryData {
        let totalCreditAmount = creditItems.reduce((acc, val) => acc += val.creditAmount, 0);
        let totalCreditMonthlyPayment = creditItems.reduce((acc, val) => acc += val.creditMonthlyPayment, 0);
        let averageRateOfIntereset = creditItems.reduce((acc, val) => acc += (val.rateOfInterest + val.wiborRate) / creditItems.length, 0);
            
        return { totalCreditAmount, totalCreditMonthlyPayment, averageRateOfIntereset };
    }

    
    return (
        <div className="creditSummary">
            <div className="creditSummaryItem">Łączne zobowiązanie:{`${creditSummary.totalCreditAmount}zł`}</div>
            <div className="creditSummaryItem">Suma rat kredytowych:{`${creditSummary.totalCreditMonthlyPayment.toFixed(2)}zł`}</div>
            <div className="creditSummaryItem">Uśrednione oprocentowanie kredytów:{creditSummary.averageRateOfIntereset.toFixed(2)}</div>
        </div>
    );
}


