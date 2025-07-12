'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null);
    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href={'/'} className='cursor-pointer flex items-center gap-1'>
                    <Image src="/icons/logo.svg" width={34} height={34} alt="Horizon logo"></Image>
                    <h1 className='font-ibm-plex-serif font-bold text-26 text-black-1'>Horizon</h1>
                </Link>
                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 font-semibold text-gray-900 lg:text-36'>
                        {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                    </h1>
                    <p className='font-16 text-normal text-gray-600'>
                        {user ? 'Link your account to get started.' : 'Please enter your details.'}
                    </p>
                </div>
            </header>

            {user ? (
                <>
                    {/* PLAIDLINK */}
                </>
            ) : (
                <>
                    {/* Form */}
                    
                </>
            )}
        </section>
    )
}

export default AuthForm
