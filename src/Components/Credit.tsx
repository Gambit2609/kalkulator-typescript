import React from 'react';
import { CreditItem } from '../DomainModel/Template';

interface CreditProps {
    removeCreditLine: (creditData: CreditItem) => void;
    creditData: CreditItem;
    additionalInterestRate: number;
}

export default function Credit({ creditData, removeCreditLine, additionalInterestRate }: CreditProps) {

    const typeOfCredit = creditData.creditInfo;
    let typeOfCreditToDisplay;
    switch (typeOfCredit) {
        case "consumer-loan":
            typeOfCreditToDisplay = "Kredyt konsumpcyjny";
            break;
        case "mortgage":
            typeOfCreditToDisplay = "Kredyt hipoteczny";
            break;
        case "investment-loan":
            typeOfCreditToDisplay = "Kredyt inwestycyjny";
            break;
        case "consolidation-loan":
            typeOfCreditToDisplay = "Kredyt konsolidacyjny";
            break;
        case "credit-card":
            typeOfCreditToDisplay = "Karta kredytowa";
            break;
    }

    return (
        <div className="creditData">
            <div className="creditDataLine">Rodzaj kredytu:{typeOfCreditToDisplay}</div>
            <div className="creditDataLine">Kwota pozostała do spłaty:{`${creditData.creditAmount}zł`}</div>
            <div className="creditDataLine">Ilość miesięcy do zakończenia kredytu:{creditData.creditDuration}</div>
            <div className="creditDataLine rateOfInterest">
                {additionalInterestRate ?
                    <div>Marża z uwzględnieniem podwyżki stóp:{`${creditData.totalRateOfInterest.toFixed(2)}%`}</div> :
                    <div>Marża kredytu:{`${(creditData.rateOfInterest + creditData.wiborRate).toFixed(2)}%`}</div>
                }
            </div>
            <div className="creditDataLine">
                {additionalInterestRate ?
                    <div>Miesięczna rata kredytu z uwzględnieniem podwyżki stóp:{`${creditData.creditMonthlyPaymentAfterRateIncrease.toFixed(2)}zł`}</div> :
                    <div>Miesięczna rata kredytu:{`${creditData.creditMonthlyPayment.toFixed(2)}zł`}</div>
                }
            </div>
            <button onClick={() => removeCreditLine(creditData)}>Remove credit</button>
        </div>
    );
}
