import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

export default function Button({ children, onClick, className, disabled, type }: ButtonProps) {
    return (
        <button type={type} onClick={onClick} className={className} disabled={disabled}>
            {children}
        </button>
    )
}
