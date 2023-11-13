import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdChevronLeft, MdStackedLineChart } from 'react-icons/md'
import { HeaderItems } from './HeaderItem'
import Button from '@/components/Button'
import Logo from '@/components/Logo'

export default function HomeHeader({ hideNav }: { hideNav?: boolean }) {
    return (
        <header className={`${hideNav && "bg-gradient-to-r from-takify-deep_blue to-takify-sky_blue"}`}>
            <div className='w-11/12 mx-auto py-2 flex items-center justify-between gap-8'>
                <div className='flex items-center gap-4'>
                    <Logo href='/' hideNav={hideNav} />

                    {
                        !hideNav && (
                            <nav>
                                <ul className='flex items-center'>
                                    {
                                        HeaderItems.map((item) => (
                                            <li className='relative group' key={item.id}>
                                                <Link href={item.pathName} className='flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-takify-light_silver'>
                                                    <span>{item.name}</span>
                                                    {
                                                        item.children && (
                                                            <MdChevronLeft className="-rotate-90 text-base" />
                                                        )
                                                    }
                                                </Link>

                                                {
                                                    item.children && (
                                                        <div className='absolute top-full left-0 w-48 bg-white border border-takify-light_silver hidden group-hover:block rounded-lg overflow-hidden p-2 shadow-md'>
                                                            <ul>
                                                                {
                                                                    item.children.map((child) => (
                                                                        <li key={child.id}>
                                                                            <Link href={child.pathName} className='flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-takify-light_silver'>
                                                                                {child.name}
                                                                            </Link>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    )
                                                }
                                            </li>
                                        ))
                                    }
                                </ul>
                            </nav>
                        )
                    }
                </div>
                <div>
                    {
                        !hideNav && (
                            <nav>
                                <ul className='flex items-center gap-2'>
                                    <li>
                                        <Link href="/login" className='hover:bg-takify-light_silver py-3 px-6 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-takify-dark_blue focus:outline-none'>
                                            Log in
                                        </Link>
                                    </li>
                                    <li>
                                        <Button href='/signup'>
                                            Join Now
                                        </Button>
                                    </li>
                                </ul>
                            </nav>
                        )
                    }
                </div>
            </div>
        </header>
    )
}
