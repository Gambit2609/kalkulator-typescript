import React from 'react';
import './App.css';
import { CreditDataCollector } from './Components/CreditDataCollector';
import { Welcome } from './Components/Welcome';

export function App() {
  return (
    <div className="creditMainPage">
        <Welcome />
        <CreditDataCollector/>
     </div>
  );
}
