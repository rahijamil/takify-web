"use client";
import React, { useState } from 'react'
import HomeHeader from '../HomeHeader'
import { BarLoader } from 'react-spinners';
import { Colors } from '@/theme/theme';
import { supabase } from '@/config/supabaseConfig';
import { useRouter } from 'next/navigation';

export default function LogOut() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogOut = () => {
        setIsLoading(true);

        supabase.auth.signOut().then(() => {
            router.replace("/login");
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <main className='fixed top-0 left-0 bottom-0 right-0'>
            <HomeHeader hideNav />

            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-takify-deep_blue to-takify-sky_blue">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-3xl font-semibold mb-6 text-takify-dark_grey text-center">Log out</h1>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    {isLoading ? (
                        <div className="flex items-center justify-center mt-4">
                            <BarLoader color={Colors.primary} />
                        </div>
                    ) : (
                        <button
                            className="bg-takify-deep_blue text-white py-3 px-6 rounded-lg font-semibold mt-4 transition duration-300 ease-in-out hover:bg-takify-dark_blue focus:outline-none w-full"
                            onClick={handleLogOut}
                        >
                            Log out
                        </button>
                    )}
                </div>
            </div>
        </main>
    )
}
