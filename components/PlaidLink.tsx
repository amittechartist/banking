"use client";

import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { StyledString } from 'next/dist/build/swc/types';
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import Image from 'next/image';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const router = useRouter();

    const [token, setToken] = useState('');

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            setToken(data?.linkToken);
        }
        getLinkToken();
    }, [user])

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        const data = await exchangePublicToken({ publicToken: public_token, user });
        router.push('/');
    }, [user]);




    const config: PlaidLinkOptions = {
        token,
        onSuccess
    };

    const { ready, open } = usePlaidLink(config);
    return (
        <>
            {variant === 'primary' ?
                <Button type='button'
                    disabled={!ready}
                    onClick={() => open()}
                    className='plaidlink-primary'>
                    Connect Bank
                </Button>
                : variant === 'ghost' ?
                    <Button onClick={() => open()} type='button' className='plaidlink-ghost'>
                        <Image
                            src={'/icons/plus.svg'}
                            height={'20'}
                            width={'20'}
                            alt='plus'
                        />
                        <h2 className='font-14 font-semibold text-gray-600'>Add Bank</h2>
                    </Button>
                    :
                    <Button onClick={() => open()} className="plaidlink-default">
                        <Image
                            src="/icons/connect-bank.svg"
                            alt="connect bank"
                            width={24}
                            height={24}
                        />
                        <p className='text-[16px] font-semibold text-black-2'>Connect bank</p>
                    </Button>
            }
        </>
    )
}

export default PlaidLink
