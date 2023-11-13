"use client";
import React, { useState } from 'react'
import HomeHeader from '../HomeHeader'
import { BarLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/config/supabaseConfig';
import { Colors } from '@/theme/theme';
import Button from '@/components/Button';

export default function LogIn() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isValidEmail = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        setError('');

        if (!isValidEmail()) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!password) {
            setError('Please enter your password.');
            return;
        }
        setIsLoading(true);

        try {
            const { data: { session }, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setError(error.message);
                setIsLoading(false);
                return;
            }

            // Navigate to the authenticated part of the app
            router.push('/app');

        } catch (error: any) {
            if (error.message == "Email not confirmed") {
                setError("Please verify your email address before logging in.");
            } else {
                setError(error.message);
                setIsLoading(false);
            }
        } finally {
            // setIsLoading(false);
        }
    };

    return (
        <main className='bg-gradient-to-r from-takify-deep_blue to-takify-sky_blue'>
            <HomeHeader hideNav />

            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-3xl font-semibold mb-6 text-takify-dark_grey text-center">Log In</h1>

                    <div className='space-y-4'>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full py-3 px-4 border-b border-takify-light_grey bg-takify-light_silver placeholder-takify-dark_grey focus:outline-none rounded-lg"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full py-3 px-4 border-b border-takify-light_grey bg-takify-light_silver placeholder-takify-dark_grey focus:outline-none rounded-lg"
                        />

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <BarLoader color={Colors.primary} />
                            </div>
                        ) : (
                            <Button onClick={handleLogin} className='w-full'>
                                Log in
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center justify-center mt-6">
                        <Link href="/forgot-password" className="text-takify-gold text-sm block mt-4">
                            Forgot Password?
                        </Link>
                    </div>

                    <div className="flex items-center justify-center mt-6">
                        <p className="text-sm text-gray-600">Don&apos;t have an account? </p>
                        <Link href="/signup" className="text-takify-gold ml-1">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
