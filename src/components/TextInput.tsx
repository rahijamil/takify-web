import React from 'react'

export default function TextInput({value, onChange, label, type}: {value: string | number, onChange: (value: string | number) => void, label: string, type: 'number' | 'text' | 'datetime-local' | 'file'}) {
    return (
        <input
            type={type}
            placeholder={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full py-3 px-4 border-b border-takify-light_grey bg-takify-light_silver placeholder-takify-dark_grey focus:outline-none rounded-lg"
        />
    )
}
