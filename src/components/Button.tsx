import Link from 'next/link'
import React from 'react'

export default function Button({ children, onClick, href, target, className, variant }: { children: React.ReactNode, onClick?: () => void, href?: string, className?: string, variant?: "danger", target?: "_blank" }) {
    return (
        <>
            {
                href ? (
                    <Link
                    className={`${variant == "danger" ? "bg-red-600 hover:bg-red-500" : "bg-takify-deep_blue hover:bg-takify-sky_blue"} text-white py-3 px-6 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-takify-dark_blue focus:outline-none text-center flex items-center justify-center gap-2 ${className}`}
                        href={href}
                        target={target}
                    >
                        {children}
                    </Link>
                ) : (
                    <button
                        className={`${variant == "danger" ? "bg-red-600 hover:bg-red-500" : "bg-takify-deep_blue hover:bg-takify-sky_blue"} text-white py-3 px-6 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-takify-dark_blue focus:outline-none text-center flex items-center justify-center gap-2 ${className}`}
                        onClick={onClick}
                    >
                        {children}
                    </button>
                )
            }
        </>
    )
}
