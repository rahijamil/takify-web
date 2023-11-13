import Logo from '@/components/Logo'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HomeFooter() {
  return (
    <footer className='border-t border-takify-light_silver'>
      <div className="wrapper py-12 flex items-center justify-between gap-8">
        <div>
          <div className='flex'>
            <Logo href='/' />

            <div>

            </div>
          </div>
          <div className='flex-1'></div>
        </div>

        <p className="text-center text-sm opacity-80">
          &copy; 2023 Takify. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
