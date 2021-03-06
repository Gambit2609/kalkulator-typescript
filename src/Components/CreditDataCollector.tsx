import React, { useState, useEffect } from 'react';
import CreditList from './CreditList';
import { CreditSummary } from './CreditSummary';
import { CreditItem, Validation } from '../DomainModel/Template';
import { UserInformation } from './UserInformation';

const creditTemplate: CreditItem = {
    creditInfo: "",
    creditAmount: 0,
    creditDuration: 0,
    rateOfInterest: 0,
    creditMonthlyPayment: 0,
    creditMonthlyPaymentAfterRateIncrease: 0,
    totalRateOfInterest: 0
};

function getCreditItemsFromStorage(): CreditItem[] {
    const creditItemsFromLocalStorage = localStorage.getItem("listOfCredits");
    const initialState = creditItemsFromLocalStorage ? JSON.parse(creditItemsFromLocalStorage) : [];

    return initialState;
}

export function CreditDataCollector() {
    const [creditLine, setCreditLine] = useState(creditTemplate);
    const [creditItems, setCreditItems] = useState<CreditItem[]>(getCreditItemsFromStorage);
    const [additionalInterestRate, setAdditionalInterestRate] = useState<number>(0);
    const [deactivateAddIntRateInput, setDeactivateAdditionalIntRateInput] = useState<boolean>(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, accessor: string): void {
        setCreditLine(prev => {

            let val: string | number;
            val = "valueAsNumber" in e.target ? e.target.valueAsNumber || 0 : e.target.value;
            let newCreditLine: CreditItem = { ...prev, [accessor]: val };
            const { rateOfInterest } = newCreditLine;
            newCreditLine.totalRateOfInterest = rateOfInterest + additionalInterestRate;
            newCreditLine.creditMonthlyPayment = countCreditMonthlyPayment(newCreditLine, additionalInterestRate, false);
            newCreditLine.creditMonthlyPaymentAfterRateIncrease = countCreditMonthlyPayment(newCreditLine, additionalInterestRate, true);

            return newCreditLine;
        });
    }

    function generateID() {
        return Math.floor(Math.random() * 10000);
    }

    function handleAddCredit() {
        let inputValidationPassed = validateCreditInformation(creditLine);
        if (inputValidationPassed) {
            clearValidationInput();
        } else {

            return;
        }
        if (!validateMonthlyPaymentCalculation(creditLine)) return;

        setCreditItems([...creditItems, { ...creditLine, id: generateID() }]);
        setCreditLine(prev => ({ ...prev, creditInfo: "", creditAmount: 0, creditDuration: 0, rateOfInterest: 0 }));
    }

    function handleRemoveCreditLine(creditData: CreditItem) {
        setCreditItems(prevState => prevState.filter(x => x !== creditData));
    }

    function validateCreditInformation(userCreditData: CreditItem): boolean {

        let validationSuccessfull = { success: true };
        userCreditData.creditAmount <= 0 && validationNegative("creditAmount", validationSuccessfull);
        userCreditData.creditAmount > 0 && validationPositive("creditAmount");
        userCreditData.creditDuration <= 0 && validationNegative("creditDuration", validationSuccessfull);
        userCreditData.creditDuration > 0 && validationPositive("creditDuration");
        userCreditData.rateOfInterest <= 0 && validationNegative("rateOfInterest", validationSuccessfull);
        userCreditData.rateOfInterest > 0 && validationPositive("rateOfInterest");
        userCreditData.creditInfo === "" && validationNegative("creditInfo", validationSuccessfull);
        userCreditData.creditInfo !== "" && validationPositive("creditInfo");

        return validationSuccessfull.success;
    }

    function validateMonthlyPaymentCalculation(userCreditData: CreditItem): boolean {
        let validationSuccessfull = true;

        if (Number.isNaN(userCreditData.creditMonthlyPayment)) {
            alert("Sprawd?? poprawno???? wprowadzonych danych, na tak?? rat?? nie by??o sta?? nawet Jeffa Bezosa przed rozwodem.");
            clearValidationInput();
            validationSuccessfull = false;
        } else if (userCreditData.rateOfInterest > 1500) {
            alert("Sprawd?? wprowadzone oprocentowanie kredytu. Nawet gangsterzy maj?? wi??cej empatii przy udzielaniu po??yczek.");
            clearValidationInput();
            validationSuccessfull = false;
        } else if (userCreditData.creditDuration > 1000) {
            alert("Sprawd?? wprowadzon?? ilo??c miesi??cy do zako??czenia kredytu. Wi??kszo???? z nas nie ??yje tak d??ugo.");
            clearValidationInput();
            validationSuccessfull = false;
        } else if (userCreditData.creditAmount > 10000000000) {
            alert("Sprawd?? kwot?? kapita??u pozosta??ego do sp??aty. Nawet kr??lowa El??bieta nie dosta??a by takiej po??yczki.")
            clearValidationInput();
            validationSuccessfull = false;
        }

        return validationSuccessfull;
    }


    function validationPositive(inputName: string): void {
        document.getElementById(inputName)!.style.boxShadow = "0px 1px 3px 0px green";
        document.getElementById(`${inputName}InvalidInputData`)!.style.opacity = "0";
    }

    function validationNegative(inputName: string, validationResult: Validation): void {
        document.getElementById(inputName)!.style.boxShadow = "0px 1px 3px 0px red";
        document.getElementById(`${inputName}InvalidInputData`)!.style.opacity = "1";

        validationResult.success = false;
    }

    function clearValidationInput(): void {
        let inputs = ["creditAmount", "creditDuration", "rateOfInterest", "creditInfo"];
        inputs.forEach(x => document.getElementById(x)!.style.boxShadow = "0px 1px 2px 0px");
    }

    function countCreditMonthlyPayment(credit: CreditItem, additionalRate: number, increasedRate: boolean): number {
        let additionalInterest = increasedRate ? additionalRate : 0;
        let rateOfInterest = 1 + (((credit.rateOfInterest + additionalInterest) || 0.01) / 100) / 12;
        let creditDuration = credit.creditDuration;
        let creditMonthlyPayment = credit.creditAmount * Math.pow(rateOfInterest, creditDuration) * ((rateOfInterest - 1) / (Math.pow(rateOfInterest, creditDuration) - 1));

        return creditMonthlyPayment;
    }

    function handleAdditionalInterestRate(e: React.ChangeEvent<HTMLInputElement>): void {
        if (e.target.valueAsNumber > 999){
            alert("Nawet Zimbabwe i Wenezuela mia??y wi??cej lito??ci dla swoich obywateli.")
            setAdditionalInterestRate(0);
        }else{
        setAdditionalInterestRate(e.target.valueAsNumber);
    }
    }

    useEffect(() => {
        setCreditItems(prev =>
            prev.map(credit => (
                {
                    ...credit,
                    totalRateOfInterest: credit.rateOfInterest + additionalInterestRate,
                    creditMonthlyPaymentAfterRateIncrease: countCreditMonthlyPayment(credit, additionalInterestRate, true),
                }))
        );


        setCreditLine(prev => ({ ...prev, totalRateOfInterest: prev.rateOfInterest + additionalInterestRate }))

    }, [additionalInterestRate])

    useEffect(() => {
        localStorage.setItem("listOfCredits", JSON.stringify(creditItems));
        if (creditItems.length) {
            setDeactivateAdditionalIntRateInput(false);
        } else {
            setDeactivateAdditionalIntRateInput(true);
            setAdditionalInterestRate(0);
        }
    }, [creditItems])

    return (
        <>
            <CreditSummary creditItems={creditItems} additionalInterestRate={additionalInterestRate} />

            <div className="credit-info-container">
                <div className="optionalOrRequired">Dane wymagane</div>
                <label htmlFor="creditInfo">Rodzaj zobowi??zania
                <UserInformation
                        description="Je??eli nie wiesz jaki rodzaj kredytu posiadasz zaznacz dowoln?? opcj??.
                         Nie wp??ywa ona na kalkulacj??, ma za zadanie tylko pom??c Ci w identyfikacji Twoich kredyt??w."
                        additionalClassName="creditInfoUserDescription"
                    />
                    <select id="creditInfo" value={creditLine.creditInfo} onChange={(e) => handleChange(e, "creditInfo")}>
                        <option value="">----</option>
                        <option value="consumer-loan">Kredyt got??wkowy</option>
                        <option value="mortgage">Kredyt hipoteczny</option>
                        <option value="investment-loan">Kredyt inwestycyjny</option>
                        <option value="consolidation-loan">Kredyt konsolidacyjny</option>
                        <option value="credit-card">Karta kredytowa</option>
                    </select>
                    <span id="creditInfoInvalidInputData" className="invalidInputData">!</span>
                </label>
                <label htmlFor="creditAmount">Kwota kapita??u pozosta??a do sp??aty
                    <UserInformation
                        description="Kwot?? kapita??u pozosta???? do sp??aty najlepiej odczyta?? z harmonogramu sp??at rat lub z systemu bankowego.
                        Wyst??puje najcz????ciej jako 'saldo kapita??u' lub 'kapita?? do sp??aty'.
                        Jest to kwota kt??ra pozosta??a do sp??aty bez uwzgl??dnienia odsetek."
                        additionalClassName="creditAmountUserDescription"
                    />
                    <input
                        id="creditAmount"
                        onChange={(e) => (handleChange(e, "creditAmount"))}
                        value={creditLine.creditAmount || ""}
                        type="number"
                    />
                    <span id="creditAmountInvalidInputData" className="invalidInputData">!</span>
                </label>
                <label htmlFor="creditDuration">Ilo???? miesi??cy do zako??czenia kredytu
                    <UserInformation
                        description="Ilo???? miesi??cy do zako??czenia kredytu mo??emy obliczy?? z harmonogramu sp??at rat lub poprzez sprawdzenie na umowie do kiedy obowi??zuje umowa po??yczki."
                        additionalClassName="creditDurationUserDescription"
                    />
                    <input
                        type="number"
                        onChange={(e) => handleChange(e, "creditDuration")}
                        value={creditLine.creditDuration || ""}
                        id="creditDuration"
                    />
                    <span id="creditDurationInvalidInputData" className="invalidInputData">!</span>
                </label>
                <label htmlFor="rateOfInterest">Aktualne oprocentowanie kredytu
                <UserInformation
                        description="Informacja na temat aktualnej stopy procentowej kredytu powinna by?? zamieszczona na harmonogranie sp??at rat poniewa?? banki s?? zobowi??zane do jej aktualizacji wraz ze zmian?? st??p procentowych.
                        Je??eli nie posiadamy harmonogramu to pozostaje nam jeszcze sprawdzenie w systemie bankowym lub poprzez telefon do oddzia??u."
                        additionalClassName="rateOfInterestUserDescription"
                    />
                    <input
                        type="number"
                        onChange={(e) => handleChange(e, "rateOfInterest")}
                        value={creditLine.rateOfInterest || ""}
                        id="rateOfInterest"
                    />
                    <span id="rateOfInterestInvalidInputData" className="invalidInputData">!</span>
                </label>
                <div className="optionalOrRequired">Dane opcjonalne:</div>
                <label htmlFor="additionalInterestRate">Zwi??ksz stop?? procentow??:
                    <UserInformation
                        description="Dodaj co najmniej jeden kredyt aby odblokowa?? mo??liwo???? zwi??kszania (lub zmniejszania) stopy procentowej. 
                        Po dodaniu kredytu nie musisz ju?? uzupe??nia?? danych jeszcze raz, wystarczy zmieni?? warto???? tego pola aby kredyt/y si?? przeliczy??y.
                        Je??eli chcesz sprawdzi?? warto???? w przedziale od 0,01 do 0,99 wpisz np ,21 lub ,05 czyli bez zera na pocz??tku."
                        additionalClassName="interestRateUserDescription"
                    />
                    <input
                        type="number"
                        onChange={handleAdditionalInterestRate}
                        value={additionalInterestRate || ""}
                        id="additionalInterestRate"
                        disabled={deactivateAddIntRateInput}
                    />
                </label>
                <div className="addCredit">
                    <button id="buttonAddCredit" onClick={handleAddCredit}>Dodaj kredyt</button>
                </div>
            </div>
            <CreditList
                creditItems={creditItems}
                removeCreditLine={handleRemoveCreditLine}
                additionalInterestRate={additionalInterestRate}
            />
        </>
    );
};