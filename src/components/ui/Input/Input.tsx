import React from 'react'

interface InputProps {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    placeholder: string;
    className?: string;
}

export default function Input({type, value, onChange, onKeyDown, placeholder, className}: InputProps): React.JSX.Element {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={className}
        />
    )
}
