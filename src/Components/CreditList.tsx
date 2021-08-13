import { CreditItem } from '../DomainModel/Template';
import Credit from './Credit'

interface CreditListProps {
    creditItems: CreditItem[];
    removeCreditLine: (creditData: CreditItem) => void;
}

export default function CreditList({ creditItems, removeCreditLine }: CreditListProps) {

    return (
        <div className="creditList">
            {creditItems.map(credit =>
                <Credit
                    key={credit.id}
                    creditData={credit}
                    removeCreditLine={removeCreditLine}
                />)}
        </div>
    );
}
