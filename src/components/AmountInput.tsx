import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import './AmountInput.scss';

export type InputPosition =
    | 'from'
    | 'to';
interface AmountInputProps {
    onChange(value: number, inputPosition: InputPosition): void;
    label: string;
    inputPosition: InputPosition;
    value: number;
}

const AmountInput = ({ onChange, label, inputPosition, value }: AmountInputProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const amount = parseFloat(event.target.value);
        onChange(amount, inputPosition);
    };

    return (
        <>
            <div className="amountInput">
                <label className="amountInput__label">{label}</label>
                <TextField
                    variant="outlined"
                    type="number"
                    onChange={handleChange}
                    inputProps={{ min: "0", step: "0.01" }}
                    value={value.toString()}
                />
            </div>
        </>
    );
};

export default AmountInput;