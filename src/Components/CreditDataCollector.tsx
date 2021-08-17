import React, { useState, useEffect } from 'react';
import CreditList from './CreditList';
import { CreditSummary } from './CreditSummary';
import { CreditItem } from '../DomainModel/Template';

const creditTemplate: CreditItem = {
    creditInfo: "",
    creditAmount: 0,
    creditDuration: 0,
    rateOfInterest: 0,
    wiborRate: 0.21,
    creditMonthlyPayment: 0,
    creditMonthlyPaymentAfterRateIncrease: 0,
    totalRateOfInterest: 0
};

export function CreditDataCollector() {
    const [creditLine, setCreditLine] = useState(creditTemplate);
    const [creditItems, setCreditItems] = useState<CreditItem[]>(JSON.parse(localStorage.getItem("listOfCredits") || '[]'));
    const [additionalInterestRate, setAdditionalInterestRate] = useState<number>(0);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, accessor: string): void {
        setCreditLine(prev => {

            let val: string | number;
            val = "valueAsNumber" in e.target ? e.target.valueAsNumber || 0: e.target.value;
            let newCreditLine: CreditItem = { ...prev, [accessor]: val };
            const { rateOfInterest, wiborRate } = newCreditLine;
            newCreditLine.totalRateOfInterest = rateOfInterest + additionalInterestRate + wiborRate;
            newCreditLine.creditMonthlyPayment = countCreditMonthlyPayment(newCreditLine,additionalInterestRate, false);
            newCreditLine.creditMonthlyPaymentAfterRateIncrease = countCreditMonthlyPayment(newCreditLine,additionalInterestRate, true);

            return newCreditLine;
        });
    }

    function generateID() {
        return Math.floor(Math.random() * 10000);
    }

    function addCredit() {
        setCreditItems([...creditItems, { ...creditLine, id: generateID() }]);
        setCreditLine(prev=> ({...prev, creditInfo: "", creditAmount:0, creditDuration:0, rateOfInterest:0}));
    }

    function removeCreditLine(creditData: CreditItem) {
        setCreditItems(prevState => prevState.filter(x => x !== creditData));
    }

    function countCreditMonthlyPayment(credit: CreditItem, additionalRate:number, increasedRate: boolean): number {
        let additionalInterest = increasedRate? additionalRate :0;
        let rateOfInterest = 1 + ((credit.rateOfInterest + credit.wiborRate + additionalInterest) / 100) / 12;
        let creditDuration = credit.creditDuration;
        let creditMonthlyPayment = credit.creditAmount * Math.pow(rateOfInterest, creditDuration) * ((rateOfInterest - 1) / (Math.pow(rateOfInterest, creditDuration) - 1));

        return creditMonthlyPayment;
    }

    function handleAdditionalInterestRate(e:React.ChangeEvent<HTMLInputElement>):void {
        setAdditionalInterestRate(e.target.valueAsNumber);
    }

    useEffect(()=>{
        setCreditItems(prev=> {
            let newCreditItems = prev.map(credit=> {
                credit.totalRateOfInterest = credit.rateOfInterest + additionalInterestRate + credit.wiborRate;
                credit.creditMonthlyPaymentAfterRateIncrease = countCreditMonthlyPayment(credit, additionalInterestRate, true);

                return credit;
            });
            
            return newCreditItems;
        });

        setCreditLine(prev=> ({...prev, totalRateOfInterest: prev.rateOfInterest + prev.wiborRate + additionalInterestRate}))

    },[additionalInterestRate])

    useEffect(()=> {
        localStorage.setItem("listOfCredits", JSON.stringify(creditItems))
    },[creditItems])
    
    return (
        <>
        <CreditSummary creditItems={creditItems} additionalInterestRate={additionalInterestRate}/>
            <div className="credit-info-container">
                <label htmlFor="creditInfo">Rodzaj zobowiązania
                    <select id="creditInfo" value={creditLine.creditInfo} onChange={(e) => handleChange(e, "creditInfo")}>
                        <option value="">----</option>
                        <option value="consumer-loan">Kredyt konsumpcyjny</option>
                        <option value="mortgage">Kredyt hipoteczny</option>
                        <option value="investment-loan">Kredyt inwestycyjny</option>
                        <option value="consolidation-loan">Kredyt konsolidacyjny</option>
                        <option value="credit-card">Karta kredytowa</option>
                    </select>
                </label>
                <label htmlFor="creditAmount">Kwota kapitału pozostała do spłaty
                    <input id="creditAmount" onChange={(e) => (handleChange(e, "creditAmount"))} value={creditLine.creditAmount || ""} type="number" />
                </label>
                <label htmlFor="creditDuration">Ilość miesięcy do zakończenia kredytu
                    <input type="number" onChange={(e) => handleChange(e, "creditDuration")} value={creditLine.creditDuration || ""} id="creditDuration" />
                </label>
                <label htmlFor="rateOfInterest">Marża banku z umowy kredytowej
                    <input type="number" onChange={(e) => handleChange(e, "rateOfInterest")} value={creditLine.rateOfInterest || ""} id="rateOfInterest" />
                </label>
                <label htmlFor="additionalInterestRate">Wysokość stopy procentowej
                    <input type="number" onChange={handleAdditionalInterestRate} value={additionalInterestRate || ""} id="additionalInterestRate" />
                </label>
                <div className="addCreditButton">
                    <button onClick={addCredit}>Dodaj kredyt</button>
                </div>
            </div>

            <CreditList creditItems={creditItems} removeCreditLine={removeCreditLine} additionalInterestRate={additionalInterestRate}/>
        </>
    );
};