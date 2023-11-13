'use client';

import Logo from '@/components/Logo';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useCallback } from 'react'
import { MdDashboard, MdLogout, MdPieChart, MdSettings, MdWallet } from 'react-icons/md';

export default function AppSidebar() {
  const pathname = usePathname();

  const isActivePath = useCallback((path: string) => {
    return pathname === path
  }, [pathname]);

  return (
    <aside className='bg-takify-light_silver w-full md:w-60 fixed bottom-0 md:top-0 left-0 right-0 md:right-[auto] md:h-screen md:rounded-r-[100px] md:py-16 md:space-y-16'>
      <div className='hidden md:flex justify-center'>
        <Logo href='/app' forApp />
      </div>

      <nav>
        <ul className='flex md:block'>
          <li className='flex-1'>
            <Link href="/app" className={`p-4 md:px-12 hover:text-takify-deep_blue flex flex-col md:flex-row items-center gap-2 text-xs md:text-base ${isActivePath('/app') ? 'text-takify-deep_blue' : 'text-takify-dark_grey'}`}>
              <MdDashboard className="text-2xl md:text-xl" />
              Dashboard
            </Link>
          </li>
          <li className='flex-1'>
            <Link href="/app/transactions" className={`p-4 md:px-12 hover:text-takify-deep_blue flex flex-col md:flex-row items-center gap-2 text-xs md:text-base ${isActivePath('/app/transactions') ? 'text-takify-deep_blue' : 'text-takify-dark_grey'}`}>
              <MdWallet className="text-2xl md:text-xl" />
              Transactions
            </Link>
          </li>
          <li className='flex-1'>
            <Link href="/app/budgets" className={`p-4 md:px-12 hover:text-takify-deep_blue flex flex-col md:flex-row items-center gap-2 text-xs md:text-base ${isActivePath('/app/budgets') ? 'text-takify-deep_blue' : 'text-takify-dark_grey'}`}>
              <MdPieChart className="text-2xl md:text-xl" />
              Budgets
            </Link>
          </li>
          <li className='md:hidden flex-1'>
            <Link href="/app/settings" className={`p-4 md:px-12 hover:text-takify-deep_blue flex flex-col md:flex-row items-center gap-2 text-xs md:text-base ${isActivePath('/app/settings') ? 'text-takify-deep_blue' : 'text-takify-dark_grey'}`}>
              <MdSettings className="text-2xl md:text-xl" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      <div className='h-[1px] bg-takify-light_grey hidden md:block'></div>

      <nav className='hidden md:block'>
        <ul className='flex md:block'>
          <li>
            <Link href="/app/settings" className={`p-4 md:px-12 hover:text-takify-deep_blue flex flex-col md:flex-row items-center gap-2 text-xs md:text-base ${isActivePath('/app/settings') ? 'text-takify-deep_blue' : 'text-takify-dark_grey'}`}>
              <MdSettings className="text-xl" />
              Settings
            </Link>
          </li>
          <li>
            <Link href="/logout" className={`p-4 md:px-12 hover:text-takify-deep_blue flex flex-col md:flex-row items-center gap-2 text-xs md:text-base ${isActivePath('/logout') ? 'text-takify-deep_blue' : 'text-takify-dark_grey'}`}>
              <MdLogout className="text-xl" />
              Log out
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
