import React, { ChangeEvent } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { currencies } from '../constants';
import './CurrencyDropdown.scss';

interface CurrencyDropdownProps {
    onChange(value: string): void;
    value: string;
    label: string;
}

const CurrencyDropdown = ({ onChange, value, label }: CurrencyDropdownProps) => {
    const handleChange = (
        event: ChangeEvent<{
            name?: string | undefined;
            value: unknown;
        }>
    ) => {
        onChange(event.target.value as string);
    };

    return (
        <div className="currencyDropdown">
            <label className="currencyDropdown__label">{label}:</label>
            <Select
                value={value}
                onChange={handleChange}
                style={{width: 150}}
                variant="outlined"
            >
                {currencies.map((currency) => (
                    <MenuItem key={currency} value={currency}>
                        {currency}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default CurrencyDropdown;