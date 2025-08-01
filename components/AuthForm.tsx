'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form
} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'


const AuthForm = ({ type }: { type: string }) => {
    const route = useRouter();

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormSchema(type);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            // Do appwrite & create plaid token
            // Sign-up
            if (type === 'sign-up') {
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.address1!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    email: data.email,
                    password: data.password
                }

                const newUser = await signUp(userData);

                setUser(newUser);
            }
            // Sign-in
            if (type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password
                });

                if (response) route.push('/');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

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
                    <PlaidLink user={user} variant='primary' />
                </>
            ) : (
                <>
                    {/* Form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            {type == 'sign-up' && (
                                <>
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            control={form.control}
                                            name='firstName'
                                            label="First Name"
                                            placeholder="Enter your first name"
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name='lastName'
                                            label="Last Name"
                                            placeholder="Enter your last name"
                                        />
                                    </div>
                                    <CustomInput
                                        control={form.control}
                                        name='address1'
                                        label="Address"
                                        placeholder="Enter your specific address"
                                    />
                                    <CustomInput
                                        control={form.control}
                                        name='city'
                                        label="City"
                                        placeholder="Enter your city"
                                    />
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            control={form.control}
                                            name='state'
                                            label="State"
                                            placeholder="Example: Delhi"
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name='postalCode'
                                            label="Postal Code"
                                            placeholder="Example: 110001"
                                        />
                                    </div>
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            control={form.control}
                                            name='dateOfBirth'
                                            label="Date of Birth"
                                            placeholder="YYYY-MM-DD"
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name='ssn'
                                            label="SSN"
                                            placeholder="Example: 1234"
                                        />
                                    </div>
                                </>
                            )}

                            <CustomInput
                                control={form.control}
                                name='email'
                                label="Email"
                                placeholder="Enter your email"
                            />

                            <CustomInput
                                control={form.control}
                                name='password'
                                label="Password"
                                placeholder="Enter your password"
                            />
                            <div className='flex flex-col gap-4'>
                                <Button className='form-btn' type="submit">
                                    {isLoading ? <>
                                        <Loader2 className='animate-spin' /> &nbsp; Loading...
                                    </> : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <footer className='flex justify-center gap-1'>
                        <p className='font-16 text-normal text-gray-600'>
                            {type === 'sign-in' ? 'Don\'t have an account? ' : 'Already have an account? '}
                        </p>
                        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
                            <span className='form-link'>
                                {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                            </span>
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm
