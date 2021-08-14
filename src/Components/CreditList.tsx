import { CreditItem } from '../DomainModel/Template';
import Credit from './Credit'

interface CreditListProps {
    creditItems: CreditItem[];
    removeCreditLine: (creditData: CreditItem) => void;
    additionalInterestRate: number;
}



export default function CreditList({ creditItems, removeCreditLine,additionalInterestRate }: CreditListProps) {
    console.log(creditItems)
    return (
        <div className="creditList">
            {creditItems.map(credit =>
                <Credit
                    additionalInterestRate={additionalInterestRate}
                    key={credit.id}
                    creditData={credit}
                    removeCreditLine={removeCreditLine}
                />)}
        </div>
    );
}
