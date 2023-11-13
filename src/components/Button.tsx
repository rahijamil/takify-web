import Link from 'next/link'
import React from 'react'

export default function Button({ children, onClick, href, className }: { children: React.ReactNode, onClick?: () => void, href?: string, className?: string }) {
    return (
        <>
            {
                href ? (
                    <Link
                        className={`bg-takify-deep_blue hover:bg-takify-sky_blue text-white py-3 px-6 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-takify-dark_blue focus:outline-none text-center flex items-center justify-center gap-2 ${className}`}
                        href={href}
                    >
                        {children}
                    </Link>
                ) : (
                    <button
                        className={`bg-takify-deep_blue hover:bg-takify-sky_blue text-white py-3 px-6 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-takify-dark_blue focus:outline-none text-center flex items-center justify-center gap-2 ${className}`}
                        onClick={onClick}
                    >
                        {children}
                    </button>
                )
            }
        </>
    )
}
