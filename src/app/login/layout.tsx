import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Log in',
}

export default function LogInLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {
                children
            }
        </>
    )
}
