import React from 'react';
import { CreditItem } from "../DomainModel/Template";


interface CreditSummaryData {
    totalCreditAmount: number;
    totalCreditMonthlyPayment: number;
    averageRateOfIntereset: number;
    totalCreditMonthlyPaymentAfterIncrease: number;
    averageRateOfInteresetAfterIncrease:number
}

export function CreditSummary({ creditItems, additionalInterestRate }: { creditItems: CreditItem[], additionalInterestRate:number }) {

    let creditSummary = getCreditSummary(creditItems);

    function getCreditSummary(creditItems: CreditItem[]): CreditSummaryData {
        let totalCreditAmount = creditItems.reduce((acc, val) => acc += val.creditAmount, 0);
        let totalCreditMonthlyPayment = creditItems.reduce((acc, val) => acc += val.creditMonthlyPayment, 0);
        let averageRateOfIntereset = creditItems.reduce((acc, val) => acc += (val.rateOfInterest + val.wiborRate) / creditItems.length, 0);
        let averageRateOfInteresetAfterIncrease = creditItems.reduce((acc, val) => acc += (val.rateOfInterest + val.wiborRate + additionalInterestRate) / creditItems.length, 0);
        let totalCreditMonthlyPaymentAfterIncrease = creditItems.reduce((acc, val) => acc += val.creditMonthlyPaymentAfterRateIncrease, 0);

        return { totalCreditAmount, 
            totalCreditMonthlyPayment, 
            totalCreditMonthlyPaymentAfterIncrease, 
            averageRateOfIntereset, 
            averageRateOfInteresetAfterIncrease 
        };
    }


    return (
        <>
            <div className="creditSummary">
                <div className="creditSummaryItem">Łączne zobowiązanie:{`${creditSummary.totalCreditAmount.toFixed(2)}zł`}</div>
                <div className="creditSummaryItem">Suma rat kredytowych:{`${creditSummary.totalCreditMonthlyPayment.toFixed(2)}zł`}</div>
                <div className="creditSummaryItem">Uśrednione oprocentowanie kredytów:{creditSummary.averageRateOfIntereset.toFixed(2)}</div>
            </div>
            {additionalInterestRate && creditSummary.totalCreditMonthlyPaymentAfterIncrease ?
                <div className="creditSummary creditSummaryAfterRateIncrease">
                    <div className="creditSummaryItem">Łączne zobowiązanie:{`${creditSummary.totalCreditAmount.toFixed(2)}zł`}</div>
                    <div className="creditSummaryItem">Suma rat kredytowych:{`${creditSummary.totalCreditMonthlyPaymentAfterIncrease.toFixed(2)}zł`}</div>
                    <div className="creditSummaryItem">Uśrednione oprocentowanie kredytów:{creditSummary.averageRateOfInteresetAfterIncrease.toFixed(2)}</div>
                </div> :
                null
            }
        </>
    );
}


