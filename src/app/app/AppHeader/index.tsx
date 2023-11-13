"use client";
import TextInput from '@/components/TextInput';
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdCalendarMonth, MdChevronLeft, MdNotifications, MdSearch } from 'react-icons/md'

export default function AppHeader() {
    const { user } = useAuth();
    const [searchValue, setSearchValue] = React.useState("");

    return (
        <header>
            <div className="wrapper flex items-center justify-between gap-8 py-4 md:py-12">
                <div className='hidden md:flex items-center bg-takify-light_silver rounded-lg'>
                    <div className='flex items-center justify-center pl-4'>
                        <MdSearch className="text-2xl text-takify-dark_grey" />
                    </div>
                    <TextInput
                        type='text'
                        label='Search'
                        onChange={(value) => setSearchValue(value as string)}
                        value={searchValue}
                    />
                </div>

                <div className='md:hidden'>
                    <div className='flex justify-center'>
                        <Link href="/app" className='flex items-center gap-2'>
                            {/* <Image src="/assets/images/takify.png" alt="Takify" width={60} height={60} /> */}
                            <h3 className='text-xl font-semibold'>Takify</h3>
                        </Link>
                    </div>
                </div>

                <div className='flex items-center gap-8'>
                    <div className='flex items-center gap-4'>
                        <button>
                            <MdCalendarMonth className="text-xl" />
                        </button>
                        <button>
                            <MdNotifications className="text-xl" />
                        </button>
                    </div>
                    <div className='flex gap-2 cursor-pointer'>
                        <div className='flex-1'>
                            <Image
                                src={user?.photo_url || '/assets/images/avatar.jpg'} alt="Avatar"
                                width={40}
                                height={40}
                                className="rounded-full min-w-[40px] aspect-square" />
                        </div>

                        <div className='hidden md:flex items-center gap-4'>
                            <div className='flex flex-col text-sm'>
                                <span className='font-bold'>{user?.display_name || user?.email.split('@')[0]}</span>
                                <span className='opacity-80'>{user?.email}</span>
                            </div>

                            <div className='-rotate-90'>
                                <MdChevronLeft className="text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
