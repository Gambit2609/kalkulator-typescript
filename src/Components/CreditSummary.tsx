import React from 'react';
import { CreditItem } from "../DomainModel/Template";


interface CreditSummaryData {
    totalCreditAmount: number;
    totalCreditMonthlyPayment: number;
    averageRateOfIntereset: number;
    totalCreditMonthlyPaymentAfterIncrease: number;
    averageRateOfInteresetAfterIncrease: number;
    differenceInMonthlyPayments: number;
    totalCreditAmountWithInterest: number;
    totalCreditAmountWithAdditionalInterest: number;
    differenceInCreditAmountWithInterest: number;


}

export function CreditSummary({ creditItems, additionalInterestRate }: { creditItems: CreditItem[], additionalInterestRate: number }) {

    let creditSummary = getCreditSummary(creditItems);

    function getCreditSummary(creditItems: CreditItem[]): CreditSummaryData {
        let totalCreditAmount = creditItems.reduce((acc, val) => acc += val.creditAmount, 0);
        let totalCreditMonthlyPayment = creditItems.reduce((acc, val) => acc += val.creditMonthlyPayment, 0);
        let averageRateOfIntereset = creditItems.reduce((acc, val) => acc += (val.rateOfInterest + val.wiborRate) / creditItems.length, 0);
        let averageRateOfInteresetAfterIncrease = creditItems.reduce((acc, val) => acc += (val.rateOfInterest + val.wiborRate + additionalInterestRate) / creditItems.length, 0);
        let totalCreditMonthlyPaymentAfterIncrease = creditItems.reduce((acc, val) => acc += val.creditMonthlyPaymentAfterRateIncrease, 0);
        let differenceInMonthlyPayments = totalCreditMonthlyPaymentAfterIncrease - totalCreditMonthlyPayment;
        let totalCreditAmountWithInterest = creditItems.reduce((acc,val)=> acc += val.creditMonthlyPayment * val.creditDuration, 0);
        let totalCreditAmountWithAdditionalInterest = creditItems.reduce((acc,val)=> acc += val.creditMonthlyPaymentAfterRateIncrease * val.creditDuration, 0);
        let differenceInCreditAmountWithInterest = totalCreditAmountWithAdditionalInterest - totalCreditAmountWithInterest;

        return {
            totalCreditAmount,
            totalCreditMonthlyPayment,
            totalCreditMonthlyPaymentAfterIncrease,
            averageRateOfIntereset,
            averageRateOfInteresetAfterIncrease,
            differenceInMonthlyPayments,
            totalCreditAmountWithInterest,
            totalCreditAmountWithAdditionalInterest,
            differenceInCreditAmountWithInterest
        };
    }


    return (
        <div className="creditSummaryContainer">
            <div className="creditSummary">
                <div className="creditSummaryItem">Łączne zobowiązanie:{`${creditSummary.totalCreditAmount.toFixed(2)}zł`}</div>
                <div className="creditSummaryItem">Suma rat kredytowych:{`${creditSummary.totalCreditMonthlyPayment.toFixed(2)}zł`}</div>
                <div className="creditSummaryItem">Uśrednione oprocentowanie kredytów:{
                    creditSummary.averageRateOfIntereset === 0.21 ? 0 : 
                    `${(creditSummary.averageRateOfInteresetAfterIncrease || creditSummary.averageRateOfIntereset).toFixed(2)}%`}</div>
            </div>
            <div className={additionalInterestRate && creditSummary.totalCreditMonthlyPayment?
                 "creditSummary" : 
                 "creditSummaryBeforeRateIncrase"}>
                <div className={creditSummary.differenceInMonthlyPayments >= 0 ?
                    "creditSummaryItem overpay" :
                    "creditSummaryItem underpay"}>
                    {`${creditSummary.differenceInMonthlyPayments.toFixed(2)}zł`}
                </div>
                <div className="creditSummaryItem">Suma rat kredytowych:<span>{`${creditSummary.totalCreditMonthlyPaymentAfterIncrease.toFixed(2)}zł`}</span></div>
                <div className="creditSummaryItem">Dodatkowa kwota odsetek:{`${creditSummary.differenceInCreditAmountWithInterest.toFixed(2)}zł`}</div>
            </div>
        </div>
    );
}


