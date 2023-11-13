import Link from 'next/link'
import React from 'react'
import { MdStackedLineChart } from 'react-icons/md'

export default function Logo({ href, hideNav, forApp }: { href: string, hideNav?: boolean, forApp?: boolean }) {
    return (
        <Link href={href} className={`flex items-center gap-2 ${hideNav ? "text-white" : forApp ? "text-takify-dark_grey" : "text-takify-deep_blue"}`}>
            <MdStackedLineChart className="text-2xl" />

            <h1 className="font-semibold text-lg">Takify</h1>
        </Link>
    )
}
