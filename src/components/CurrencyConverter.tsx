import React, { useState } from 'react';
import CurrencyDropdown from './CurrencyDropdown';
import AmountInput, { InputPosition } from './AmountInput';
import Button from '@material-ui/core/Button';
import './CurrencyConverter.scss';
import { getConversionRates } from '../api/conversion';

const CurrencyConverter = () => {
    const [curr1, setCurr1] = useState('');
    const [curr2, setCurr2] = useState('');
    const [amount1, setAmount1] = useState(0);
    const [amount2, setAmount2] = useState(0);
    const [source, setSource] = useState('');
    const [finalAmount, setFinalAmount] = useState(0);

    const missingValues = !curr1 || !curr2 || (!amount1 && !amount2);
    const formEmpty = !curr1 && !curr2 && !amount1 && !amount2;

    const clearAllValues = () => {
        setCurr1('');
        setCurr2('');
        setAmount1(0);
        setAmount2(0);
        setSource('');
    };

    const handleConversion = async () => {
        const currencyToConvert = source === 'from' ? curr1 : curr2;
        const finalCurrency = source === 'from' ? curr2 : curr1;
        const amountToConvert = source === 'from' ? amount1 : amount2;
        const rates = await getConversionRates(currencyToConvert, finalCurrency);

        if (rates && rates.length) {
            const finalAmount = amountToConvert * (rates[1] / rates[0]);
            setFinalAmount(finalAmount);
        } else {
            setFinalAmount(0);
        }
    };

    const handleAmountChange = (amount: number, inputPosition: InputPosition) => {
        // When user makes a change to an input, this will become the source to convert against
        // The other input should be wiped before final calculation
        if (inputPosition !== source) {
            setSource(inputPosition);
            finalAmount > 0 && setFinalAmount(0);
        }
        if (inputPosition === 'from') {
            amount2 > 0 && setAmount2(0)
            setAmount1(amount);
        } else {
            amount1 > 0 && setAmount1(0)
            setAmount2(amount);
        }        
    };

    return (
        <div className="currencyConverter">
            <h1 className="currencyConverter__title">Currency Converter</h1>
            <div className="currencyConverter__inputs">
                <div className="currencyConverter__topContainer">
                    <CurrencyDropdown onChange={setCurr1} value={curr1} label="Source Currency" />
                    <AmountInput
                        onChange={handleAmountChange}
                        label="Source Amount"
                        inputPosition="from"
                        value={finalAmount && source === 'to' ? finalAmount : amount1}
                    />
                </div>
                <div className="currencyConverter__amountContainer">
                    <CurrencyDropdown onChange={setCurr2} value={curr2} label="Target Currency" />
                    <AmountInput
                        onChange={handleAmountChange}
                        label="Target Amount"
                        inputPosition="to"
                        value={finalAmount && source === 'from' ? finalAmount : amount2}
                    />
                </div>
            </div>
            <div className="currencyConverter__buttonContainer">
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    disabled={formEmpty}
                    onClick={clearAllValues}
                    style={{marginRight: 20}}
                >
                    Clear
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={missingValues}
                    onClick={handleConversion}
                >
                    Convert
                </Button>
            </div>
        </div>
    );
};

export default CurrencyConverter;
