import React from 'react';
import { CreditItem } from '../DomainModel/Template';

interface CreditProps {
    removeCreditLine: (creditData: CreditItem) => void;
    creditData: CreditItem;
}

export default function Credit({ creditData, removeCreditLine }: CreditProps) {

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
            <div className="creditDataLine">
                <div>Aktualna marża kredytu:{`${creditData.rateOfInterest + creditData.wiborRate}%`}</div>
                {creditData.additionalInterestRate ?<div>Marża z uwzględnieniem podwyżki stóp:{`${creditData.totalRateOfInterest}%`}</div>: null}
            </div>
            <div className="creditDataLine">Miesięczna rata kredytu:{`${creditData.creditMonthlyPayment.toFixed(2)}zł`}</div>
            <button onClick={() => removeCreditLine(creditData)}>Remove credit</button>
        </div>
    );
}
