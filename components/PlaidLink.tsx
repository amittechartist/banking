import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { StyledString } from 'next/dist/build/swc/types';
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';

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
                    <Button type='button' className='plaidlink-ghost'>
                        Connect Bank
                    </Button>
                    :
                    <Button type='button' className='plaidlink-default'>
                        Connect Bank
                    </Button>
            }
        </>
    )
}

export default PlaidLink
