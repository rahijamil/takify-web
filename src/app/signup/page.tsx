"use client";
import React, { useState } from 'react';
import HomeHeader from '../HomeHeader';
import Link from 'next/link';
import { supabase } from '@/config/supabaseConfig';
import { UserProfile } from '@/contexts/AuthContext';
import { Colors } from '@/theme/theme';
import { BarLoader } from 'react-spinners';
import Button from '@/components/Button';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSignUpSuccess, setShowSignUpSuccess] = useState(false);

    const isValidEmail = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const isValidPassword = () => {
        return password.length >= 6; // Example criteria, can be more complex
    };

    const handleSignUp = async () => {
        setError('');

        if (!isValidEmail()) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!isValidPassword()) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            setIsLoading(true);

            supabase.auth.signUp({ email, password }).then(async (response) => {
                if (response.error) {
                    setError(response.error.message);
                }

                if (response.data) {
                    const authUser = response.data.user;

                    if (authUser?.email) {
                        const user: UserProfile = {
                            auth_uid: authUser.id,
                            email: authUser.email,
                            display_name: name,
                            photo_url: "",
                            created_at: authUser?.created_at,
                        };

                        const { data, error } = await supabase.from("profiles").insert([user]);

                        if (error) {
                            setError(error.message);
                            setIsLoading(false);
                            return;
                        }

                        setShowSignUpSuccess(true);
                    }
                }
            })

        } catch (error: any) {
            setError(error.message);
            setIsLoading(false);
        }
        finally {
            // setIsLoading(false);
        }
    };

    return (
        <main className='pb-16 bg-gradient-to-r from-takify-deep_blue to-takify-sky_blue'>
            <HomeHeader hideNav />

            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    {
                        showSignUpSuccess && !isLoading && !error && email ? (
                            <div className='space-y-8'>
                                <h1 className="text-3xl font-semibold mb-6 text-takify-dark_grey text-center">Verify your email</h1>

                                <p className='text-center text-takify-positive text-sm'>An email has been sent to {email}. Please click the link in the email to complete your sign up</p>

                                <Button href='/login' className='w-full block'>
                                    Log in
                                </Button>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-3xl font-semibold mb-6 text-takify-dark_grey text-center">Sign Up</h1>

                                <div className='space-y-4'>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full py-3 px-4 border-b border-takify-light_grey bg-takify-light_silver placeholder-takify-dark_grey focus:outline-none rounded-lg"
                                    />

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

                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full py-3 px-4 border-b border-takify-light_grey bg-takify-light_silver placeholder-takify-dark_grey focus:outline-none rounded-lg"
                                    />

                                    {error && <p className="text-red-500 text-sm">{error}</p>}

                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <BarLoader color={Colors.primary} />
                                        </div>
                                    ) : (
                                        <Button onClick={handleSignUp} className='w-full'>
                                            Sign Up
                                        </Button>
                                    )}
                                </div>

                                <div className="flex items-center justify-center mt-6">
                                    <Link href="/login" className="text-takify-gold text-sm block mt-4">
                                        Already have an account? Log In
                                    </Link>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </main>
    );
}
