import { CreditItem } from '../DomainModel/Template';
import Credit from './Credit';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../App.css';


interface CreditListProps {
    creditItems: CreditItem[];
    removeCreditLine: (creditData: CreditItem) => void;
    additionalInterestRate: number;
}



export default function CreditList({ creditItems, removeCreditLine, additionalInterestRate }: CreditListProps) {

    return (
        <div className="creditList">
            <TransitionGroup className="transitionGroup">
            {creditItems.map(credit =>
                <CSSTransition key={credit.id} in={true} timeout={700} classNames="credit">
                    <Credit
                        additionalInterestRate={additionalInterestRate}
                        key={credit.id}  
                        creditData={credit}
                        removeCreditLine={removeCreditLine}
                    />
                </CSSTransition>
            )}
            </TransitionGroup>
        </div>
    );
}
