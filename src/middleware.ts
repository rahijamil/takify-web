import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res }, {
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABSAE_URL
    })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // if user is signed in and the current path is / redirect the user to /account
    if (user && ['/', '/login', '/signup'].includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/app', req.url))
    }

    // if user is not signed in and the current path is not /app redirect the user to /login
    if (!user && req.nextUrl.pathname.startsWith('/app')) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // if user is not signed in and the current path is not /logout redirect the user to /login
    if (!user && req.nextUrl.pathname == "/logout") {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return res
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/login', '/signup', '/logout', '/app/:path*'],
}