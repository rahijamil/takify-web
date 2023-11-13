"use client";

import { useAuth } from '@/contexts/AuthContext'
import React from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    if (!user) {
        return null
    }

    return (
        <>{children}</>
    )
}
