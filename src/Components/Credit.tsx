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
        <div className={additionalInterestRate ? "creditDataLineExtended" : "creditData"}>

            <div className="creditDataLine">
                <div className="creditType">Rodzaj kredytu:</div>
                <div className="creditDataLineInterestUnchanged">{typeOfCreditToDisplay}</div>
            </div>
            <div className="creditDataLine">
                <div className="creditType">Kwota pozostała do spłaty:</div>
                <div className="creditDataLineInterestUnchanged">{`${creditData.creditAmount}zł`}</div>
            </div>
            <div className="creditDataLine">
                <div className="creditType">Ilość miesięcy do zakończenia kredytu:</div>
                <div className="creditDataLineInterestUnchanged">{creditData.creditDuration}</div>
            </div>
            <div className="creditDataLine rateOfInterest">
                <div className="creditType">Oprocentowanie kredytu:</div>
                <div className="creditDataLineInterestUnchanged">{`${(creditData.rateOfInterest + creditData.wiborRate).toFixed(2)}%`}</div>
            </div>
            <div className={additionalInterestRate ? "creditDataLine" : "creditDataLine last"}>
                <div className="creditType">Miesięczna rata kredytu:</div>
                <div className="creditDataLineInterestUnchanged">{`${creditData.creditMonthlyPayment.toFixed(2)}zł`}</div>
            </div>
            {additionalInterestRate ?
                <div className="creditDataLine">
                    <div className="creditType">Oprocentowanie z uwzględnieniem {additionalInterestRate > 0 ? "podwyżki": "obniżki"} stóp:</div>
                    <div className={additionalInterestRate > 0 ?
                        "creditDataLineInterestIncreased" :
                        "creditMonthlyPaymentAfterRateDecrease"}>
                        {`${creditData.totalRateOfInterest.toFixed(2)}%`}</div>
                </div>
                :
                null
            }

            {additionalInterestRate ?
                <div className="creditDataLine last">
                    <div className="creditType">Rata z uwzględnieniem {additionalInterestRate > 0 ? "podwyżki": "obniżki"} stóp:</div>
                    <div className={additionalInterestRate > 0 ?
                        "creditDataLineInterestIncreased" :
                        "creditMonthlyPaymentAfterRateDecrease"}>
                        {`${creditData.creditMonthlyPaymentAfterRateIncrease.toFixed(2)}zł`}</div>
                </div> :
                null
            }
            <label htmlFor="deleteCreditLine" className="deleteCreditLine">
                <input
                    id="deleteCreditLine"
                    type="image"
                    alt="Usuń kredyt"
                    src="/Images/trashCan.png"
                    width={25}
                    height={25}
                    onClick={() => removeCreditLine(creditData)} />
            </label>
        </div>
    );
}
